'use client'

import { MainLayout } from '@/components/layouts/MainLayout'
import { useTheme, useFavorites, useRecentTools } from '@/hooks'
import { Button } from '@/components/ui/Button'
import { THEME_MODES } from '@/lib/constants'
import { Settings, Sun, Moon, Monitor, Trash2, Star } from 'lucide-react'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { favorites } = useFavorites()
  const { clearRecentTools, getRecentToolIds } = useRecentTools()

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-200 mb-2 flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-slate-400">
            Customize your DevFlow experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Appearance</h2>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTheme(THEME_MODES.LIGHT)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === THEME_MODES.LIGHT
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <Sun className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Light</div>
                </button>

                <button
                  onClick={() => setTheme(THEME_MODES.DARK)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === THEME_MODES.DARK
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <Moon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Dark</div>
                </button>

                <button
                  onClick={() => setTheme(THEME_MODES.SYSTEM)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === THEME_MODES.SYSTEM
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <Monitor className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">System</div>
                </button>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Data & Privacy</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Favorites
                  </div>
                  <div className="text-sm text-slate-400">
                    {favorites.length} tool{favorites.length !== 1 ? 's' : ''} saved
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">Recent History</div>
                  <div className="text-sm text-slate-400">
                    {getRecentToolIds().length} recent tool{getRecentToolIds().length !== 1 ? 's' : ''}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearRecentTools}
                  className="gap-2"
                  disabled={getRecentToolIds().length === 0}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 bg-white rounded-full" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-green-300 mb-1">100% Offline</div>
                    <div className="text-green-400/80">
                      All data is stored locally in your browser. Nothing is sent to any server.
                      Your privacy is our priority.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">Keyboard Shortcuts</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Search Tools</span>
                <kbd className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded font-mono text-sm">
                  ⌘K / Ctrl+K
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Toggle Theme</span>
                <kbd className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded font-mono text-sm">
                  Click theme icon
                </kbd>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">About DevFlow</h2>

            <div className="space-y-3 text-slate-400">
              <div className="flex items-center justify-between">
                <span>Version</span>
                <span className="font-mono text-primary-400">1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tools Available</span>
                <span className="font-mono text-accent-400">20+</span>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <p className="text-sm">
                  DevFlow is an all-in-one developer utilities platform. Built with Next.js 14,
                  TypeScript, and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

