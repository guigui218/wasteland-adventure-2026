# 🌐 游戏部署与分享指南

本指南详细说明如何将"废土余烬"游戏部署到网络上，让全世界的人都能玩到你的游戏。

## 📋 目录
1. [快速开始](#快速开始)
2. [免费部署方案](#免费部署方案)
3. [付费部署方案](#付费部署方案)
4. [域名设置](#域名设置)
5. [分享链接](#分享链接)
6. [性能优化](#性能优化)

---

## 🚀 快速开始

### 最简单的方法：GitHub Pages（完全免费）

GitHub Pages 是托管静态网站最简单的方式，而我们的游戏完全是静态文件。

#### 步骤 1：启用 GitHub Pages
1. 进入你的仓库 `wasteland-adventure-2026`
2. 点击 **Settings** (设置)
3. 在左侧菜单找到 **Pages**
4. 在 "Source" 下拉菜单选择 **main** 分支
5. 保存设置

#### 步骤 2：获取网站 URL
1. 等待几秒钟后，你会看到：
   ```
   Your site is live at https://guigui218.github.io/wasteland-adventure-2026/
   ```

2. **完成！** 现在任何人都可以通过这个链接玩你的游戏了

#### 步骤 3：分享链接
- 将链接分享到：
  - 社交媒体（微博、微信朋友圈、QQ等）
  - 游戏社区（Steam、itch.io等）
  - 论坛和讨论板
  - 邮件
  - 任何地方！

---

## 💰 免费部署方案

### 1️⃣ **GitHub Pages** ⭐ 推荐
| 特点 | 说明 |
|------|------|
| 费用 | 完全免费 |
| 域名 | `username.github.io/repo-name/` |
| 速度 | 全球CDN加速 |
| 限制 | 无限制 |
| 设置难度 | ⭐ 非常简单 |

**URL 示例：**
```
https://guigui218.github.io/wasteland-adventure-2026/
```

### 2️⃣ **Netlify**
1. 访问 [netlify.com](https://netlify.com)
2. 用 GitHub 账户登录
3. 点击 "New site from Git"
4. 选择你的仓库
5. 部署设置保持默认
6. 点击 "Deploy"

**特点：**
- 完全免费
- 自动部署（每次推送代码都会更新）
- 自定义域名
- URL：`https://your-site-name.netlify.app/`

### 3️⃣ **Vercel**
1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账户登录
3. 点击 "Import Project"
4. 选择你的仓库
5. 部署

**特点：**
- 完全免费
- 超快的全球CDN
- URL：`https://your-project-name.vercel.app/`

### 4️⃣ **Cloudflare Pages**
1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 点击 "Create a project"
3. 连接 GitHub
4. 选择仓库
5. 部署完成

**特点：**
- 完全免费
- Cloudflare 全球网络
- 自动HTTPS

---

## 💳 付费部署方案

如果你想要自定义域名或更多功能：

### 1️⃣ **自己的服务器**
```bash
# 购买云服务器（阿里云、腾讯云、AWS等）
# 在服务器上运行：
python -m http.server 8000

# 或使用 Nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/wasteland-adventure-2026;
    index index.html;
}
```

**成本：** ¥10-50/月

### 2️⃣ **虚拟主机**
- 购买虚拟主机（GoDaddy、Bluehost等）
- 用 FTP 上传文件
- 成本：¥50-200/年

---

## 🌍 域名设置

### 如果你想使用自定义域名（如：wasteland.com）

#### 方案 1：GitHub Pages + 自定义域名

1. 购买域名（GoDaddy、阿里云等）
2. 在你的仓库根目录创建 `CNAME` 文件：
```
yourdomainname.com
```
3. 在域名管理后台设置 DNS：
   - 类型：CNAME
   - 名称：www
   - 值：`guigui218.github.io`

4. 等待 DNS 传播（通常 24 小时内）

#### 方案 2：Netlify 自定义域名

1. 在 Netlify 的项目设置中
2. 点击 "Domain management"
3. 添加你的自定义域名
4. 按照说明修改 DNS 设置

---

## 📤 分享链接

### 现在你可以这样分享你的游戏：

#### 📱 社交媒体文案示例

**微博/QQ空间：**
```
🎮 我做了一个网页游戏《废土余烬》！
核弹浩劫后的生存冒险，多个分支故事，你的每个选择都很重要！

🔗 立即开玩：https://guigui218.github.io/wasteland-adventure-2026/

#游戏 #冒险 #网页游戏 #后启示录
```

**微信朋友圈：**
```
✨ 我做了一个网页游戏《废土余烬》
一起来体验后启示录的生存冒险吧！
https://guigui218.github.io/wasteland-adventure-2026/
```

**QQ群/微信群：**
```
各位，我做了个小游戏，欢迎试玩~
https://guigui218.github.io/wasteland-adventure-2026/
```

#### 🎮 游戏社区

- **itch.io** - 独立游戏社区
  - 创建账户
  - 创建新项目
  - 上传游戏
  - 获得更多曝光

- **GitHub Releases**
  - 创建 Release
  - 在描述中放入游戏链接

- **Reddit** - 游戏相关版块

- **Twitter/X** - 游戏开发者社区

#### 📧 邮件列表

创建一个简单的邮件模板，分享给朋友：

```
题目：来试试我的新游戏！

亲爱的朋友，

我花了一些时间做了一个网页游戏《废土余烬》。
这是一个后启示录题材的文字冒险游戏，有多个故事分支。

你可以直接在浏览器中玩，无需下载或安装！

📍 游戏链接：https://guigui218.github.io/wasteland-adventure-2026/

希望你喜欢！欢迎反馈你的想法。

祝你游戏愉快！
```

---

## ⚡ 性能优化

### 确保游戏快速加载

#### 1. 压缩资源
```bash
# 安装工具
npm install -g minify

# 压缩 CSS
minify styles.css > styles.min.css

# 压缩 JavaScript
minify game.js > game.min.js
```

#### 2. 在 HTML 中使用压缩版本
```html
<link rel="stylesheet" href="styles.min.css">
<script src="game.min.js"></script>
```

#### 3. 添加加载优化
```html
<!-- 在 index.html 的 <head> 中添加 -->
<link rel="preload" href="game.js" as="script">
<link rel="dns-prefetch" href="https://guigui218.github.io">
```

---

## 📊 监控和分析

### 免费分析工具

#### 1. Google Analytics
1. 访问 [google.com/analytics](https://google.com/analytics)
2. 创建账户和属性
3. 获取跟踪代码
4. 在 `index.html` 的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### 2. Netlify Analytics（如果使用 Netlify）
- 自动追踪访问者
- 无需添加代码

---

## 🔄 更新游戏

### 更新步骤很简单：

```bash
# 修改本地文件
# 例如：编辑 game.js 添加新故事

# 提交更改
git add .
git commit -m "添加第三章"
git push

# GitHub Pages / Netlify / Vercel 会自动部署！
# 通常 1-5 分钟内更新
```

---

## 🎯 推荐方案总结

| 需求 | 推荐方案 | 成本 | 难度 |
|------|--------|------|------|
| 快速分享 | GitHub Pages | 免费 | ⭐ |
| 自动部署 | Netlify | 免费 | ⭐⭐ |
| 自定义域名 | Netlify + 域名 | ¥50-100/年 | ⭐⭐ |
| 全功能控制 | 自己的服务器 | ¥10-50/月 | ⭐⭐⭐ |

**我的建议：** 从 GitHub Pages 开始，完全免费且立即可用。如果游戏变得很受欢迎，再考虑升级到付费方案。

---

## ❓ 常见问题

### Q: 如何让游戏在手机上也能玩？
A: 你的游戏已经是响应式的！在任何手机浏览器中打开链接就可以玩。

### Q: 能不能下载来玩？
A: 可以！用户可以右键保存 HTML 文件在本地，但不推荐。直接分享网址更方便。

### Q: 怎样做到离线玩？
A: 在 `index.html` 中添加 Service Worker：
```html
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
</script>
```

### Q: 能用数据库存储玩家数据吗？
A: 当前版本使用浏览器本地存储。如需云同步，需要后端服务器。

### Q: 游戏会被删除吗？
A: GitHub Pages 只要你的仓库存在就不会删除。Netlify/Vercel 免费账户可能有限制，但通常也不会删除。

---

## 🎉 准备好了吗？

1. ✅ 推送代码到 GitHub
2. ✅ 启用 GitHub Pages
3. ✅ 获取网址
4. ✅ 分享给朋友
5. ✅ 享受游戏的反馈！

**现在就分享你的游戏吧！** 🚀

---

有任何问题，欢迎在 GitHub Issues 中提问！