# Cloudflare Pages 一键部署脚本
# 使用方法：.\deploy-cloudflare.ps1

Write-Host "🚀 Cloudflare Pages 部署脚本" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# 检查 Node.js
Write-Host "`n📦 检查 Node.js..." -ForegroundColor Yellow
try {
  $nodeVersion = node --version
  Write-Host "✓ Node.js 已安装：$nodeVersion" -ForegroundColor Green
} catch {
  Write-Host "✗ 错误：未安装 Node.js" -ForegroundColor Red
  Write-Host "请先安装 Node.js: https://nodejs.org/" -ForegroundColor Yellow
  exit 1
}

# 检查 Wrangler CLI
Write-Host "`n📦 检查 Wrangler CLI..." -ForegroundColor Yellow
$wranglerInstalled = $false
try {
  $wranglerVersion = wrangler --version 2>&1
  if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Wrangler 已安装：$wranglerVersion" -ForegroundColor Green
    $wranglerInstalled = $true
  }
} catch {}

if (-not $wranglerInstalled) {
  Write-Host "⚠ Wrangler 未安装，正在安装..." -ForegroundColor Yellow
  npm install -g wrangler
  if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Wrangler 安装失败" -ForegroundColor Red
    exit 1
  }
  Write-Host "✓ Wrangler 安装成功" -ForegroundColor Green
}

# 登录 Cloudflare
Write-Host "`n🔐 检查 Cloudflare 登录状态..." -ForegroundColor Yellow
try {
  $loginCheck = wrangler whoami 2>&1
  if ($loginCheck -match "not authenticated" -or $loginCheck -match "未认证") {
    Write-Host "⚠ 未登录 Cloudflare，开始登录..." -ForegroundColor Yellow
    wrangler login
    if ($LASTEXITCODE -ne 0) {
      Write-Host "✗ 登录失败" -ForegroundColor Red
      exit 1
    }
    Write-Host "✓ 登录成功" -ForegroundColor Green
  } else {
    Write-Host "✓ 已登录 Cloudflare" -ForegroundColor Green
  }
} catch {}

# 构建项目
Write-Host "`n🔨 构建项目..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "✗ 构建失败" -ForegroundColor Red
  exit 1
}
Write-Host "✓ 构建成功，输出目录：out" -ForegroundColor Green

# 部署到 Cloudflare Pages
Write-Host "`n📤 部署到 Cloudflare Pages..." -ForegroundColor Yellow
Write-Host "提示：首次部署会自动创建项目" -ForegroundColor Gray

$projectName = "public-blog-code"
Write-Host "项目名称：$projectName" -ForegroundColor Cyan

wrangler pages deploy out --project-name=$projectName

if ($LASTEXITCODE -eq 0) {
  Write-Host "`n✅ 部署成功！" -ForegroundColor Green
  Write-Host "================================" -ForegroundColor Green
  Write-Host "请访问 Cloudflare Dashboard 查看部署状态：" -ForegroundColor Cyan
  Write-Host "https://dash.cloudflare.com/?to=/:account/pages" -ForegroundColor White
  Write-Host "`n部署完成后，你会获得一个 *.pages.dev 域名" -ForegroundColor Cyan
} else {
  Write-Host "`n✗ 部署失败，请检查错误信息" -ForegroundColor Red
  exit 1
}
