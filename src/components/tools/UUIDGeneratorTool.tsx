'use client'

import { useState } from 'react'
import { ToolPage, TextAreaWithCopy } from '../ui/ToolPage'
import { Button } from '../ui/Button'
import { generateUUID } from '@/lib/tools/generators'
import { RefreshCw } from 'lucide-react'

export function UUIDGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()])
  const [count, setCount] = useState(1)
  const [format, setFormat] = useState<'standard' | 'uppercase' | 'no-hyphens'>('standard')

  const formatUUID = (uuid: string): string => {
    switch (format) {
      case 'uppercase':
        return uuid.toUpperCase()
      case 'no-hyphens':
        return uuid.replace(/-/g, '')
      default:
        return uuid
    }
  }

  const generateNew = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID())
    setUuids(newUuids)
  }

  const output = uuids.map(formatUUID).join('\n')

  return (
    <ToolPage
      title="UUID/GUID Generator"
      description="Generate random UUIDs (Universally Unique Identifiers)"
      infoContent="UUID v4 generates random 128-bit identifiers. The probability of generating a duplicate UUID is extremely low, making them ideal for unique identifiers in databases and distributed systems."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Number of UUIDs</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Format</label>
            <select
              value={format}
              onChange={e => setFormat(e.target.value as typeof format)}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="standard">Standard (lowercase with hyphens)</option>
              <option value="uppercase">Uppercase</option>
              <option value="no-hyphens">No hyphens</option>
            </select>
          </div>
        </div>

        <TextAreaWithCopy
          label="Generated UUIDs"
          value={output}
          readOnly
          placeholder="Generated UUIDs will appear here..."
          className="min-h-[300px]"
        />

        <div className="flex gap-3">
          <Button onClick={generateNew} className="flex-1 gap-2">
            <RefreshCw className="h-4 w-4" />
            Generate {count > 1 ? `${count} UUIDs` : 'UUID'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
          <div>
            <div className="text-2xl font-bold text-primary-500 mb-1">
              {uuids.length}
            </div>
            <p className="text-sm text-slate-400">UUIDs Generated</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-500 mb-1">v4</div>
            <p className="text-sm text-slate-400">Random UUID</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500 mb-1">128-bit</div>
            <p className="text-sm text-slate-400">Identifier Size</p>
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
