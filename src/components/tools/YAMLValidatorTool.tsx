'use client'

import { useState } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { validateYaml } from '@/lib/tools/validators'

export default function YAMLValidatorTool() {
  const [input, setInput] = useState<string>('')
  const [result, setResult] = useState<{
    valid: boolean
    error?: string
  } | null>(null)

  const handleValidate = () => {
    if (!input.trim()) {
      setResult({ valid: false, error: 'Please enter YAML to validate' })
      return
    }

    const validation = validateYaml(input)
    setResult(validation)
  }

  const handleClear = () => {
    setInput('')
    setResult(null)
  }

  const handleFormat = () => {
    // Basic YAML formatting - normalize indentation
    const lines = input.split('\n')
    let formatted = ''
    let indentLevel = 0

    lines.forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed) {
        formatted += '\n'
        return
      }

      // Decrease indent for closing or same-level items
      if (trimmed.startsWith('-') && indentLevel > 0) {
        // List item - maintain current indent
      } else if (line.match(/^\s*[a-zA-Z_]/)) {
        // Key - check if we should dedent
        const currentIndent = line.search(/\S/)
        if (currentIndent < indentLevel * 2) {
          indentLevel = Math.floor(currentIndent / 2)
        }
      }

      formatted += '  '.repeat(indentLevel) + trimmed + '\n'

      // Increase indent after colons (key-value pairs)
      if (trimmed.endsWith(':')) {
        indentLevel++
      }
    })

    setInput(formatted.trim())
  }

  const examples = [
    {
      label: 'Simple Config',
      yaml: `name: MyApp
version: 1.0.0
environment: production
features:
  - authentication
  - logging
  - monitoring`
    },
    {
      label: 'Nested Structure',
      yaml: `database:
  host: localhost
  port: 5432
  credentials:
    username: admin
    password: secret
server:
  host: 0.0.0.0
  port: 3000
  ssl:
    enabled: true
    cert: /path/to/cert.pem`
    },
    {
      label: 'Docker Compose',
      yaml: `version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: example`
    }
  ]

  return (
    <ToolPage
      title="YAML Validator"
      description="Validate YAML syntax and check for indentation errors"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">YAML Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="name: example
version: 1.0.0
config:
  host: localhost
  port: 3000"
            rows={15}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleValidate()
              }
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleValidate} className="flex-1">
            Validate YAML
          </Button>
          <Button onClick={handleFormat} variant="outline">
            Format
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>

        {/* Result Display */}
        {result && (
          <div
            className={`rounded-lg p-4 ${
              result.valid
                ? 'bg-green-500/10 border border-green-500/50'
                : 'bg-red-500/10 border border-red-500/50'
            }`}
          >
            {result.valid ? (
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-green-400 font-medium">Valid YAML</span>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="text-red-400 font-medium">Invalid YAML</div>
                  {result.error && (
                    <div className="text-red-300 text-sm mt-1">{result.error}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* YAML Rules */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">YAML Syntax Rules</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>Use 2-space indentation (not tabs)</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>Colons (:) must be followed by a space</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>List items start with dash (-) followed by space</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>Strings with special characters should be quoted</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>Comments start with # symbol</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>Indentation must be consistent</span>
            </li>
          </ul>
        </div>

        {/* Examples */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">Example YAML</h3>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(example.yaml)
                  setResult(null)
                }}
                className="w-full text-left bg-slate-700/30 hover:bg-slate-700/50 rounded px-3 py-2 transition-colors"
              >
                <div className="text-cyan-400 text-sm font-medium mb-1">
                  {example.label}
                </div>
                <pre className="text-xs text-gray-400 font-mono overflow-hidden">
                  {example.yaml.split('\n').slice(0, 3).join('\n')}
                  {example.yaml.split('\n').length > 3 ? '\n...' : ''}
                </pre>
              </button>
            ))}
          </div>
        </div>

        {/* Common Issues */}
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
          <h3 className="font-medium mb-2 text-sm text-yellow-400">Common Issues</h3>
          <ul className="space-y-1 text-sm text-yellow-200/80">
            <li>• Mixing tabs and spaces for indentation</li>
            <li>• Missing space after colon (:)</li>
            <li>• Inconsistent indentation levels</li>
            <li>• Unquoted strings with special characters</li>
            <li>• Missing closing brackets or quotes</li>
          </ul>
        </div>
      </div>
    </ToolPage>
  )
}
