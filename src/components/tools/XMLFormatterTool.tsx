'use client'

import { useState } from 'react'
import { formatXML } from '@/lib/tools/formatters'
import { CopyButton } from '../ui/CopyButton'
import { Button } from '../ui/Button'

export function XMLFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleFormat = () => {
    try {
      setError('')
      setOutput(formatXML(input))
    } catch (err) {
      setError((err as Error).message)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Input XML</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-48 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          placeholder="Paste XML here..."
        />
      </div>

      <Button onClick={handleFormat} className="w-full">
        Format XML
      </Button>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Formatted XML</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm"
          />
        </div>
      )}
    </div>
  )
}
