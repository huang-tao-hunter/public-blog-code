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
- ✅ **响应式设计** - 移动端完美适配
- ✅ **暗黑模式准备** - Tailwind CSS dark mode 支持
- ✅ **SEO 友好** - 语义化 HTML 结构
- ✅ **自动部署** - Git push 自动部署到 Vercel

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel
- **内容**: Markdown / MDX

## 📊 下一步优化建议

- [ ] 集成 `react-markdown` 提升 Markdown 渲染质量
- [ ] 添加文章搜索功能
- [ ] 集成评论系统 (Giscus/Utterances)
- [ ] 添加 RSS Feed
- [ ] 集成访问统计 (Vercel Analytics)
- [ ] 添加暗黑模式切换
- [ ] 添加目录导航 (TOC)

## 📖 相关资源

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Vercel 文档](https://vercel.com/docs)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

**Happy Blogging! 🎉**
