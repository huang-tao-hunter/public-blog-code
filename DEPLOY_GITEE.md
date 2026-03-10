# Gitee Pages 部署指南

本指南介绍如何将 Next.js 博客部署到 Gitee Pages（码云静态网站托管）。

## 📋 前置要求

1. **Gitee 账号** - 访问 https://gitee.com 注册
2. **Gitee 仓库** - 创建一个新的仓库或复用现有仓库
3. **开通 Gitee Pages 服务** - 需要完成实名认证

## 🚀 部署步骤

### 步骤 1：配置 Gitee 远程仓库

```bash
cd C:\Users\79090\.openclaw\workspacels\public-blog-code

# 添加 Gitee 远程仓库（替换为你的 Gitee 用户名和仓库名）
git remote add gitee https://gitee.com/YOUR_USERNAME/YOUR_REPO.git

# 或者如果已经添加了 Gitee 远程，跳过此步
git remote -v  # 查看现有远程
```

### 步骤 2：本地构建测试

```bash
# 安装依赖
npm install

# 构建静态网站
npm run build

# 构建成功后，会在 /out 目录生成静态文件
```

### 步骤 3：推送到 Gitee

```bash
# 推送代码到 Gitee
git push gitee master

# 或者推送到 gitee 分支
git push gitee master:master
```

### 步骤 4：配置 Gitee Pages

1. 访问你的 Gitee 仓库页面
2. 点击 **管理** → **Gitee Pages 服务**
3. 配置 Pages 服务：
   - **来源分支**：选择 `master` 或 `main`
   - **站点目录**：留空（默认根目录）或填写 `/out`（如果你推送了 out 目录）
   - **自动更新**：可选开启
4. 点击 **启动**

### 步骤 5：访问你的博客

部署成功后，Gitee 会提供访问地址，格式通常为：
- `https://YOUR_USERNAME.gitee.io/YOUR_REPO/`

## 📁 部署策略选择

### 方案 A：推送源码，Gitee 自动构建（推荐）

如果你使用 Gitee Pages 的 Jekyll 或其他构建工具，可以推送源码。但 Next.js 需要在本地构建。

### 方案 B：推送构建产物（当前配置）

1. 本地运行 `npm run build` 生成 `/out` 目录
2. 将 `/out` 目录的内容推送到 Gitee 仓库

**自动化脚本：**

创建 `deploy-to-gitee.bat`：

```batch
@echo off
echo Building Next.js blog...
npm run build

echo Pushing to Gitee...
cd out
git init
git add .
git commit -m "Deploy to Gitee Pages"
git remote add gitee https://gitee.com/YOUR_USERNAME/YOUR_REPO.git
git push -f gitee master:master

echo Done! Visit https://YOUR_USERNAME.gitee.io/YOUR_REPO/
pause
```

## ⚠️ 注意事项

### 1. 动态路由

本博客使用静态生成（SSG），所有文章在构建时预渲染。确保：
- 所有博客文章在 `src/content/blog` 目录下
- 运行 `npm run build` 会生成所有文章的静态页面

### 2. Giscus 评论系统

Giscus 依赖 GitHub，如果你迁移到 Gitee：
- **选项 1**：继续使用 GitHub 仓库作为 Giscus 后端（推荐）
- **选项 2**：切换到其他评论系统（如 Valine、Gitalk 等）

如果继续使用 Giscus，确保：
- GitHub 仓库是公开的
- 在 `src/components/GiscusComments.tsx` 中配置正确的 repo 信息

### 3. PWA 支持

静态导出模式下 PWA 仍然可用，service worker 会部署到 `/out` 目录。

### 4. 自定义域名

Gitee Pages 支持绑定自定义域名：
1. 在 Gitee Pages 设置中填写域名
2. 在你的 DNS 服务商添加 CNAME 记录

## 🔧 常见问题

### Q: 构建失败 "Module not found"
**A:** 确保运行了 `npm install` 安装所有依赖。

### Q: 图片无法加载
**A:** 检查图片路径是否使用了绝对路径或正确的相对路径。

### Q: 页面 404
**A:** 确保推送的是 `/out` 目录的内容，或者在 Gitee Pages 设置中指定正确的目录。

### Q: Gitee Pages 服务不可用
**A:** Gitee Pages 需要实名认证。访问 Gitee 完成认证后开通服务。

## 📊 与 Vercel 对比

| 特性 | Vercel | Gitee Pages |
|------|--------|-------------|
| 访问速度（国内） | 较慢 | 快 |
| 自动部署 | ✅ | ⚠️ 需配置 |
| 自定义域名 | ✅ | ✅ |
| HTTPS | ✅ | ✅ |
| 评论系统 | 无限制 | Giscus 需 GitHub |
| 部署复杂度 | 简单 | 中等 |

## 🎯 推荐方案

**同时使用 Vercel 和 Gitee：**
- **国内访问** → Gitee Pages（速度快）
- **国外访问** → Vercel（全球 CDN）

可以通过 DNS 智能解析实现根据用户位置自动切换。

---

**部署成功后，记得测试以下功能：**
- [ ] 博客列表页面正常
- [ ] 文章详情页正常
- [ ] 暗黑模式切换
- [ ] 搜索功能
- [ ] 标签过滤
- [ ] PWA 安装
- [ ] 评论系统（如果启用）

祝部署顺利！🎉
