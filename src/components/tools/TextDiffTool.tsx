'use client'

import { useState } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'

interface DiffLine {
  type: 'add' | 'remove' | 'same'
  content: string
  lineNumber: number
}

export default function TextDiffTool() {
  const [originalText, setOriginalText] = useState<string>('')
  const [modifiedText, setModifiedText] = useState<string>('')
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side')
  const [showDiffOnly, setShowDiffOnly] = useState<boolean>(false)

  const handleClear = () => {
    setOriginalText('')
    setModifiedText('')
  }

  const handleSwap = () => {
    const temp = originalText
    setOriginalText(modifiedText)
    setModifiedText(temp)
  }

  // Simple line-based diff algorithm
  const computeDiff = (): { original: DiffLine[]; modified: DiffLine[] } => {
    const originalLines = originalText.split('\n')
    const modifiedLines = modifiedText.split('\n')

    const original: DiffLine[] = []
    const modified: DiffLine[] = []

    let i = 0
    let j = 0

    while (i < originalLines.length || j < modifiedLines.length) {
      const origLine = originalLines[i]
      const modLine = modifiedLines[j]

      if (origLine === modLine) {
        // Lines are the same
        original.push({ type: 'same', content: origLine || '', lineNumber: i + 1 })
        modified.push({ type: 'same', content: modLine || '', lineNumber: j + 1 })
        i++
        j++
      } else if (i >= originalLines.length) {
        // Only modified lines left (additions)
        original.push({ type: 'same', content: '', lineNumber: 0 })
        modified.push({ type: 'add', content: modLine, lineNumber: j + 1 })
        j++
      } else if (j >= modifiedLines.length) {
        // Only original lines left (deletions)
        original.push({ type: 'remove', content: origLine, lineNumber: i + 1 })
        modified.push({ type: 'same', content: '', lineNumber: 0 })
        i++
      } else {
        // Lines differ - check if next lines match
        const nextOrigMatchesMod = originalLines[i + 1] === modLine
        const nextModMatchesOrig = modifiedLines[j + 1] === origLine

        if (nextOrigMatchesMod) {
          // Current original line was removed
          original.push({ type: 'remove', content: origLine, lineNumber: i + 1 })
          modified.push({ type: 'same', content: '', lineNumber: 0 })
          i++
        } else if (nextModMatchesOrig) {
          // Current modified line was added
          original.push({ type: 'same', content: '', lineNumber: 0 })
          modified.push({ type: 'add', content: modLine, lineNumber: j + 1 })
          j++
        } else {
          // Both lines changed
          original.push({ type: 'remove', content: origLine, lineNumber: i + 1 })
          modified.push({ type: 'add', content: modLine, lineNumber: j + 1 })
          i++
          j++
        }
      }
    }

    return { original, modified }
  }

  const diff = originalText || modifiedText ? computeDiff() : null

  const filteredDiff = diff && showDiffOnly
    ? {
        original: diff.original.filter(line => line.type !== 'same' || line.content === ''),
        modified: diff.modified.filter(line => line.type !== 'same' || line.content === ''),
      }
    : diff

  const stats = diff
    ? {
        additions: diff.modified.filter(l => l.type === 'add').length,
        deletions: diff.original.filter(l => l.type === 'remove').length,
        unchanged: diff.original.filter(l => l.type === 'same' && l.content).length,
      }
    : null

  return (
    <ToolPage
      title="Text Diff Checker"
      description="Compare two text inputs and visualize the differences side-by-side"
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex gap-2">
            <Button
              onClick={() => setViewMode('side-by-side')}
              variant={viewMode === 'side-by-side' ? 'default' : 'outline'}
              size="sm"
            >
              Side by Side
            </Button>
            <Button
              onClick={() => setViewMode('unified')}
              variant={viewMode === 'unified' ? 'default' : 'outline'}
              size="sm"
            >
              Unified
            </Button>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showDiffOnly}
              onChange={(e) => setShowDiffOnly(e.target.checked)}
              className="rounded"
            />
            Show differences only
          </label>
          <div className="flex-1"></div>
          <Button onClick={handleSwap} variant="ghost" size="sm">
            Swap
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm">
            Clear
          </Button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="flex gap-4 bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">
                <span className="font-medium text-green-400">{stats.additions}</span> additions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">
                <span className="font-medium text-red-400">{stats.deletions}</span> deletions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm">
                <span className="font-medium text-gray-400">{stats.unchanged}</span> unchanged
              </span>
            </div>
          </div>
        )}

        {/* Input Areas (shown when no diff or minimal diff) */}
        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Original Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Original Text</label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Enter original text..."
                rows={15}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
              />
            </div>

            {/* Modified Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Modified Text</label>
              <textarea
                value={modifiedText}
                onChange={(e) => setModifiedText(e.target.value)}
                placeholder="Enter modified text..."
                rows={15}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Original Text</label>
                <textarea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="Enter original text..."
                  rows={8}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Modified Text</label>
                <textarea
                  value={modifiedText}
                  onChange={(e) => setModifiedText(e.target.value)}
                  placeholder="Enter modified text..."
                  rows={8}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                />
              </div>
            </div>
          </div>
        )}

        {/* Diff View */}
        {filteredDiff && (originalText || modifiedText) && viewMode === 'side-by-side' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Original with Diffs */}
            <div>
              <h3 className="text-sm font-medium mb-2">Original (Deletions)</h3>
              <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                <div className="max-h-96 overflow-y-auto font-mono text-sm">
                  {filteredDiff.original.map((line, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        line.type === 'remove'
                          ? 'bg-red-500/10 text-red-300'
                          : line.content === ''
                          ? 'bg-slate-800/30'
                          : 'text-gray-400'
                      }`}
                    >
                      <div className="w-12 flex-shrink-0 text-center border-r border-slate-700 px-2 py-1 text-gray-500 select-none">
                        {line.lineNumber || ''}
                      </div>
                      <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all">
                        {line.content || '\u00A0'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modified with Diffs */}
            <div>
              <h3 className="text-sm font-medium mb-2">Modified (Additions)</h3>
              <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                <div className="max-h-96 overflow-y-auto font-mono text-sm">
                  {filteredDiff.modified.map((line, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        line.type === 'add'
                          ? 'bg-green-500/10 text-green-300'
                          : line.content === ''
                          ? 'bg-slate-800/30'
                          : 'text-gray-400'
                      }`}
                    >
                      <div className="w-12 flex-shrink-0 text-center border-r border-slate-700 px-2 py-1 text-gray-500 select-none">
                        {line.lineNumber || ''}
                      </div>
                      <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all">
                        {line.content || '\u00A0'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unified Diff View */}
        {filteredDiff && (originalText || modifiedText) && viewMode === 'unified' && (
          <div>
            <h3 className="text-sm font-medium mb-2">Unified Diff</h3>
            <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto font-mono text-sm">
                {filteredDiff.original.map((line, idx) => {
                  if (line.type === 'remove') {
                    return (
                      <div key={`orig-${idx}`} className="flex bg-red-500/10 text-red-300">
                        <div className="w-4 flex-shrink-0 text-center px-2 py-1 text-red-400">
                          -
                        </div>
                        <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all">
                          {line.content}
                        </div>
                      </div>
                    )
                  } else if (line.type === 'same' && line.content) {
                    return (
                      <div key={`same-${idx}`} className="flex text-gray-400">
                        <div className="w-4 flex-shrink-0 text-center px-2 py-1">\u00A0</div>
                        <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all">
                          {line.content}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
                {filteredDiff.modified.map((line, idx) => {
                  if (line.type === 'add') {
                    return (
                      <div key={`mod-${idx}`} className="flex bg-green-500/10 text-green-300">
                        <div className="w-4 flex-shrink-0 text-center px-2 py-1 text-green-400">
                          +
                        </div>
                        <div className="flex-1 px-3 py-1 whitespace-pre-wrap break-all">
                          {line.content}
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-slate-800/50 rounded-lg p-4 text-sm">
          <h3 className="font-medium mb-2">How to use</h3>
          <ul className="space-y-1 text-gray-400 list-disc list-inside">
            <li>Paste your original text in the left/first textarea</li>
            <li>Paste your modified text in the right/second textarea</li>
            <li>Green highlights show additions, red highlights show deletions</li>
            <li>Use &quot;Show differences only&quot; to hide unchanged lines</li>
            <li>Switch between Side-by-Side and Unified views</li>
          </ul>
        </div>
      </div>
    </ToolPage>
  )
}
