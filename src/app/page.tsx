import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      {/* 导航栏 */}
      <nav className="border-b bg-white/50 backdrop-blur dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">Hunter's Blog</div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              博客
            </Link>
            <a href="https://github.com/huang-tao-hunter" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              GitHub
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Hero 区域 */}
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            欢迎来到我的博客
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
            记录技术学习、项目经验和生活感悟
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/blog"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始阅读 →
            </Link>
            <a
              href="https://github.com/huang-tao-hunter/public-blog-code"
              className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              查看源码
            </a>
          </div>
        </section>

        {/* 特性介绍 */}
        <section className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="text-lg font-semibold mb-2">技术分享</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Java、中间件、分布式系统等技术文章
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-lg font-semibold mb-2">学习笔记</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              读书心得、课程笔记、知识整理
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-lg font-semibold mb-2">生活感悟</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              日常思考、项目复盘、成长记录
            </p>
          </div>
        </section>

        {/* 最新文章预览 */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">最新文章</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm">
            <Link href="/blog/first-post" className="block group">
              <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                第一篇博客文章
              </h3>
              <p className="text-zinc-500 text-sm mt-2">2026-03-09</p>
              <p className="text-zinc-600 dark:text-zinc-400 mt-3">
                这是我的第一篇博客文章，记录一些日常思考和心得...
              </p>
              <span className="inline-block mt-4 text-blue-600 group-hover:underline">
                阅读全文 →
              </span>
            </Link>
          </div>
          <div className="text-center mt-6">
            <Link href="/blog" className="text-blue-600 hover:underline">
              查看全部文章 →
            </Link>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t mt-16 py-8 bg-white/50 dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 text-center text-zinc-600 dark:text-zinc-400">
          <p>© 2026 Hunter's Blog. Built with Next.js & Vercel.</p>
        </div>
      </footer>
    </div>
  )
}
