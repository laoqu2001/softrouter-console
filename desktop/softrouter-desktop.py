#!/usr/bin/env python3
import argparse
import http.client
import json
import pathlib
import re
import socket
import socketserver
import ssl
import threading
import urllib.parse
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler

MAX_BODY = 1024 * 1024
MAX_RESPONSE = 16 * 1024 * 1024
ASSETS = {
    '/assets/app.css': ('app.css', 'text/css; charset=utf-8'),
    '/assets/app.js': ('app.js', 'text/javascript; charset=utf-8'),
    '/assets/login.js': ('login.js', 'text/javascript; charset=utf-8'),
    '/assets/favicon.svg': ('favicon.svg', 'image/svg+xml'),
}
CSP = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'"


class HTTPProblem(Exception):
    def __init__(self, status, message):
        self.status = status
        self.message = message


class DesktopHandler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'
    server_version = 'SUNIP-Desktop'
    sys_version = ''

    def log_message(self, fmt, *args):
        # Request bodies, credentials, and query strings must not enter logs.
        pass

    def _send(self, status, body=b'', content_type='application/json; charset=utf-8', headers=()):
        if isinstance(body, str):
            body = body.encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('Referrer-Policy', 'same-origin')
        self.send_header('Content-Security-Policy', CSP)
        for key, value in headers:
            if key.lower() in ('set-cookie', 'location'):
                self.send_header(key, value)
        self.end_headers()
        if self.command != 'HEAD':
            try:
                self.wfile.write(body)
            except (BrokenPipeError, ConnectionResetError, TimeoutError):
                pass

    def _json(self, status, value, headers=()):
        self._send(status, json.dumps(value, ensure_ascii=False), headers=headers)

    def _target(self):
        try:
            target = urllib.parse.urlsplit(self.path)
        except ValueError:
            raise HTTPProblem(400, '请求地址不正确') from None
        if target.scheme or target.netloc or len(self.path) > 8192:
            raise HTTPProblem(400, '请求地址不正确')
        return target.path

    def _read_body(self):
        if self.headers.get('Transfer-Encoding'):
            self.close_connection = True
            raise HTTPProblem(400, '不支持这种请求编码')
        lengths = self.headers.get_all('Content-Length', [])
        if len(lengths) != 1 or not re.fullmatch(r'[0-9]{1,9}', lengths[0]):
            self.close_connection = True
            raise HTTPProblem(411, '请求必须提供正确的内容长度')
        length = int(lengths[0])
        if length > MAX_BODY:
            self.close_connection = True
            raise HTTPProblem(413, '请求内容过大')
        body = self.rfile.read(length)
        if len(body) != length:
            self.close_connection = True
            raise HTTPProblem(400, '请求内容不完整')
        return body

    def _same_origin(self):
        origin = self.headers.get('Origin')
        if not origin:
            return
        parsed = urllib.parse.urlsplit(origin)
        expected_scheme = 'https' if self.server.tls_context else 'http'
        if parsed.scheme != expected_scheme or parsed.netloc.lower() != (self.headers.get('Host') or '').lower() or parsed.path:
            raise HTTPProblem(403, '不允许来自其他站点的操作请求')

    def _cookie(self):
        try:
            jar = SimpleCookie()
            jar.load(self.headers.get('Cookie', ''))
            token = jar['sr'].value if 'sr' in jar else ''
        except Exception:
            return ''
        return 'sr=' + token if re.fullmatch(r'[A-Za-z0-9._-]{1,256}', token) else ''

    def _upstream(self, target, method='GET', body=None, content_type=None):
        settings = self.server.upstream
        headers = {'Accept': 'application/json', 'User-Agent': 'SUNIP-Desktop'}
        cookie = self._cookie()
        if cookie:
            headers['Cookie'] = cookie
        if body is not None:
            headers['Content-Type'] = content_type or 'application/json'
        if settings.scheme == 'https':
            # The upstream is restricted to loopback; its public certificate has a different hostname.
            connection = http.client.HTTPSConnection(settings.hostname, settings.port or 443,
                timeout=360, context=ssl._create_unverified_context())
        else:
            connection = http.client.HTTPConnection(settings.hostname, settings.port or 80, timeout=360)
        try:
            connection.request(method, target, body=body, headers=headers)
            response = connection.getresponse()
            payload = response.read(MAX_RESPONSE + 1)
            if len(payload) > MAX_RESPONSE:
                raise HTTPProblem(502, '服务响应内容过大')
            return response.status, payload, response.getheader('Content-Type', 'application/json; charset=utf-8'), response.getheaders()
        except (socket.timeout, TimeoutError):
            raise HTTPProblem(504, '未确认请求结果，请先核对设备或客户状态，避免重复操作') from None
        except (OSError, http.client.HTTPException):
            raise HTTPProblem(502, '暂时无法连接管理服务，请稍后刷新核对状态') from None
        finally:
            connection.close()

    def _proxy(self, method, body=None):
        status, payload, content_type, headers = self._upstream(
            self.path, method, body, self.headers.get('Content-Type'))
        self._send(status, payload, content_type, headers)

    def do_GET(self):
        try:
            path = self._target()
            if path.startswith('/api/'):
                return self._proxy('GET')
            if path in ('/', '/chat', '/usage'):
                filename, content_type = 'index.html', 'text/html; charset=utf-8'
            elif path == '/login':
                filename, content_type = 'login.html', 'text/html; charset=utf-8'
            elif path in ASSETS:
                filename, content_type = ASSETS[path]
            else:
                return self._json(404, {'ok': False, 'msg': '页面不存在'})
            return self._send(200, (self.server.assets / filename).read_bytes(), content_type)
        except HTTPProblem as error:
            self.close_connection = True
            self._json(error.status, {'ok': False, 'msg': error.message})
        except OSError:
            self._json(503, {'ok': False, 'msg': '页面资源暂时不可用'})

    def do_HEAD(self):
        if urllib.parse.urlsplit(self.path).path.startswith('/api/'):
            return self._json(405, {'ok': False, 'msg': '接口不支持 HEAD 请求'})
        self.do_GET()

    def do_POST(self):
        try:
            path = self._target()
            self._same_origin()
            body = self._read_body()
            content_type = self.headers.get('Content-Type', '').split(';', 1)[0].strip().lower()
            if path == '/desktop/logout':
                return self._json(200, {'ok': True}, [('Set-Cookie',
                    'sr=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax')])
            if path == '/desktop/login':
                if content_type != 'application/x-www-form-urlencoded':
                    raise HTTPProblem(415, '登录表单格式不正确')
                try:
                    fields = urllib.parse.parse_qs(body.decode('utf-8'), max_num_fields=8)
                except (UnicodeError, ValueError):
                    raise HTTPProblem(400, '登录表单格式不正确') from None
                payload = json.dumps({'u': (fields.get('username') or [''])[0],
                                      'p': (fields.get('password') or [''])[0]}).encode()
                status, answer, _, headers = self._upstream('/api/login', 'POST', payload, 'application/json')
                try:
                    success = status == 200 and json.loads(answer).get('ok') is True
                except (ValueError, AttributeError):
                    success = False
                return self._send(303, b'', headers=[(k, v) for k, v in headers if k.lower() == 'set-cookie'] +
                                  [('Location', '/' if success else '/login?error=credentials')])
            if not path.startswith('/api/'):
                return self._json(404, {'ok': False, 'msg': '接口不存在'})
            if content_type != 'application/json':
                raise HTTPProblem(415, '接口只接受 JSON 请求')
            try:
                value = json.loads(body)
                if not isinstance(value, dict):
                    raise ValueError()
            except (ValueError, UnicodeError):
                raise HTTPProblem(400, '请求内容必须是 JSON 对象') from None
            return self._proxy('POST', body)
        except HTTPProblem as error:
            self.close_connection = True
            self._json(error.status, {'ok': False, 'msg': error.message})
        except (OSError, ValueError):
            self.close_connection = True
            self._json(400, {'ok': False, 'msg': '无法读取完整请求内容'})


class DesktopServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True
    request_queue_size = 64

    def __init__(self, address, handler, assets, upstream, tls_context=None):
        self.assets = pathlib.Path(assets)
        self.upstream = urllib.parse.urlsplit(upstream)
        if self.upstream.hostname not in ('127.0.0.1', 'localhost', '::1') or self.upstream.scheme not in ('http', 'https'):
            raise ValueError('The management upstream must be on loopback')
        if self.upstream.path not in ('', '/') or self.upstream.query or self.upstream.fragment or self.upstream.username:
            raise ValueError('The management upstream must be an origin without credentials')
        if self.upstream.port == address[1]:
            raise ValueError('The upstream port must differ from the desktop port')
        self.tls_context = tls_context
        self.workers = threading.BoundedSemaphore(64)
        super().__init__(address, handler)

    def process_request(self, request, client_address):
        if not self.workers.acquire(blocking=False):
            self.shutdown_request(request)
            return
        try:
            super().process_request(request, client_address)
        except Exception:
            self.workers.release()
            self.shutdown_request(request)
            raise

    def process_request_thread(self, request, client_address):
        connection = request
        try:
            request.settimeout(10)
            if self.tls_context:
                connection = self.tls_context.wrap_socket(request, server_side=True)
            connection.settimeout(30)
            self.finish_request(connection, client_address)
        except (OSError, ssl.SSLError, ValueError):
            pass
        finally:
            self.shutdown_request(connection)
            self.workers.release()


def main():
    parser = argparse.ArgumentParser(description='SUNIP desktop console')
    parser.add_argument('--bind', default='0.0.0.0')
    parser.add_argument('--port', type=int, default=5510)
    parser.add_argument('--upstream', default='https://127.0.0.1:5500')
    parser.add_argument('--assets', type=pathlib.Path, default=pathlib.Path('/usr/local/share/sr-desktop'))
    parser.add_argument('--cert')
    parser.add_argument('--key')
    parser.add_argument('--http', action='store_true', help='Allow HTTP only for loopback development')
    args = parser.parse_args()
    if args.http and args.bind not in ('127.0.0.1', '::1', 'localhost'):
        parser.error('HTTP development must bind to loopback')
    context = None
    if not args.http:
        if not args.cert or not args.key:
            parser.error('TLS certificate and key are required')
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.minimum_version = ssl.TLSVersion.TLSv1_2
        context.load_cert_chain(args.cert, args.key)
    for filename in ('index.html', 'login.html', *(value[0] for value in ASSETS.values())):
        if not (args.assets / filename).is_file():
            parser.error('A required desktop asset is missing: ' + filename)
    with DesktopServer((args.bind, args.port), DesktopHandler, args.assets, args.upstream, context) as server:
        print('SUNIP desktop listening on port %s' % args.port, flush=True)
        server.serve_forever()


if __name__ == '__main__':
    main()
