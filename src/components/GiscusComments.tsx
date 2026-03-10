'use client'

import Giscus from '@giscus/react'

export default function GiscusComments() {
  // TODO: 在使用前需要配置以下参数
  // 配置指南：https://giscus.app/zh-CN
  // 1. 访问 https://giscus.app/zh-CN
  // 2. 输入你的 GitHub 仓库信息
  // 3. 获取 repoId 和 categoryId
  // 4. 替换下面的占位符
  
  // 临时禁用 Giscus 直到配置完成
  return (
    <div className="mt-12 pt-8 border-t dark:border-zinc-700">
      <div className="text-center text-gray-500 py-8">
        <p>评论功能待配置</p>
        <p className="text-sm mt-2">请参考 <a href="https://giscus.app/zh-CN" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">giscus.app</a> 进行配置</p>
      </div>
      {/*
      <Giscus
        repo="huang-tao-hunter/public-blog-code"
        repoId="R_kgDOXXXXXX"
        category="Announcements"
        categoryId="DIC_kwDOXXXXXX"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        inputPosition="bottom"
        theme="light"
        lang="zh-CN"
        loading="lazy"
      />
      */}
    </div>
  )
}
