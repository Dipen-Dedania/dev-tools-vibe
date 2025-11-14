'use client'

import { useState, useEffect } from 'react'
import { Code2, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from './Button'
import { ThemeToggle } from './ThemeToggle'
import { SearchModal } from './SearchModal'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/75">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="relative">
              <Code2 className="h-7 w-7 text-primary-500" />
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-accent-500 rounded-full animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              DevFlow
            </span>
          </Link>

          <div className="flex-1 flex items-center justify-center px-8">
            <Button
              variant="outline"
              className="w-full max-w-md justify-start text-slate-400 hover:text-slate-300"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search tools...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-700 bg-slate-800 px-1.5 font-mono text-xs font-medium text-slate-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Offline</span>
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
