'use client'

import { useState } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { generateNanoID } from '@/lib/tools/generators'
import { CopyButton } from '@/components/ui/CopyButton'

export default function NanoIDGeneratorTool() {
  const [length, setLength] = useState<number>(21)
  const [quantity, setQuantity] = useState<number>(1)
  const [ids, setIds] = useState<string[]>([])

  const handleGenerate = () => {
    const newIds: string[] = []
    for (let i = 0; i < quantity; i++) {
      newIds.push(generateNanoID(length))
    }
    setIds(newIds)
  }

  const handleClear = () => {
    setIds([])
  }

  const presets = [
    { length: 8, label: 'Short (8)' },
    { length: 14, label: 'Medium (14)' },
    { length: 21, label: 'Default (21)' },
    { length: 32, label: 'Long (32)' },
  ]

  return (
    <ToolPage
      title="Nano ID Generator"
      description="Generate URL-friendly unique string IDs - smaller and faster than UUID"
    >
      <div className="space-y-6">
        {/* Configuration */}
        <div className="space-y-4">
          {/* Length with Presets */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Length: <span className="text-cyan-400">{length}</span>
            </label>
            <div className="flex gap-2 mb-3">
              {presets.map((preset) => (
                <Button
                  key={preset.length}
                  onClick={() => setLength(preset.length)}
                  variant={length === preset.length ? 'default' : 'outline'}
                  size="sm"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>4</span>
              <span>64</span>
            </div>
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
        {ids.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Nano IDs ({ids.length})</label>
              <CopyButton text={ids.join('\n')} />
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2 font-mono text-sm">
                {ids.map((id, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 bg-slate-700/30 rounded px-3 py-2 hover:bg-slate-700/50 transition-colors"
                  >
                    <span className="break-all text-cyan-400">{id}</span>
                    <CopyButton text={id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2 text-sm">What is Nano ID?</h3>
            <p className="text-gray-400 text-sm">
              Nano ID is a tiny, secure, URL-friendly, unique string ID generator. It&apos;s 2x
              smaller and 60% faster than UUID, making it perfect for modern web applications.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-sm">Alphabet</h3>
            <code className="text-xs text-cyan-400 bg-slate-700/50 px-2 py-1 rounded break-all">
              A-Za-z0-9_-
            </code>
            <p className="text-gray-400 text-xs mt-1">
              64 URL-safe characters (no special encoding needed)
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-sm">Use Cases</h3>
            <ul className="space-y-1 text-gray-400 text-sm list-disc list-inside">
              <li>Short URLs and slug generation</li>
              <li>Database primary keys</li>
              <li>Session IDs and tokens</li>
              <li>File names and upload IDs</li>
              <li>Temporary resource identifiers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-sm">Collision Probability</h3>
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Length 21 (default):</span>
                <span className="text-cyan-400">~1 million years to 1% collision</span>
              </div>
              <div className="flex justify-between">
                <span>Length 14:</span>
                <span className="text-cyan-400">~5 years to 1% collision</span>
              </div>
              <div className="flex justify-between">
                <span>Length 8:</span>
                <span className="text-cyan-400">~4 hours to 1% collision</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison with UUID */}
        <div className="bg-indigo-500/10 border border-indigo-500/50 rounded-lg p-4">
          <h3 className="font-medium mb-2 text-sm">Nano ID vs UUID</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
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
              <span className="text-gray-300">60% faster generation</span>
            </div>
            <div className="flex items-start gap-2">
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
              <span className="text-gray-300">2x smaller size (21 vs 36 chars)</span>
            </div>
            <div className="flex items-start gap-2">
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
              <span className="text-gray-300">URL-safe without encoding</span>
            </div>
            <div className="flex items-start gap-2">
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
              <span className="text-gray-300">Customizable length</span>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
