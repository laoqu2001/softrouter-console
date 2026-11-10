# SUNIP Softrouter Console

软路由设备管理控制台 —— 手机端管理面板 + 桌面端控制台。

> 纯 Python 3 标准库实现，**无需 pip 安装任何依赖**。

## 组成

### 1. 管理面板 —— `panel/`（HTTPS :5500）
- `softrouter-panel-v3.py` —— 单文件 HTTPS 服务，前端（HTML/CSS/JS）内嵌于 Python 源码中
- `sr-panel.service` —— systemd 单元

功能：设备/客户列表、在线状态、远程执行、端口台账、用量统计、屏幕墙等。

### 2. 桌面控制台 —— `desktop/`（HTTPS :5510）
- `softrouter-desktop.py` —— 反向代理 + 静态资源服务，上游指向本机 5500 面板
- `assets/` —— 前端资源（`index.html` / `login.html` / `app.js` / `login.js` / `app.css` / `favicon.svg`）
- `sr-desktop.service` —— systemd 单元

## 依赖

- Python 3.10+（仅标准库）
- Linux（systemd，用于服务托管）
- 一张 HTTPS 证书（两个服务都需要）

## 部署

### 1. 放置文件

```sh
install -Dm755 panel/softrouter-panel-v3.py   /usr/local/bin/softrouter-panel-v3.py
install -Dm644 panel/sr-panel.service         /etc/systemd/system/sr-panel.service

install -Dm755 desktop/softrouter-desktop.py  /usr/local/bin/softrouter-desktop.py
install -Dm644 desktop/sr-desktop.service     /etc/systemd/system/sr-desktop.service
mkdir -p /usr/local/share/sr-desktop
cp desktop/assets/* /usr/local/share/sr-desktop/
```

### 2. 准备证书

桌面端通过 systemd `LoadCredential` 从 `/etc/dl-ssl` 读取证书，**密钥不写入任何配置文件**：

```sh
mkdir -p /etc/dl-ssl
# fullchain.pem 放证书链，privkey.pem 放私钥
```

### 3. 启动

```sh
systemctl daemon-reload
systemctl enable --now sr-panel.service
systemctl enable --now sr-desktop.service
```

访问 `https://<主机>:5500` 进入面板，`https://<主机>:5510` 进入桌面控制台。

## 端口

| 端口 | 服务 |
|---|---|
| 5500 | 管理面板 |
| 5510 | 桌面控制台（反向代理到 5500） |

## 许可

MIT License —— 可以自由使用、修改、部署到你自己的环境。详见 [LICENSE](LICENSE)。
