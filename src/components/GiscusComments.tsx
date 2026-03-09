'use client'

import Giscus from '@giscus/react'

interface GiscusComponentProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'number' | 'specific'
  strict?: string
  reactionsEnabled?: '1' | '0'
  metadataEncoding?: string
  inputPosition?: 'top' | 'bottom'
  theme?: string
  lang?: string
  loading?: 'lazy'
}

export default function GiscusComponent() {
  // TODO: 在使用前需要配置以下参数
  // 配置指南：https://giscus.app/zh-CN
  // 1. 访问 https://giscus.app/zh-CN
  // 2. 输入你的 GitHub 仓库信息
  // 3. 获取 repoId 和 categoryId
  // 4. 替换下面的占位符
  
  const config: GiscusComponentProps = {
    repo: 'huang-tao-hunter/public-blog-code',
    repoId: 'R_kgDOXXXXXX', // ⚠️ 需要替换
    category: 'Announcements',
    categoryId: 'DIC_kwDOXXXXXX', // ⚠️ 需要替换
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '1',
    metadataEncoding: 'utf-8',
    inputPosition: 'bottom',
    theme: 'light',
    lang: 'zh-CN',
    loading: 'lazy',
  }

  return (
    <div className="mt-12 pt-8 border-t dark:border-zinc-700">
      <Giscus {...config} />
    </div>
  )
}
