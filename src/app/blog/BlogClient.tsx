'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

// 博客文章元数据类型
type Post = {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
  readingTime?: number
}

type BlogClientProps = {
  posts: Post[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // 提取所有唯一的标签
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [posts])

  // 过滤文章
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const query = searchQuery.toLowerCase()
      const matchesQuery = !query || 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))

      const matchesTag = !selectedTag || post.tags?.includes(selectedTag)

      return matchesQuery && matchesTag
    })
  }, [posts, searchQuery, selectedTag])

  // 渲染文章列表的辅助函数
  const renderPosts = (postsToRender: Post[]) => (
    <div className="space-y-6">
      {postsToRender.map((post) => (
        <article
          key={post.slug}
          className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-zinc-900 dark:border-zinc-700"
        >
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
              {post.title}
            </h2>
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>{post.date}</span>
            {post.readingTime && (
              <>
                <span>·</span>
                <span>⏱️ {post.readingTime} 分钟阅读</span>
              </>
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{post.description}</p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {post.tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
          
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            阅读全文 →
          </Link>
        </article>
      ))}
    </div>
  )

  return (
    <>
      {/* 搜索框和标签过滤 */}
      <div className="mb-8 space-y-4">
        {/* 搜索输入框 */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索文章标题、内容或标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* 标签过滤 */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              全部
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 搜索结果 */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
            {searchQuery || selectedTag ? '没有找到匹配的文章' : '还没有文章，开始写作吧！'}
          </p>
        </div>
      ) : (
        renderPosts(filteredPosts)
      )}
    </>
  )
}
