---
title: 从零开始：用 Next.js 16 和 Vercel 搭建个人博客
date: 2026-03-09
description: 完整记录使用 Next.js 16、TypeScript、Tailwind CSS 搭建个人博客，并部署到 Vercel 的全过程。包含暗黑模式、PWA、评论系统等高级功能实现细节。
tags: [Next.js, Vercel, 博客，PWA, TypeScript, Tailwind CSS]
---

# 从零开始：用 Next.js 16 和 Vercel 搭建个人博客

> **摘要**：本文完整记录了使用 Next.js 16、TypeScript、Tailwind CSS 搭建个人博客，并部署到 Vercel 的全过程。包含暗黑模式、PWA、评论系统、文章搜索等高级功能的实现细节。

**预计阅读时间**：约 15 分钟  
**技术栈**：Next.js 16, TypeScript, Tailwind CSS, Vercel, PWA, Giscus

---

## 📋 目录

1. [项目初始化](#项目初始化)
2. [基础博客功能](#基础博客功能)
3. [高级功能实现](#高级功能实现)
4. [部署到 Vercel](#部署到 Vercel)
5. [后续优化建议](#后续优化建议)

---

## 项目初始化

### 1.1 创建 Next.js 项目

使用 `create-next-app` 快速脚手架：

```bash
npx create-next-app@latest public-blog-code \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
```

**选项说明**：
- `--typescript`: 使用 TypeScript
- `--tailwind`: 集成 Tailwind CSS
- `--app`: 使用 App Router (Next.js 14+)
- `--src-dir`: 源代码放在 `src/` 目录

### 1.2 项目结构

```
public-blog-code/
├── src/
│   ├── app/              # App Router 页面
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 主页
│   │   └── blog/         # 博客页面
│   ├── components/       # React 组件
│   └── content/blog/     # Markdown 文章
├── public/               # 静态资源
├── package.json
└── next.config.ts
```

---

## 基础博客功能

### 2.1 博客数据模型

定义文章元数据类型：

```typescript
type Post = {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
  readingTime?: number
}
```

### 2.2 Markdown 文件结构

使用 Frontmatter 存储元数据：

```markdown
---
title: 文章标题
date: 2026-03-09
description: 文章简介，100 字以内
tags: [标签 1, 标签 2, 标签 3]
---

# 正文内容

这里是文章内容...
```

### 2.3 读取博客文章

```typescript
import fs from 'fs'
import path from 'path'

function getPosts(): Post[] {
  const postsDir = path.join(process.cwd(), 'src/content/blog')
  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))

  return files.map(file => {
    const slug = file.replace(/\.mdx?$/, '')
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
    
    // 解析 Frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    // ... 解析逻辑
    
    return { slug, title, date, description, tags }
  })
}
```

### 2.4 动态路由

Next.js App Router 动态路由：

```
src/app/blog/[slug]/page.tsx
```

```typescript
export async function generateStaticParams() {
  const posts = getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  // ... 渲染文章
}
```

---

## 高级功能实现

### 3.1 暗黑模式切换

**实现思路**：
1. 使用 React Hook 管理主题状态
2. 监听系统偏好 (`prefers-color-scheme`)
3. 持久化用户选择到 localStorage
4. 通过 `document.documentElement.classList` 切换

**组件代码** (`src/components/ThemeToggle.tsx`)：

```typescript
'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
```

**Tailwind 配置**：

在 `tailwind.config.ts` 中启用暗黑模式：

```typescript
export default {
  darkMode: 'class',
  // ... 其他配置
}
```

### 3.2 文章搜索功能

**实现思路**：
1. 使用客户端组件 (`'use client'`)
2. `useState` 管理搜索关键词和选中标签
3. `useMemo` 优化过滤计算
4. 实时过滤标题、描述、标签

**核心代码**：

```typescript
const filteredPosts = useMemo(() => {
  return initialPosts.filter(post => {
    const query = searchQuery.toLowerCase()
    const matchesQuery = !query || 
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query))

    const matchesTag = !selectedTag || post.tags?.includes(selectedTag)

    return matchesQuery && matchesTag
  })
}, [searchQuery, selectedTag])
```

### 3.3 阅读时间估算

**算法**：300 字/分钟（中文阅读速度）

```typescript
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 300
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
```

**显示效果**：`⏱️ 5 分钟阅读`

### 3.4 Vercel Analytics 集成

**安装**：

```bash
npm install @vercel/analytics
```

**使用**：

```typescript
// src/app/layout.tsx
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
      <Analytics />
    </html>
  )
}
```

**查看数据**：访问 https://vercel.com/dashboard 查看访问统计

### 3.5 Giscus 评论系统

**为什么选择 Giscus**：
- 基于 GitHub Discussions，无需后端
- 免费、开源、无广告
- 支持 Markdown
- 自动暗黑模式

**配置步骤**：

1. 访问 https://giscus.app/zh-CN
2. 输入 GitHub 仓库信息
3. 获取 `repoId` 和 `categoryId`
4. 更新组件配置

**组件代码** (`src/components/GiscusComments.tsx`)：

```typescript
import Giscus from '@giscus/react'

export default function GiscusComponent() {
  return (
    <Giscus
      repo="huang-tao-hunter/public-blog-code"
      repoId="R_kgDOXXXXXX"
      category="Announcements"
      categoryId="DIC_kwDOXXXXXX"
      mapping="pathname"
      lang="zh-CN"
      theme="light"
    />
  )
}
```

### 3.6 PWA 支持

**安装依赖**：

```bash
npm install next-pwa workbox-webpack-plugin
```

**配置 next.config.ts**：

```typescript
import withPWAInit from 'next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

export default withPWA({ reactStrictMode: true })
```

**创建 manifest.json**：

```json
{
  "name": "Hunter's Blog",
  "short_name": "Hunter Blog",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**安装提示组件**：

```typescript
'use client'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowPrompt(false)
      setDeferredPrompt(null)
    }
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:w-96 bg-white shadow-lg rounded-lg p-4">
      <h3>安装到主屏幕</h3>
      <button onClick={handleInstall}>安装</button>
      <button onClick={() => setShowPrompt(false)}>以后再说</button>
    </div>
  )
}
```

---

## 部署到 Vercel

### 4.1 推送到 GitHub

```bash
# 初始化 Git
git init
git add .
git commit -m "Initial commit: Next.js blog project"

# 关联远程仓库
git remote add origin https://github.com/huang-tao-hunter/public-blog-code.git

# 推送
git push -u origin master
```

### 4.2 Vercel 部署

**方式 A：网页部署**（推荐）

1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择 GitHub 仓库 `public-blog-code`
4. 点击 "Deploy"

**方式 B：CLI 部署**

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### 4.3 自动部署

Vercel 自动检测 Next.js 项目，无需额外配置。

**每次 `git push` 后**：
- Vercel 自动触发构建
- 自动生成预览 URL
- 生产环境自动更新

### 4.4 环境变量

如需配置环境变量：
1. 访问 Vercel Dashboard
2. 选择项目 → Settings → Environment Variables
3. 添加变量（如 `NEXT_PUBLIC_*`）

---

## 后续优化建议

### 性能优化

- [ ] 使用 `react-markdown` 替代简单正则解析
- [ ] 添加图片懒加载
- [ ] 启用 Next.js Image 组件
- [ ] 配置 CDN 缓存策略

### SEO 优化

- [ ] 添加 sitemap.xml
- [ ] 添加 robots.txt
- [ ] 完善 Open Graph 标签
- [ ] 添加结构化数据 (Schema.org)

### 功能扩展

- [ ] RSS Feed 生成
- [ ] 文章目录 (TOC)
- [ ] 相关文章推荐
- [ ] 阅读进度条
- [ ] 分享到社交媒体

### 内容管理

- [ ] 集成 CMS (Sanity、Contentful)
- [ ] 添加草稿模式
- [ ] 版本控制
- [ ] 定时发布

---

## 完整代码仓库

项目源码已开源：

**GitHub**: https://github.com/huang-tao-hunter/public-blog-code

---

## 总结

本文记录了从零开始搭建 Next.js 博客的完整过程，包括：

✅ **基础功能**：博客列表、文章详情、Markdown 渲染  
✅ **高级功能**：暗黑模式、文章搜索、阅读时间估算  
✅ **第三方集成**：Vercel Analytics、Giscus 评论  
✅ **PWA 支持**：离线访问、安装到主屏幕  
✅ **自动化部署**：Git push 自动部署到 Vercel  

**总开发时间**：约 1 小时  
**代码行数**：约 1500 行  
**依赖包**：8 个核心依赖

---

## 参考资料

- [Next.js 官方文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Vercel 部署指南](https://vercel.com/docs)
- [Giscus 配置](https://giscus.app/zh-CN)
- [PWA 最佳实践](https://web.dev/progressive-web-apps/)

---

*最后更新：2026 年 3 月 9 日*  
*字数：约 3500 字*  
*预计阅读时间：15 分钟*
