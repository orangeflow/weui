# 如何将 colorToken.html 公开到网络

## 方法 1: Netlify Drop（最简单，推荐）⭐

**步骤：**
1. 访问 https://app.netlify.com/drop
2. 直接将 `dayAndNight/colorToken.html` 文件拖拽到页面上
3. 几秒钟后，Netlify 会自动生成一个 URL（例如：`https://random-name-123.netlify.app`）
4. 完成！你的页面已经可以访问了

**优点：**
- 无需注册（但注册后可以管理）
- 完全免费
- 支持 HTTPS
- 自动部署

---

## 方法 2: Vercel（也很简单）

**步骤：**
1. 访问 https://vercel.com
2. 注册/登录账号
3. 点击 "Add New..." → "Project"
4. 选择你的项目文件夹，或直接上传 `colorToken.html`
5. 点击 "Deploy"
6. 获得一个 URL（例如：`https://your-project.vercel.app`）

**优点：**
- 免费
- 支持 HTTPS
- 可以绑定自定义域名

---

## 方法 3: GitHub Pages（如果使用 GitHub）

**步骤：**
1. 将项目推送到 GitHub
2. 在 GitHub 仓库中，进入 Settings → Pages
3. 选择 Source 为 "main" 分支，文件夹选择 `/dayAndNight`
4. 保存后，访问 `https://你的用户名.github.io/figma-playground/dayAndNight/colorToken.html`

**优点：**
- 完全免费
- 支持 HTTPS
- 可以绑定自定义域名
- 版本控制

---

## 方法 4: Gitee Pages（如果使用 Gitee，适合国内访问）

**步骤：**
1. 将项目推送到 Gitee
2. 在 Gitee 仓库中，进入 "服务" → "Gitee Pages"
3. 选择分支和目录（`dayAndNight`）
4. 点击 "启动" 或 "更新"
5. 获得一个 URL（例如：`https://你的用户名.gitee.io/figma-playground/dayAndNight/colorToken.html`）

**优点：**
- 完全免费
- 国内访问速度快
- 支持 HTTPS

---

## 方法 5: CodeSandbox（在线编辑和预览）

**步骤：**
1. 访问 https://codesandbox.io
2. 点击 "Create Sandbox" → "Vanilla"
3. 将 `colorToken.html` 的内容复制到 `index.html`
4. 自动预览，点击右上角 "Share" 获取链接

**优点：**
- 可以在线编辑
- 实时预览
- 可以分享编辑链接

---

## 方法 6: 使用 Python 简单服务器（本地测试）

如果你想先在本地测试：

```bash
# 进入项目目录
cd dayAndNight

# Python 3
python3 -m http.server 8000

# 或 Python 2
python -m SimpleHTTPServer 8000
```

然后访问：http://localhost:8000/colorToken.html

---

## 推荐方案

- **最快最简单**：Netlify Drop（方法 1）
- **需要版本控制**：GitHub Pages 或 Gitee Pages（方法 3 或 4）
- **需要在线编辑**：CodeSandbox（方法 5）

---

## 注意事项

1. **文件路径**：如果 HTML 文件引用了其他资源（CSS、JS、图片），确保路径正确
2. **相对路径**：使用相对路径（如 `./style.css`）而不是绝对路径
3. **单文件**：`colorToken.html` 是单文件（内嵌 CSS 和 JS），所以部署很简单

---

## 快速部署命令（如果使用 Git）

```bash
# 如果使用 GitHub
git add dayAndNight/colorToken.html
git commit -m "Add colorToken.html"
git push origin main

# 然后按照方法 3 或 4 设置 Pages
```

