import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import BlogClient from './BlogClient'

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
  const postsDir = path.join(process.cwd(), 'src/content/blog')
  
  if (!fs.existsSync(postsDir)) {
    return []
  }

  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))

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
