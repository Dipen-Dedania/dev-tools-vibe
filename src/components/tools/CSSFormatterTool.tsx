'use client'

import { useState, useEffect } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { CopyButton } from '@/components/ui/CopyButton'
import { formatCSS } from '@/lib/tools/formatters'
import Prism from 'prismjs'
import 'prismjs/components/prism-css'
import '@/styles/prism-dark.css'

export default function CSSFormatterTool() {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (output && typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [output])

  const handleFormat = () => {
    setError('')
    setOutput('')

    if (!input.trim()) {
      setError('Please enter CSS to format')
      return
    }

    try {
      const formatted = formatCSS(input)
      setOutput(formatted)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleMinify = () => {
    setError('')
    setOutput('')

    if (!input.trim()) {
      setError('Please enter CSS to minify')
      return
    }

    try {
      const minified = input
        .replace(/\n/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*:\s*/g, ':')
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

  const handleAutoPrefix = () => {
    if (output) {
      // Simple auto-prefixing for common properties
      const prefixes = ['-webkit-', '-moz-', '-ms-', '-o-']
      const propsToPrefix = ['transform', 'transition', 'animation', 'box-shadow', 'border-radius']

      let prefixed = output
      propsToPrefix.forEach(prop => {
        const regex = new RegExp(`(\\s+)(${prop}):`, 'g')
        prefixed = prefixed.replace(regex, (match, space, property) => {
          const prefixedProps = prefixes.map(prefix => `${space}${prefix}${property}:`).join('\n')
          return `${prefixedProps}\n${match}`
        })
      })
      setOutput(prefixed)
    }
  }

  const examples = [
    {
      label: 'Basic Styles',
      css: '.container { display: flex; justify-content: center; align-items: center; padding: 20px; margin: 0 auto; max-width: 1200px; }'
    },
    {
      label: 'Complex Selectors',
      css: 'nav ul li a { color: #333; text-decoration: none; } nav ul li a:hover { color: #0066cc; text-decoration: underline; } @media (max-width: 768px) { nav ul { flex-direction: column; } }'
    },
    {
      label: 'Animations',
      css: '@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate { animation: fadeIn 0.3s ease-out; }'
    }
  ]

  return (
    <ToolPage
      title="CSS Formatter & Beautifier"
      description="Format and beautify CSS stylesheets with syntax highlighting"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Input CSS</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type CSS code here..."
            rows={10}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button onClick={handleFormat} className="flex-1">
            Format CSS
          </Button>
          <Button onClick={handleMinify} variant="outline">
            Minify
          </Button>
          <Button onClick={handleAutoPrefix} variant="outline" disabled={!output}>
            Add Vendor Prefixes
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
              <label className="text-sm font-medium">Formatted CSS</label>
              <CopyButton text={output} />
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm">
                <code className="language-css">{output}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">Example CSS</h3>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(example.css)
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
                      {example.css.slice(0, 80)}
                      {example.css.length > 80 ? '...' : ''}
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
              <span>Automatic property formatting and indentation</span>
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
              <span>Minify option for production CSS</span>
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
              <span>Auto-add vendor prefixes for common properties</span>
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
              <span>Supports media queries and keyframes</span>
            </li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-indigo-500/10 border border-indigo-500/50 rounded-lg p-4">
          <h3 className="font-medium mb-2 text-sm text-indigo-400">Pro Tips</h3>
          <ul className="space-y-1 text-sm text-indigo-200/80">
            <li>• Format before minifying to ensure proper structure</li>
            <li>• Use vendor prefixes for older browser support</li>
            <li>• Minified CSS is smaller but harder to debug</li>
            <li>• Consider using CSS preprocessors (SCSS/LESS) for complex projects</li>
          </ul>
        </div>
      </div>
    </ToolPage>
  )
}
