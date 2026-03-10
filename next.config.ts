import type { NextConfig } from 'next'
import withPWAInit from 'next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 注释掉静态导出，让 Vercel 使用默认 SSR/ISR 模式
  // 这样动态路由会自动工作
  // output: 'export',
  // distDir: 'out',
  // images: {
  //   unoptimized: true,
  // },
  // Force webpack for PWA support (next-pwa requires webpack)
  // Turbopack doesn't support PWA plugins yet
  webpack: (config, { isServer }) => {
    return config
  },
  // Empty turbopack config to silence warning when using webpack
  turbopack: {},
}

export default withPWA(nextConfig)

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
