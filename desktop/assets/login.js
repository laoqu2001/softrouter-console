'use strict';
const form = document.getElementById('login-form');
const button = document.getElementById('login-submit');
const errorBox = document.getElementById('login-error');
try { document.documentElement.dataset.theme = localStorage.getItem('sr-desktop-theme') || 'light'; } catch (_) {}
if (new URLSearchParams(location.search).get('error')) errorBox.textContent = '登录未成功，请检查账号密码后重试。';
let submitting = false;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitting || !form.reportValidity()) return;
  submitting = true;
  button.disabled = true;
  button.textContent = '正在登录…';
  errorBox.textContent = '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('/api/login', {
      method: 'POST', headers: {'Content-Type': 'application/json'}, signal: controller.signal,
      body: JSON.stringify({u: document.getElementById('username').value, p: document.getElementById('password').value})
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.msg || '登录未成功，请稍后重试');
    const next = new URL(new URLSearchParams(location.search).get('next') || '/', location.origin);
    location.replace(next.origin === location.origin && ['/', '/chat', '/usage'].includes(next.pathname) ? next.pathname + next.search : '/');
  } catch (error) {
    errorBox.textContent = error.name === 'AbortError' ? '登录请求超时，请检查网络后重试。' : error.message || '暂时无法连接服务';
  } finally {
    clearTimeout(timer);
    submitting = false;
    button.disabled = false;
    button.textContent = '登录控制台 →';
  }
});
