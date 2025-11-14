'use client'

import { useState, useEffect } from 'react'
import { generateHash } from '@/lib/tools/generators'
import { CopyButton } from '../ui/CopyButton'

const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

export function HashGeneratorTool() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!input) {
      setHashes({})
      return
    }

    const generateAllHashes = async () => {
      setLoading(true)
      const results: Record<string, string> = {}

      for (const algo of algorithms) {
        try {
          results[algo] = await generateHash(input, algo)
        } catch (error) {
          results[algo] = 'Error generating hash'
        }
      }

      setHashes(results)
      setLoading(false)
    }

    generateAllHashes()
  }, [input])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-32 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          placeholder="Enter text to hash..."
        />
      </div>

      {loading && (
        <div className="text-center text-slate-400">Generating hashes...</div>
      )}

      {!loading && Object.keys(hashes).length > 0 && (
        <div className="space-y-3">
          {algorithms.map(algo => (
            <div key={algo}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">{algo}</label>
                <CopyButton text={hashes[algo]} />
              </div>
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg font-mono text-xs break-all">
                {hashes[algo]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
