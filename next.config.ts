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
  // Vercel 使用默认 SSR/ISR 模式，不需要 output: 'export'
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
