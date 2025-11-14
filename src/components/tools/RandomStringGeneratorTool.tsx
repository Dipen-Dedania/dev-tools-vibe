'use client'

import { useState } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { generateRandomString } from '@/lib/tools/generators'
import { CopyButton } from '@/components/ui/CopyButton'

type Charset = 'alphanumeric' | 'alpha' | 'numeric' | 'hex' | 'symbols' | 'all'

export default function RandomStringGeneratorTool() {
  const [length, setLength] = useState<number>(16)
  const [charset, setCharset] = useState<Charset>('alphanumeric')
  const [quantity, setQuantity] = useState<number>(1)
  const [results, setResults] = useState<string[]>([])

  const handleGenerate = () => {
    const newResults: string[] = []

    for (let i = 0; i < quantity; i++) {
      if (charset === 'all') {
        // Combine all character sets for 'all' option
        const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
        let result = ''
        for (let j = 0; j < length; j++) {
          result += allChars.charAt(Math.floor(Math.random() * allChars.length))
        }
        newResults.push(result)
      } else {
        newResults.push(generateRandomString(length, charset))
      }
    }

    setResults(newResults)
  }

  const handleClear = () => {
    setResults([])
  }

  const charsetOptions = [
    { value: 'alphanumeric' as Charset, label: 'Alphanumeric (A-Z, a-z, 0-9)' },
    { value: 'alpha' as Charset, label: 'Alphabetic (A-Z, a-z)' },
    { value: 'numeric' as Charset, label: 'Numeric (0-9)' },
    { value: 'hex' as Charset, label: 'Hexadecimal (0-9, a-f)' },
    { value: 'symbols' as Charset, label: 'Symbols (!@#$%^&*...)' },
    { value: 'all' as Charset, label: 'All Characters' },
  ]

  return (
    <ToolPage
      title="Random String Generator"
      description="Generate cryptographically random strings with customizable length and character sets"
    >
      <div className="space-y-6">
        {/* Configuration */}
        <div className="space-y-4">
          {/* Length */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Length: <span className="text-cyan-400">{length}</span>
            </label>
            <input
              type="range"
              min="1"
              max="128"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>128</span>
            </div>
          </div>

          {/* Character Set */}
          <div>
            <label className="block text-sm font-medium mb-2">Character Set</label>
            <select
              value={charset}
              onChange={(e) => setCharset(e.target.value as Charset)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {charsetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Quantity: <span className="text-cyan-400">{quantity}</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>50</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleGenerate} className="flex-1">
            Generate
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Generated Strings ({results.length})
              </label>
              <CopyButton text={results.join('\n')} />
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2 font-mono text-sm">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 bg-slate-700/30 rounded px-3 py-2 hover:bg-slate-700/50 transition-colors"
                  >
                    <span className="break-all">{result}</span>
                    <CopyButton text={result} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-slate-800/50 rounded-lg p-4 text-sm">
          <h3 className="font-medium mb-2">Use Cases</h3>
          <ul className="space-y-1 text-gray-400 list-disc list-inside">
            <li>Generate secure passwords and API keys</li>
            <li>Create random tokens for testing</li>
            <li>Generate placeholder data</li>
            <li>Create unique identifiers</li>
            <li>Test input validation</li>
          </ul>
        </div>

        {/* Security Note */}
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
          <div className="flex gap-2">
            <svg
              className="w-5 h-5 text-yellow-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="text-sm">
              <div className="text-yellow-400 font-medium">Security Note</div>
              <div className="text-yellow-300/80 mt-1">
                These strings use Math.random() which is not cryptographically secure. For
                production security keys, use a dedicated cryptographic library.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
