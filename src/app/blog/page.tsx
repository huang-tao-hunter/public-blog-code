import fs from 'fs'
import path from 'path'
import Link from 'next/link'

// 博客文章元数据类型
type Post = {
  slug: string
  title: string
  date: string
  description: string
}

// 从文件系统读取所有博客文章
function getPosts(): Post[] {
  const postsDir = path.join(process.cwd(), 'src/content/blog')
  
  // 如果目录不存在，返回空数组
  if (!fs.existsSync(postsDir)) {
    return []
  }

  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))

  const posts = files.map(file => {
    const slug = file.replace(/\.mdx?$/, '')
    const fullPath = path.join(postsDir, file)
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    // 解析 Frontmatter (简单的 YAML 解析)
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    let title = slug
    let date = '未知日期'
    let description = ''

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const titleMatch = frontmatter.match(/title:\s*(.+)/)
      const dateMatch = frontmatter.match(/date:\s*(.+)/)
      const descMatch = frontmatter.match(/description:\s*(.+)/)
      
      if (titleMatch) title = titleMatch[1].trim()
      if (dateMatch) date = dateMatch[1].trim()
      if (descMatch) description = descMatch[1].trim()
    }

    return { slug, title, date, description }
  })

  // 按日期倒序排列
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">博客文章</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">还没有文章，开始写作吧！</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm mb-3">{post.date}</p>
              <p className="text-gray-700">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-800"
              >
                阅读全文 →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
