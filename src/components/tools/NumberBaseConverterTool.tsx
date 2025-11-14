'use client'

import { useState } from 'react'
import { convertNumberBase } from '@/lib/tools/converters'
import { CopyButton } from '../ui/CopyButton'
import { Button } from '../ui/Button'

const bases = [
  { value: 2, label: 'Binary (2)' },
  { value: 8, label: 'Octal (8)' },
  { value: 10, label: 'Decimal (10)' },
  { value: 16, label: 'Hexadecimal (16)' },
]

export function NumberBaseConverterTool() {
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState(10)
  const [toBase, setToBase] = useState(16)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleConvert = () => {
    try {
      setError('')
      setOutput(convertNumberBase(input, fromBase, toBase))
    } catch (err) {
      setError((err as Error).message)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Input Number</label>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
          placeholder="Enter number..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">From Base</label>
          <select
            value={fromBase}
            onChange={e => setFromBase(Number(e.target.value))}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {bases.map(base => (
              <option key={base.value} value={base.value}>
                {base.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">To Base</label>
          <select
            value={toBase}
            onChange={e => setToBase(Number(e.target.value))}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {bases.map(base => (
              <option key={base.value} value={base.value}>
                {base.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button onClick={handleConvert} className="w-full">
        Convert
      </Button>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Output</label>
            <CopyButton text={output} />
          </div>
          <div className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg font-mono text-lg">
            {output}
          </div>
        </div>
      )}
    </div>
  )
}
