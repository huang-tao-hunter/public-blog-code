import type { NextConfig } from 'next'
import withPWAInit from 'next-pwa'

const withPWA = withPWAInit({
  dest: 'out',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 启用静态导出以支持 Cloudflare Pages 部署
  output: 'export',
  // 静态导出不支持图片优化，使用未优化模式
  images: {
    unoptimized: true,
  },
  // 构建输出目录
  distDir: 'out',
  // Force webpack for PWA support (next-pwa requires webpack)
  // Turbopack doesn't support PWA plugins yet
  webpack: (config, { isServer }) => {
    return config
  },
  // Empty turbopack config to silence warning when using webpack
  turbopock: {},
}

export default withPWA(nextConfig)
