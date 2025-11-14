'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { searchTools } from '@/lib/toolRegistry'
import { Tool } from '@/types'
import { useRouter } from 'next/navigation'
import { Button } from './Button'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tool[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchTools(query)
      setResults(searchResults)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelectTool(results[selectedIndex])
    }
  }

  const handleSelectTool = (tool: Tool) => {
    router.push(`/tools/${tool.id}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-lg text-slate-200 placeholder-slate-500"
            placeholder="Search tools..."
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No tools found for "{query}"
            </div>
          ) : (
            <div className="p-2">
              {results.map((tool, index) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelectTool(tool)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary-600/20 border border-primary-600/30'
                      : 'hover:bg-slate-800 border border-transparent'
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="font-medium text-slate-200">{tool.name}</div>
                  <div className="text-sm text-slate-400">{tool.description}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tool.keywords.slice(0, 4).map(keyword => (
                      <span
                        key={keyword}
                        className="px-2 py-0.5 text-xs bg-slate-800 text-slate-400 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-slate-800 rounded">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-slate-800 rounded">Enter</kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-slate-800 rounded">Esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  )
}
