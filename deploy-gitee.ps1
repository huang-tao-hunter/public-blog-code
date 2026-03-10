# Gitee Pages 一键部署脚本
# 使用方法：.\deploy-gitee.ps1 -GiteeRepo "your-username/your-repo"

param(
    [Parameter(Mandatory=$true)]
    [string]$GiteeRepo,
    
    [string]$Branch = "master"
)

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Next.js Blog Gitee Pages 部署脚本" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# 1. 安装依赖
Write-Host "[1/4] 安装依赖..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 依赖安装失败！" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 依赖安装完成" -ForegroundColor Green
Write-Host ""

# 2. 构建静态网站
Write-Host "[2/4] 构建静态网站..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败！" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 构建完成，输出目录：/out" -ForegroundColor Green
Write-Host ""

# 3. 部署到 Gitee
Write-Host "[3/4] 准备部署到 Gitee..." -ForegroundColor Yellow
Write-Host "仓库：$GiteeRepo" -ForegroundColor Cyan
Write-Host "分支：$Branch" -ForegroundColor Cyan
Write-Host ""

# 检查 out 目录是否存在
if (-not (Test-Path "out")) {
    Write-Host "❌ 输出目录不存在！" -ForegroundColor Red
    exit 1
}

# 进入 out 目录并初始化 git
Push-Location out

# 初始化 git（如果已存在 .git 目录则跳过）
if (-not (Test-Path ".git")) {
    git init
}

# 添加所有文件
git add .

# 创建提交
$commitMsg = "Deploy to Gitee Pages - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMsg

# 设置 Gitee 远程仓库
$giteeUrl = "https://gitee.com/$GiteeRepo.git"
git remote remove gitee 2>$null
git remote add gitee $giteeUrl

Write-Host "[4/4] 推送到 Gitee..." -ForegroundColor Yellow
git push -f gitee $Branch

if ($LASTEXITCODE -eq 0) {
    Pop-Location
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "  🎉 部署成功！" -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
    Write-Host ""
    
    # 提取用户名和仓库名
    $parts = $GiteeRepo -split '/'
    $username = $parts[0]
    $reponame = $parts[1]
    
    Write-Host "📍 访问地址：" -ForegroundColor Cyan -NoNewline
    Write-Host "https://$username.gitee.io/$reponame/" -ForegroundColor White
    Write-Host ""
    Write-Host "⚠️  如果页面无法访问，请检查：" -ForegroundColor Yellow
    Write-Host "  1. Gitee 账号已完成实名认证" -ForegroundColor Gray
    Write-Host "  2. 已在 Gitee 仓库中开启 Pages 服务" -ForegroundColor Gray
    Write-Host "  3. Pages 服务来源分支设置为：$Branch" -ForegroundColor Gray
    Write-Host ""
} else {
    Pop-Location
    Write-Host "❌ 推送失败！请检查网络连接和仓库权限。" -ForegroundColor Red
    exit 1
}
