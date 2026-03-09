# Hunter's Blog

个人博客项目，使用 Next.js 16 构建，部署在 Vercel 上。

## 🚀 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

或者通过 Vercel 网页：https://vercel.com/new

## 📝 写博客文章

### 1. 复制模板

```bash
cp src/content/blog/_template.md src/content/blog/my-new-post.md
```

### 2. 编辑 Frontmatter

```markdown
---
title: 文章标题
date: 2026-03-09
description: 文章简介，100 字以内
tags: [标签 1, 标签 2, 标签 3]
---
```

### 3. 写作

使用 Markdown 语法写作：

```markdown
# 标题

## 小标题

段落内容...

- 列表项
- 列表项

[链接](URL)

`行内代码`

```javascript
// 代码块
const code = 'example'
```
```

### 4. 提交并推送

```bash
git add .
git commit -m "docs: 新增文章 - 文章标题"
git push origin master
```

Vercel 会自动重新部署！

## 📁 项目结构

```
public-blog-code/
├── src/
│   ├── app/
│   │   ├── blog/              # 博客页面
│   │   │   ├── page.tsx       # 博客列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # 单篇文章
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 主页
│   ├── components/
│   │   └── MarkdownRenderer.tsx  # Markdown 渲染
│   └── content/
│       └── blog/              # 博客文章内容
│           ├── first-post.md  # 示例文章
│           └── _template.md   # 写作模板
├── public/                    # 静态资源
├── vercel.json                # Vercel 配置
└── package.json
```

## ✨ 功能特性

- ✅ **博客列表页** - 自动读取所有文章，按日期排序
- ✅ **文章详情页** - 动态路由，支持 Markdown 渲染
- ✅ **阅读时间估算** - 根据字数自动计算
- ✅ **标签系统** - 支持多标签分类
- ✅ **文章搜索** - 实时搜索标题、内容和标签
- ✅ **暗黑模式** - 一键切换明暗主题，自动保存偏好
- ✅ **响应式设计** - 移动端完美适配
- ✅ **PWA 支持** - 可安装到主屏幕，离线访问
- ✅ **Vercel Analytics** - 访问统计分析
- ✅ **Giscus 评论** - GitHub 驱动的评论系统
- ✅ **SEO 友好** - 语义化 HTML 结构
- ✅ **自动部署** - Git push 自动部署到 Vercel

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel
- **内容**: Markdown / MDX
- **分析**: Vercel Analytics
- **评论**: Giscus
- **PWA**: next-pwa + Workbox

## 📱 PWA 图标设置

要完成 PWA 支持，需要添加应用图标：

1. **准备图标**: 创建 192x192 和 512x512 的 PNG 图标
2. **放置位置**: 将图标文件放到 `public/` 目录
   - `public/icon-192x192.png`
   - `public/icon-512x512.png`
3. **推荐工具**: 使用 https://realfavicongenerator.net/ 生成所有尺寸

或者临时使用占位图标：
```bash
# 访问 https://placehold.co/ 生成占位图
# 192x192: https://placehold.co/192x192/2563eb/white?text=HB
# 512x512: https://placehold.co/512x512/2563eb/white?text=HB
```

## 📊 下一步优化建议

- [ ] 集成 `react-markdown` 提升 Markdown 渲染质量
- [ ] 集成访问统计 (Vercel Analytics) - ✅ 已完成
- [ ] 添加目录导航 (TOC)
- [ ] 暗黑模式切换 - ✅ 已完成
- [ ] 添加 PWA 图标 - ⚠️ 需要手动添加

## 🔧 配置说明

### Giscus 评论系统配置

1. 访问 https://giscus.app/zh-CN
2. 输入你的 GitHub 仓库信息 (`huang-tao-hunter/public-blog-code`)
3. 选择 Announcement category
4. 获取 `repoId` 和 `categoryId`
5. 更新 `src/components/GiscusComments.tsx` 中的配置

### PWA 图标

参考上方 "PWA 图标设置" 章节

## 📖 相关资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Vercel 文档](https://vercel.com/docs)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

**Happy Blogging! 🎉**
