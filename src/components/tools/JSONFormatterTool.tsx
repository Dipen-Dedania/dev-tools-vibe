'use client'

import { useState } from 'react'
import { ToolPage, TextAreaWithCopy } from '../ui/ToolPage'
import { Button } from '../ui/Button'
import { formatJSON, minifyJSON, validateJSON } from '@/lib/tools/formatters'
import { CheckCircle2, XCircle } from 'lucide-react'

export function JSONFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indentSize, setIndentSize] = useState(2)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const handleFormat = () => {
    try {
      setError('')
      const result = formatJSON(input, indentSize)
      setOutput(result)
      setIsValid(true)
    } catch (err) {
      setError((err as Error).message)
      setOutput('')
      setIsValid(false)
    }
  }

  const handleMinify = () => {
    try {
      setError('')
      const result = minifyJSON(input)
      setOutput(result)
      setIsValid(true)
    } catch (err) {
      setError((err as Error).message)
      setOutput('')
      setIsValid(false)
    }
  }

  const handleValidate = () => {
    const result = validateJSON(input)
    setIsValid(result.valid)
    if (result.valid) {
      setError('')
      setOutput('✓ Valid JSON')
    } else {
      setError(result.error || 'Invalid JSON')
      setOutput('')
    }
  }

  return (
    <ToolPage
      title="JSON Formatter & Validator"
      description="Format, validate, and minify JSON data"
      infoContent="JSON (JavaScript Object Notation) is a lightweight data interchange format. This tool helps you format, validate, and minify JSON data."
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">Indent:</label>
            <select
              value={indentSize}
              onChange={e => setIndentSize(Number(e.target.value))}
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>

          {isValid !== null && (
            <div className="flex items-center gap-2">
              {isValid ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">Valid JSON</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-500 font-medium">Invalid JSON</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextAreaWithCopy
            label="Input JSON"
            value={input}
            onChange={e => {
              setInput(e.target.value)
              setIsValid(null)
            }}
            placeholder='{"name": "DevFlow", "tools": 50}'
          />

          <TextAreaWithCopy
            label="Output"
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
          />
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-600/10 border border-red-600/20 text-sm text-red-300">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <Button onClick={handleFormat}>Format</Button>
          <Button onClick={handleMinify} variant="secondary">
            Minify
          </Button>
          <Button onClick={handleValidate} variant="secondary">
            Validate
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setInput('')
              setOutput('')
              setError('')
              setIsValid(null)
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </ToolPage>
  )
}
