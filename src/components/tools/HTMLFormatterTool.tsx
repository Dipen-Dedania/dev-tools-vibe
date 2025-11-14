'use client'

import { useState, useEffect } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { CopyButton } from '@/components/ui/CopyButton'
import { formatHTML } from '@/lib/tools/formatters'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import '@/styles/prism-dark.css'

export default function HTMLFormatterTool() {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [indent, setIndent] = useState<number>(2)

  useEffect(() => {
    if (output && typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [output])

  const handleFormat = () => {
    setError('')
    setOutput('')

    if (!input.trim()) {
      setError('Please enter HTML to format')
      return
    }

    try {
      const formatted = formatHTML(input)
      // Apply custom indentation if different from default
      if (indent !== 2) {
        const lines = formatted.split('\n')
        const reindented = lines.map(line => {
          const leadingSpaces = line.match(/^\s*/)?.[0].length || 0
          const indentLevel = leadingSpaces / 2
          return ' '.repeat(indentLevel * indent) + line.trim()
        }).join('\n')
        setOutput(reindented)
      } else {
        setOutput(formatted)
      }
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleMinify = () => {
    setError('')
    setOutput('')

    if (!input.trim()) {
      setError('Please enter HTML to minify')
      return
    }

    try {
      const minified = input
        .replace(/\n/g, '')
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim()
      setOutput(minified)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const examples = [
    {
      label: 'Simple HTML',
      html: '<div><h1>Hello World</h1><p>This is a paragraph.</p></div>'
    },
    {
      label: 'HTML with Attributes',
      html: '<div class="container"><img src="image.jpg" alt="Description" /><a href="#" class="btn btn-primary">Click me</a></div>'
    },
    {
      label: 'Complex Structure',
      html: '<html><head><meta charset="UTF-8"><title>Document</title></head><body><header><nav><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li></ul></nav></header><main><article><h1>Article Title</h1><p>Article content goes here.</p></article></main></body></html>'
    }
  ]

  return (
    <ToolPage
      title="HTML Formatter"
      description="Format and beautify HTML code with syntax highlighting"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Input HTML</label>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-400">Indent:</label>
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value))}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>1 tab</option>
              </select>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type HTML code here..."
            rows={10}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button onClick={handleFormat} className="flex-1">
            Format HTML
          </Button>
          <Button onClick={handleMinify} variant="outline">
            Minify
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Output Section */}
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Formatted HTML</label>
              <CopyButton text={output} />
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm">
                <code className="language-markup">{output}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">Example HTML</h3>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(example.html)
                  setOutput('')
                  setError('')
                }}
                className="w-full text-left bg-slate-700/30 hover:bg-slate-700/50 rounded px-3 py-2 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="text-cyan-400 text-sm font-medium mb-1">
                      {example.label}
                    </div>
                    <code className="text-xs text-gray-400 font-mono break-all">
                      {example.html.slice(0, 80)}
                      {example.html.length > 80 ? '...' : ''}
                    </code>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features List */}
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
              <span>Automatic tag formatting and indentation</span>
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
              <span>Syntax highlighting with Prism.js</span>
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
              <span>Customizable indentation (2, 4, or 8 spaces)</span>
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
              <span>Minify option for production HTML</span>
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
              <span>Preserves attributes and self-closing tags</span>
            </li>
          </ul>
        </div>
      </div>
    </ToolPage>
  )
}
