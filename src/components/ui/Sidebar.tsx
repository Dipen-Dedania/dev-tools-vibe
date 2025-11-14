'use client'

import { cn } from '@/lib/utils'
import {
  Code,
  FileJson,
  Hash,
  Lock,
  Repeat,
  Settings,
  Star,
  Clock,
  Home,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Recent', href: '/recent', icon: Clock },
  { name: 'Favorites', href: '/favorites', icon: Star },
]

const categories = [
  { name: 'Encoders', href: '/encoders', icon: Lock, count: 10 },
  { name: 'Converters', href: '/converters', icon: Repeat, count: 12 },
  { name: 'Formatters', href: '/formatters', icon: Code, count: 15 },
  { name: 'Generators', href: '/generators', icon: Hash, count: 13 },
  { name: 'Validators', href: '/validators', icon: FileJson, count: 8 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 flex flex-col">
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Categories
          </h3>
          <div className="space-y-1">
            {categories.map(item => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors group',
                    isActive
                      ? 'bg-slate-800 text-primary-400'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1">{item.name}</span>
                  <span className="text-xs text-slate-500 group-hover:text-slate-400">
                    {item.count}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>

      <div className="border-t border-slate-800 p-4 text-xs text-slate-500">
        <div className="flex items-center justify-between mb-1">
          <span>DevFlow</span>
          <span className="text-slate-600">v1.0.0</span>
        </div>
        <p className="text-slate-600">100% offline • Privacy-first</p>
      </div>
    </aside>
  )
}
