import { MainLayout } from '@/components/layouts/MainLayout'
import { Settings } from 'lucide-react'

export const metadata = {
  title: 'Settings - DevFlow',
  description: 'Application settings',
}

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Settings</h1>
          <p className="text-slate-400">Customize your DevFlow experience</p>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Privacy</h3>
            <p className="text-sm text-slate-400 mb-4">
              All tools work 100% offline with zero data collection
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">Track recent tools</p>
                  <p className="text-xs text-slate-500">Store recently used tools locally</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-primary-600 relative">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">Auto-save inputs</p>
                  <p className="text-xs text-slate-500">Remember your last inputs</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-slate-700 relative">
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-slate-400"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">About</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Version</span>
                <span className="text-slate-200">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">License</span>
                <span className="text-slate-200">MIT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Repository</span>
                <a
                  href="https://github.com/Harshmakadia/dev-tools-vibe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

