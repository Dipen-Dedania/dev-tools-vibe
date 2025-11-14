'use client'

import { useState, useEffect } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { CopyButton } from '@/components/ui/CopyButton'
import { markdownToHtml } from '@/lib/tools/converters'

export default function MarkdownPreviewerTool() {
  const [markdown, setMarkdown] = useState<string>('')
  const [html, setHtml] = useState<string>('')
  const [viewMode, setViewMode] = useState<'split' | 'preview' | 'source'>('split')

  useEffect(() => {
    if (markdown) {
      try {
        const converted = markdownToHtml(markdown)
        setHtml(converted)
      } catch (err) {
        console.error('Failed to convert markdown:', err)
      }
    } else {
      setHtml('')
    }
  }, [markdown])

  const handleClear = () => {
    setMarkdown('')
    setHtml('')
  }

  const sampleMarkdown = `# Welcome to Markdown Previewer

## Features

This is a **live preview** of your *markdown* content.

### Lists

- Item 1
- Item 2
- Item 3

### Code

Inline code: \`const x = 10\`

### Links

[Visit DevFlow](https://devflow.com)

### Formatting

**Bold text** and *italic text* and ***bold italic***

---

Happy writing!`

  const handleLoadSample = () => {
    setMarkdown(sampleMarkdown)
  }

  return (
    <ToolPage
      title="Markdown Previewer"
      description="Write markdown and preview the rendered HTML in real-time"
    >
      <div className="space-y-6">
        {/* View Mode Controls */}
        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex gap-2">
            <Button
              onClick={() => setViewMode('split')}
              variant={viewMode === 'split' ? 'default' : 'outline'}
              size="sm"
            >
              Split View
            </Button>
            <Button
              onClick={() => setViewMode('source')}
              variant={viewMode === 'source' ? 'default' : 'outline'}
              size="sm"
            >
              Source Only
            </Button>
            <Button
              onClick={() => setViewMode('preview')}
              variant={viewMode === 'preview' ? 'default' : 'outline'}
              size="sm"
            >
              Preview Only
            </Button>
          </div>
          <div className="flex-1"></div>
          <Button onClick={handleLoadSample} variant="ghost" size="sm">
            Load Sample
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm">
            Clear
          </Button>
        </div>

        {/* Editor and Preview */}
        <div className={`grid gap-4 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Markdown Source */}
          {(viewMode === 'split' || viewMode === 'source') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Markdown Source</label>
                <CopyButton text={markdown} />
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="# Start typing your markdown here...

## Features
- **Bold** text
- *Italic* text
- [Links](https://example.com)
- `Inline code`

Happy writing!"
                rows={20}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
              />
            </div>
          )}

          {/* Live Preview */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Live Preview</label>
                <CopyButton text={html} />
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-6 py-4 min-h-[500px]">
                {html ? (
                  <div
                    className="prose prose-invert prose-sm max-w-none markdown-preview"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ) : (
                  <div className="text-gray-500 text-sm italic">
                    Preview will appear here...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Markdown Reference */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">Markdown Syntax Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <div className="text-gray-400 mb-1">Headers</div>
                <code className="text-xs bg-slate-700/50 px-2 py-1 rounded block">
                  # H1<br />
                  ## H2<br />
                  ### H3
                </code>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Emphasis</div>
                <code className="text-xs bg-slate-700/50 px-2 py-1 rounded block">
                  **bold** or *italic*
                </code>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Links</div>
                <code className="text-xs bg-slate-700/50 px-2 py-1 rounded block">
                  [text](url)
                </code>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-gray-400 mb-1">Lists</div>
                <code className="text-xs bg-slate-700/50 px-2 py-1 rounded block">
                  - Item 1<br />
                  - Item 2
                </code>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Inline Code</div>
                <code className="text-xs bg-slate-700/50 px-2 py-1 rounded block">
                  `code here`
                </code>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Horizontal Rule</div>
                <code className="text-xs bg-slate-700/50 px-2 py-1 rounded block">
                  ---
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">Features</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Live preview as you type</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Split, source-only, and preview-only views</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Copy markdown or HTML output</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Supports headers, lists, links, code, and formatting</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Sample markdown template included</span>
            </li>
          </ul>
        </div>

        <style jsx>{`
          .markdown-preview h1 {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 0.5em;
            color: #e2e8f0;
          }
          .markdown-preview h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 0.5em;
            color: #cbd5e1;
          }
          .markdown-preview h3 {
            font-size: 1.25em;
            font-weight: bold;
            margin-top: 0.8em;
            margin-bottom: 0.4em;
            color: #cbd5e1;
          }
          .markdown-preview p {
            margin-bottom: 1em;
            line-height: 1.6;
          }
          .markdown-preview strong {
            font-weight: bold;
            color: #f1f5f9;
          }
          .markdown-preview em {
            font-style: italic;
          }
          .markdown-preview a {
            color: #60a5fa;
            text-decoration: underline;
          }
          .markdown-preview a:hover {
            color: #93c5fd;
          }
          .markdown-preview code {
            background: #1e293b;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9em;
            color: #fbbf24;
          }
          .markdown-preview ul {
            list-style: disc;
            margin-left: 1.5em;
            margin-bottom: 1em;
          }
          .markdown-preview li {
            margin-bottom: 0.25em;
          }
          .markdown-preview hr {
            border: none;
            border-top: 1px solid #334155;
            margin: 1.5em 0;
          }
        `}</style>
      </div>
    </ToolPage>
  )
}
