// 简单的 Markdown 渲染组件
// 将 Markdown 文本转换为基本的 HTML

type MarkdownRendererProps = {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 简单的 Markdown 解析（生产环境建议使用 react-markdown）
  const renderMarkdown = (text: string) => {
    let html = text

    // 标题
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    
    // 粗体和斜体
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // 链接
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    
    // 列表
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
    
    // 代码块
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded my-4 overflow-x-auto"><code>$1</code></pre>')
    
    // 行内代码
    html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded">$1</code>')
    
    // 段落
    html = html.replace(/\n\n/g, '</p><p class="mb-4">')
    html = '<p class="mb-4">' + html + '</p>'
    
    return html
  }

  return (
    <div 
      className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}
