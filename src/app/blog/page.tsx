import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Link from 'next/link'
import BlogClient from './BlogClient'

// 获取当前文件的目录 (兼容 ESM 环境)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 博客文章元数据类型
type Post = {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
  readingTime?: number
}

// 从文件系统读取所有博客文章 (服务器端)
function getPostsData(): Post[] {
  // 使用相对于当前文件的绝对路径，而不是 process.cwd()
  // 这样在 Cloudflare Pages 等 CI/CD 环境中更可靠
  // 当前文件：src/app/blog/page.tsx
  // 博客目录：src/content/blog
  // 需要向上 2 层：../../content/blog
  const postsDir = path.resolve(__dirname, '../../content/blog')
  
  if (!fs.existsSync(postsDir)) {
    console.error(`博客目录不存在：${postsDir}`)
    return []
  }

  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))

  if (files.length === 0) {
    console.warn(`博客目录为空：${postsDir}`)
  }

  return files.map(file => {
    const slug = file.replace(/\.mdx?$/, '')
    const fullPath = path.join(postsDir, file)
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    let title = slug
    let date = '未知日期'
    let description = ''
    let tags: string[] = []

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const titleMatch = frontmatter.match(/title:\s*(.+)/)
      const dateMatch = frontmatter.match(/date:\s*(.+)/)
      const descMatch = frontmatter.match(/description:\s*(.+)/)
      const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/)
      
      if (titleMatch) title = titleMatch[1].trim()
      if (dateMatch) date = dateMatch[1].trim()
      if (descMatch) description = descMatch[1].trim()
      if (tagsMatch) {
        tags = tagsMatch[1].split(',').map(t => t.trim())
      }
    }

    const wordsPerMinute = 300
    const wordCount = content.trim().split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    return { slug, title, date, description, tags, readingTime }
  })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function BlogPage() {
  const posts = getPostsData()
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">博客文章</h1>
      <BlogClient posts={posts} />
    </div>
  )
}
