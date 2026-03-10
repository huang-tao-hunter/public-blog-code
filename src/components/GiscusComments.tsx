'use client'

import Giscus from '@giscus/react'

export default function GiscusComments() {
  // TODO: 在使用前需要配置以下参数
  // 配置指南：https://giscus.app/zh-CN
  // 1. 访问 https://giscus.app/zh-CN
  // 2. 输入你的 GitHub 仓库信息
  // 3. 获取 repoId 和 categoryId
  // 4. 替换下面的占位符
  
  return (
    <div className="mt-12 pt-8 border-t dark:border-zinc-700">
      <Giscus
        repo="huang-tao-hunter/public-blog-code"
        repoId="R_kgDOXXXXXX" // ⚠️ 需要替换为实际的 repoId
        category="Announcements"
        categoryId="DIC_kwDOXXXXXX" // ⚠️ 需要替换为实际的 categoryId
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        inputPosition="bottom"
        theme="light"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  )
}
