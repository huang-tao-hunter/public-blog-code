'use client'

import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // 3 天后再次提示
      const lastDismissed = localStorage.getItem('pwa-prompt-dismissed')
      if (!lastDismissed || Date.now() - parseInt(lastDismissed) > 3 * 24 * 60 * 60 * 1000) {
        setShowPrompt(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowPrompt(false)
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 z-50">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
            安装到主屏幕
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            快速获取博客更新，离线也能访问
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleInstall}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          安装
        </button>
        <button
          onClick={handleDismiss}
          className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-sm"
        >
          以后再说
        </button>
      </div>
    </div>
  )
}
