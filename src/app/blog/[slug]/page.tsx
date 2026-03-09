import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

// 生成静态路径
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'src/content/blog')
  
  if (!fs.existsSync(postsDir)) {
    return []
  }

  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))

  return files.map(file => ({
    slug: file.replace(/\.mdx?$/, '')
  }))
}

// 读取单篇文章
function getPost(slug: string) {
  const postsDir = path.join(process.cwd(), 'src/content/blog')
  const filePath = path.join(postsDir, `${slug}.md`)
  const mdxPath = path.join(postsDir, `${slug}.mdx`)
  
  // 尝试 .md 或 .mdx
  const fullPath = fs.existsSync(filePath) ? filePath : 
                   fs.existsSync(mdxPath) ? mdxPath : null
  
  if (!fullPath || !fs.existsSync(fullPath)) {
    return null
  }

  const content = fs.readFileSync(fullPath, 'utf-8')
  
  // 解析 Frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  let title = slug
  let date = '未知日期'
  let description = ''
  let body = content

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    const titleMatch = frontmatter.match(/title:\s*(.+)/)
    const dateMatch = frontmatter.match(/date:\s*(.+)/)
    const descMatch = frontmatter.match(/description:\s*(.+)/)
    
    if (titleMatch) title = titleMatch[1].trim()
    if (dateMatch) date = dateMatch[1].trim()
    if (descMatch) description = descMatch[1].trim()
    
    // 移除 frontmatter 部分，只保留正文
    body = content.replace(/^---\n[\s\S]*?\n---\n/, '')
  }

  return { slug, title, date, description, body }
}

// 文章页面组件
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* 返回链接 */}
      <a
        href="/blog"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← 返回博客列表
      </a>

      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        {post.description && (
          <p className="text-gray-700 mt-4 text-lg">{post.description}</p>
        )}
      </header>

      {/* 文章正文 - 简单渲染，后续可集成 MDX */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {post.body}
        </div>
      </div>

      {/* 底部 */}
      <footer className="mt-12 pt-8 border-t">
        <a
          href="/blog"
          className="text-blue-600 hover:text-blue-800"
        >
          ← 返回博客列表
        </a>
      </footer>
    </article>
  )
}
