'use client'

import { useState, useEffect } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { CopyButton } from '@/components/ui/CopyButton'
import { formatSQL } from '@/lib/tools/formatters'
import Prism from 'prismjs'
import 'prismjs/components/prism-sql'
import '@/styles/prism-dark.css'

export default function SQLFormatterTool() {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [indent, setIndent] = useState<number>(2)

  useEffect(() => {
    // Highlight the output code whenever it changes
    if (output && typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [output])

  const handleFormat = () => {
    setError('')
    setOutput('')

    if (!input.trim()) {
      setError('Please enter SQL to format')
      return
    }

    try {
      const formatted = formatSQL(input, indent)
      setOutput(formatted)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleMinify = () => {
    setError('')
    setOutput('')

    if (!input.trim()) {
      setError('Please enter SQL to minify')
      return
    }

    try {
      const minified = input.replace(/\s+/g, ' ').trim()
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

  const handleUppercase = () => {
    if (output) {
      const keywords = [
        'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY',
        'HAVING', 'JOIN', 'ON', 'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES',
        'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER',
        'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'AS', 'DISTINCT', 'INNER',
        'LEFT', 'RIGHT', 'FULL', 'OUTER', 'CROSS', 'NATURAL'
      ]

      let result = output
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
        result = result.replace(regex, keyword.toUpperCase())
      })
      setOutput(result)
    }
  }

  const examples = [
    {
      label: 'Simple SELECT',
      sql: 'select id, name, email from users where active = 1 order by created_at desc limit 10'
    },
    {
      label: 'JOIN Query',
      sql: 'select u.id, u.name, o.order_id, o.total from users u inner join orders o on u.id = o.user_id where o.status = \'completed\' and o.total > 100'
    },
    {
      label: 'Complex Query',
      sql: 'select p.product_name, c.category_name, sum(oi.quantity) as total_sold from products p left join categories c on p.category_id = c.id inner join order_items oi on p.id = oi.product_id group by p.id, c.id having sum(oi.quantity) > 50 order by total_sold desc'
    }
  ]

  return (
    <ToolPage
      title="SQL Formatter & Beautifier"
      description="Format and beautify SQL queries with syntax highlighting"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Input SQL</label>
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
            placeholder="Paste or type SQL query here..."
            rows={10}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button onClick={handleFormat} className="flex-1">
            Format SQL
          </Button>
          <Button onClick={handleMinify} variant="outline">
            Minify
          </Button>
          <Button onClick={handleUppercase} variant="outline" disabled={!output}>
            Uppercase Keywords
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
              <label className="text-sm font-medium">Formatted SQL</label>
              <CopyButton text={output} />
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm">
                <code className="language-sql">{output}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">Example Queries</h3>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(example.sql)
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
                      {example.sql.slice(0, 100)}
                      {example.sql.length > 100 ? '...' : ''}
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
              <span>Automatic keyword formatting and capitalization</span>
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
              <span>Minify option for production queries</span>
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
              <span>Support for complex JOIN queries</span>
            </li>
          </ul>
        </div>
      </div>
    </ToolPage>
  )
}
