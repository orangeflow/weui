# 公司内部部署指南

本文档介绍如何将这些 HTML 文件部署到公司内部，供团队成员查看。

## 方案一：使用 Python 简单 HTTP 服务器（推荐，最简单）

### 步骤

1. **进入项目目录**
   ```bash
   cd dayAndNight
   ```

2. **启动 HTTP 服务器**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # 或者 Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **获取本机 IP 地址**
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```
   找到类似 `192.168.x.x` 或 `10.x.x.x` 的内网 IP

4. **访问**
   - 在同一网络的其他电脑上访问：`http://你的IP:8000`
   - 例如：`http://192.168.1.100:8000`

### 优点
- ✅ 无需安装额外软件（Python 通常已安装）
- ✅ 操作简单，一条命令即可
- ✅ 适合临时查看和演示

### 缺点
- ❌ 需要你的电脑一直运行
- ❌ 只能在同一局域网访问

---

## 方案二：使用 Node.js HTTP 服务器

### 步骤

1. **安装 http-server（如果还没有）**
   ```bash
   npm install -g http-server
   ```

2. **进入项目目录并启动**
   ```bash
   cd dayAndNight
   http-server -p 8000 -a 0.0.0.0
   ```

3. **访问**
   - 其他电脑访问：`http://你的IP:8000`

### 优点
- ✅ 功能更丰富（支持缓存、CORS 等）
- ✅ 可以设置更多选项

---

## 方案三：部署到公司内部服务器

### 步骤

1. **将文件上传到服务器**
   ```bash
   # 使用 scp 上传
   scp -r dayAndNight/ user@server-ip:/var/www/html/mimicui-tokens/
   
   # 或使用 FTP/SFTP 工具上传
   ```

2. **配置 Web 服务器（Nginx 示例）**
   ```nginx
   server {
       listen 80;
       server_name tokens.internal.company.com;
       
       root /var/www/html/mimicui-tokens;
       index colorToken.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

3. **访问**
   - 通过内网域名访问：`http://tokens.internal.company.com`

### 优点
- ✅ 稳定可靠，24/7 可用
- ✅ 可以通过域名访问
- ✅ 支持 HTTPS

---

## 方案四：使用公司内部 Git 服务器（GitLab/Gitee）

### 步骤

1. **将代码推送到公司 Git 仓库**
   ```bash
   git add .
   git commit -m "Add MimicUI token documentation"
   git push origin main
   ```

2. **启用 GitLab Pages 或 Gitee Pages**
   - **GitLab**: Settings → Pages → 选择分支和目录
   - **Gitee**: 服务 → Gitee Pages → 启用

3. **访问**
   - 通过生成的 Pages 地址访问

### 优点
- ✅ 自动部署，代码更新后自动更新
- ✅ 有版本控制
- ✅ 通常有 HTTPS

---

## 方案五：使用公司内部文档系统

### 常见系统

1. **Confluence**
   - 可以上传 HTML 文件作为附件
   - 或使用 HTML 宏嵌入

2. **Notion**
   - 可以嵌入 HTML 页面

3. **公司内部 Wiki**
   - 通常支持 HTML 嵌入或文件上传

### 步骤（以 Confluence 为例）

1. 创建新页面
2. 插入 → 其他宏 → HTML
3. 或上传 HTML 文件作为附件

---

## 方案六：使用文件共享服务

### 步骤

1. **将文件放到共享文件夹**
   - Windows 共享文件夹
   - Samba 共享
   - 公司 NAS

2. **设置访问权限**
   - 确保团队成员有读取权限

3. **访问**
   - 通过文件路径访问：`\\server\share\mimicui-tokens\colorToken.html`
   - 或映射网络驱动器后直接打开

### 优点
- ✅ 简单直接
- ✅ 无需配置服务器

### 缺点
- ❌ 需要手动打开文件
- ❌ 某些浏览器可能有安全限制

---

## 方案七：打包成可执行文件（适合演示）

### 使用 Electron 打包

1. **安装 Electron**
   ```bash
   npm install -g electron
   ```

2. **创建简单的 Electron 应用**
   ```javascript
   // main.js
   const { app, BrowserWindow } = require('electron');
   
   function createWindow() {
     const win = new BrowserWindow({
       width: 1200,
       height: 800,
       webPreferences: {
         nodeIntegration: false
       }
     });
     
     win.loadFile('dayAndNight/colorToken.html');
   }
   
   app.whenReady().then(createWindow);
   ```

3. **打包**
   ```bash
   electron-builder
   ```

### 优点
- ✅ 可以打包成独立应用
- ✅ 适合演示和分发

---

## 推荐方案对比

| 方案 | 难度 | 稳定性 | 适用场景 |
|------|------|--------|----------|
| Python HTTP 服务器 | ⭐ 简单 | ⭐⭐ 一般 | 临时查看、演示 |
| Node.js HTTP 服务器 | ⭐⭐ 中等 | ⭐⭐ 一般 | 临时查看、开发 |
| 内部服务器 | ⭐⭐⭐ 中等 | ⭐⭐⭐⭐⭐ 高 | 长期使用、正式环境 |
| Git Pages | ⭐⭐ 中等 | ⭐⭐⭐⭐ 高 | 有 Git 服务器、需要版本控制 |
| 文档系统 | ⭐⭐ 中等 | ⭐⭐⭐⭐ 高 | 已有文档系统 |
| 文件共享 | ⭐ 简单 | ⭐⭐⭐ 中等 | 小团队、简单需求 |

---

## 快速开始（推荐）

### 最简单的方式（5 分钟）

1. **打开终端，进入项目目录**
   ```bash
   cd /Users/yu-jingwang/Documents/CursorFigma/figma-playground/dayAndNight
   ```

2. **启动 Python 服务器**
   ```bash
   python3 -m http.server 8000
   ```

3. **查看本机 IP**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

4. **告诉同事访问地址**
   - 例如：`http://192.168.1.100:8000/colorToken.html`

5. **创建访问入口页面（可选）**
   
   创建 `index.html`：
   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>MimicUI 设计体系文档</title>
     <style>
       body {
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
         max-width: 800px;
         margin: 50px auto;
         padding: 20px;
         line-height: 1.6;
       }
       .link-card {
         display: block;
         padding: 20px;
         margin: 20px 0;
         background: #f5f5f5;
         border-radius: 8px;
         text-decoration: none;
         color: #333;
         border: 2px solid transparent;
         transition: all 0.3s;
       }
       .link-card:hover {
         border-color: #07C160;
         background: #f0fdf4;
       }
       .link-card h2 {
         margin: 0 0 10px 0;
         color: #07C160;
       }
       .link-card p {
         margin: 0;
         color: #666;
       }
     </style>
   </head>
   <body>
     <h1>MimicUI 设计体系文档</h1>
     <p>欢迎查看 MimicUI 设计体系的完整文档和 Token 表。</p>
     
     <a href="colorToken.html" class="link-card">
       <h2>🎨 色彩体系</h2>
       <p>查看完整的颜色系统，包括白天和暗黑模式的对比</p>
     </a>
     
     <a href="designTokenTable.html" class="link-card">
       <h2>📊 设计 Token 表</h2>
       <p>查看所有设计 Token 的详细定义和使用场景</p>
     </a>
     
     <a href="typographyTokenTable.html" class="link-card">
       <h2>📝 文字样式 Token 表</h2>
       <p>查看字体样式和文字颜色的 Token 定义</p>
     </a>
   </body>
   </html>
   ```

   这样访问 `http://你的IP:8000` 就能看到入口页面了。

---

## 注意事项

1. **防火墙设置**
   - 确保防火墙允许 8000 端口（或其他使用的端口）
   - macOS: 系统偏好设置 → 安全性与隐私 → 防火墙

2. **网络要求**
   - 所有设备需要在同一局域网
   - 或通过 VPN 连接

3. **文件路径**
   - 确保所有 HTML 文件在同一目录
   - 相对路径引用要正确

4. **浏览器兼容性**
   - 建议使用现代浏览器（Chrome、Firefox、Safari、Edge）

---

## 需要帮助？

如果遇到问题，可以：
1. 检查端口是否被占用
2. 确认 IP 地址是否正确
3. 检查防火墙设置
4. 查看服务器日志输出

