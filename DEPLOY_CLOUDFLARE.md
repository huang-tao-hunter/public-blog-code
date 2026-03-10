# Cloudflare Pages 部署指南

## 📋 前提条件

- Cloudflare 账号（免费）
- 项目已构建并可静态导出

## 🚀 部署方式

### 方式一：Git 直接连接（推荐）

最简单的部署方式，Cloudflare Pages 会直接从 GitHub 拉取代码并自动构建。

#### 步骤：

1. **访问 Cloudflare Pages**
   - https://dash.cloudflare.com/?to=/:account/pages

2. **创建新项目**
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **选择仓库**
   - 选择你的 GitHub 账号
   - 选择 `public-blog-code` 仓库

4. **配置构建设置**
   ```
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: out
   ```

5. **环境变量（可选）**
   - 一般不需要额外配置

6. **点击 "Deploy"**
   - 等待构建完成（约 2-3 分钟）
   - 部署成功后会获得一个 `*.pages.dev` 域名

#### 自动部署

开启 Git 连接后，每次推送到 `master` 分支都会自动触发构建和部署。

---

### 方式二：手动上传（适合快速测试）

如果不想连接 GitHub，可以直接上传构建产物。

#### 步骤：

1. **本地构建**
   ```powershell
   cd C:\Users\79090\.openclaw\workspacels\public-blog-code
   npm run build
   ```
   构建产物在 `out` 目录

2. **使用 Wrangler CLI 部署**
   ```powershell
   # 安装 Wrangler（如果还没安装）
   npm install -g wrangler

   # 登录 Cloudflare
   wrangler login

   # 部署项目
   wrangler pages deploy out --project-name=public-blog-code
   ```

3. **等待部署完成**
   - 首次部署会自动创建项目
   - 获得 `*.pages.dev` 域名

---

## ⚙️ 自定义域名（可选）

如果你的博客有自定义域名：

1. 在 Cloudflare Pages 项目设置中点击 "Custom domains"
2. 添加你的域名
3. Cloudflare 会自动配置 DNS 和 SSL 证书

---

## 🔍 项目配置说明

### `next.config.ts` 关键配置

```typescript
const nextConfig: NextConfig = {
  output: 'export',        // 静态导出
  images: {
    unoptimized: true,     // 禁用图片优化（静态导出必需）
  },
  distDir: 'out',          // 输出目录
}
```

### 为什么需要静态导出？

Cloudflare Pages 是静态网站托管服务，不支持 Node.js 服务器端渲染。

静态导出会：
- 预渲染所有页面为 HTML 文件
- 生成纯静态网站（HTML/CSS/JS）
- 可以直接托管在 CDN 上

---

## ⚠️ 注意事项

### 动态路由限制

静态导出时，所有动态路由（如 `/blog/[slug]`）必须在构建时确定。

✅ **支持：**
- `generateStaticParams` 生成的所有页面
- 构建时已知的路由

❌ **不支持：**
- `getServerSideProps`（服务器端渲染）
- API Routes（需要 Node.js 服务器）
- 运行时动态生成的页面

### 图片优化

静态导出模式下，Next.js 图片优化不可用：
- 使用 `<img>` 标签代替 `<Image>`
- 或者设置 `images.unoptimized: true`

### PWA 支持

PWA 功能完全支持，Service Worker 会正确注册。

---

## 📊 与 Vercel 对比

| 特性 | Vercel | Cloudflare Pages |
|------|--------|------------------|
| 部署方式 | SSR/ISR/静态 | 静态 |
| 国内访问速度 | 中等 | 较快 |
| 免费额度 | 充足 | 充足 |
| 自动部署 | ✅ | ✅ |
| 自定义域名 | ✅ | ✅ |
| SSL 证书 | ✅ | ✅ |
| 分析功能 | Vercel Analytics | Web Analytics |
| 评论系统 | ✅ | ✅ |

---

## 🆘 常见问题

### Q: 构建失败怎么办？

检查 `next.config.ts` 配置：
```bash
npm run build
```
本地先测试构建是否成功。

### Q: 动态路由 404？

确保 `generateStaticParams` 正确返回所有 slug：
```typescript
export async function generateStaticParams() {
  // 返回所有博客文章的 slug
}
```

### Q: 如何查看部署日志？

在 Cloudflare Dashboard 中：
1. 进入 Pages 项目
2. 点击 "Deployments"
3. 查看最近部署的日志

### Q: 如何回滚到旧版本？

在 "Deployments" 页面找到历史版本，点击 "Rollback"。

---

## 📈 性能优化建议

1. **启用压缩** - Cloudflare 自动启用 Brotli/Gzip
2. **配置缓存** - 在 `_headers` 文件中设置缓存策略
3. **使用 CDN** - Cloudflare 全球 CDN 自动加速
4. **压缩图片** - 构建前优化图片大小

---

## 🔗 相关资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 静态导出](https://nextjs.org/docs/app/api-reference/next-config-js/output)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

---

**部署完成后，你的博客将通过 Cloudflare 全球 CDN 加速，国内访问速度更快！** 🚀
