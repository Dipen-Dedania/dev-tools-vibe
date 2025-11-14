'use client'

import { useState } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { parseCron } from '@/lib/tools/validators'
import { CopyButton } from '@/components/ui/CopyButton'

export default function CronParserTool() {
  const [expression, setExpression] = useState<string>('')
  const [result, setResult] = useState<{
    isValid: boolean
    description?: string
    error?: string
  } | null>(null)

  const handleParse = () => {
    if (!expression.trim()) {
      setResult({ isValid: false, error: 'Please enter a cron expression' })
      return
    }

    const parsed = parseCron(expression.trim())
    setResult(parsed)
  }

  const handleClear = () => {
    setExpression('')
    setResult(null)
  }

  const examples = [
    { expr: '0 0 * * *', desc: 'Daily at midnight' },
    { expr: '0 */6 * * *', desc: 'Every 6 hours' },
    { expr: '30 2 * * *', desc: 'Daily at 2:30 AM' },
    { expr: '0 0 * * 0', desc: 'Weekly on Sunday at midnight' },
    { expr: '0 0 1 * *', desc: 'Monthly on the 1st at midnight' },
    { expr: '*/15 * * * *', desc: 'Every 15 minutes' },
    { expr: '0 9-17 * * 1-5', desc: 'Weekdays 9 AM to 5 PM' },
  ]

  const useExample = (expr: string) => {
    setExpression(expr)
    setResult(null)
  }

  return (
    <ToolPage
      title="Cron Expression Parser"
      description="Parse and validate cron expressions with human-readable descriptions"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Cron Expression</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g., 0 0 * * *"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleParse()
              }
            }}
          />
          <p className="text-xs text-gray-400 mt-2">
            Format: minute hour day-of-month month day-of-week
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleParse} className="flex-1">
            Parse
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>

        {/* Result Display */}
        {result && (
          <div
            className={`rounded-lg p-4 ${
              result.isValid
                ? 'bg-green-500/10 border border-green-500/50'
                : 'bg-red-500/10 border border-red-500/50'
            }`}
          >
            {result.isValid ? (
              <div className="space-y-2">
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
                  <span className="text-green-400 font-medium">Valid Expression</span>
                </div>
                {result.description && (
                  <div className="mt-3">
                    <div className="text-sm text-gray-400 mb-1">Description:</div>
                    <div className="bg-slate-800/50 rounded p-3 text-sm flex items-center justify-between">
                      <span>{result.description}</span>
                      <CopyButton text={result.description} />
                    </div>
                  </div>
                )}
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
                  <div className="text-red-400 font-medium">Invalid Expression</div>
                  {result.error && (
                    <div className="text-red-300 text-sm mt-1">{result.error}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cron Format Reference */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">Cron Format Reference</h3>
          <div className="space-y-2 text-sm font-mono">
            <div className="grid grid-cols-5 gap-2 text-xs text-gray-400">
              <div>Minute</div>
              <div>Hour</div>
              <div>Day</div>
              <div>Month</div>
              <div>Weekday</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-xs">
              <div className="text-cyan-400">0-59</div>
              <div className="text-cyan-400">0-23</div>
              <div className="text-cyan-400">1-31</div>
              <div className="text-cyan-400">1-12</div>
              <div className="text-cyan-400">0-6</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-gray-400">
            <div className="flex gap-2">
              <span className="text-cyan-400 font-mono">*</span>
              <span>Any value</span>
            </div>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-mono">,</span>
              <span>Value list (e.g., 1,3,5)</span>
            </div>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-mono">-</span>
              <span>Range (e.g., 1-5)</span>
            </div>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-mono">/</span>
              <span>Step values (e.g., */15)</span>
            </div>
          </div>
        </div>

        {/* Common Examples */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-sm">Common Examples</h3>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => useExample(example.expr)}
                className="w-full text-left bg-slate-700/30 hover:bg-slate-700/50 rounded px-3 py-2 transition-colors"
              >
                <div className="flex justify-between items-center gap-4">
                  <code className="text-cyan-400 text-sm font-mono">{example.expr}</code>
                  <span className="text-gray-400 text-xs">{example.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
