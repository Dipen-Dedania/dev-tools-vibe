'use client'

import { useState, useEffect } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { inspectString, type StringInfo } from '@/lib/tools/validators'

export default function StringInspectorTool() {
  const [input, setInput] = useState<string>('')
  const [info, setInfo] = useState<StringInfo | null>(null)

  useEffect(() => {
    if (input) {
      setInfo(inspectString(input))
    } else {
      setInfo(null)
    }
  }, [input])

  const handleClear = () => {
    setInput('')
    setInfo(null)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInput(text)
    } catch (error) {
      console.error('Failed to read clipboard:', error)
    }
  }

  const stats = [
    { label: 'Characters', value: info?.characters || 0, icon: '📝' },
    { label: 'Length (UTF-16)', value: info?.length || 0, icon: '📏' },
    { label: 'Words', value: info?.words || 0, icon: '📖' },
    { label: 'Lines', value: info?.lines || 0, icon: '📄' },
    { label: 'Bytes (UTF-8)', value: info?.bytes || 0, icon: '💾' },
  ]

  const features = [
    {
      label: 'Encoding',
      value: info?.encoding || 'N/A',
      icon: '🔤',
      color: 'text-blue-400',
    },
    {
      label: 'Unicode Characters',
      value: info?.hasUnicode ? 'Yes' : 'No',
      icon: '🌐',
      color: info?.hasUnicode ? 'text-green-400' : 'text-gray-500',
    },
    {
      label: 'Emoji',
      value: info?.hasEmoji ? 'Yes' : 'No',
      icon: '😀',
      color: info?.hasEmoji ? 'text-green-400' : 'text-gray-500',
    },
  ]

  return (
    <ToolPage
      title="String Inspector"
      description="Analyze string properties, encoding, and character statistics"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Input Text</label>
            <Button onClick={handlePaste} variant="ghost" size="sm">
              Paste
            </Button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter or paste text to inspect..."
            rows={8}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleClear} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {/* Statistics Grid */}
        {info && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-cyan-400 mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <h3 className="font-medium mb-3 text-sm">Text Features</h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{feature.icon}</span>
                      <span className="text-sm text-gray-300">{feature.label}</span>
                    </div>
                    <span className={`text-sm font-medium ${feature.color}`}>
                      {feature.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Character Breakdown */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <h3 className="font-medium mb-3 text-sm">Character Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Whitespace:</span>
                  <span className="text-cyan-400 font-mono">
                    {(input.match(/\s/g) || []).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Alphanumeric:</span>
                  <span className="text-cyan-400 font-mono">
                    {(input.match(/[a-zA-Z0-9]/g) || []).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Letters:</span>
                  <span className="text-cyan-400 font-mono">
                    {(input.match(/[a-zA-Z]/g) || []).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Digits:</span>
                  <span className="text-cyan-400 font-mono">
                    {(input.match(/[0-9]/g) || []).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Special Characters:</span>
                  <span className="text-cyan-400 font-mono">
                    {(input.match(/[^a-zA-Z0-9\s]/g) || []).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uppercase:</span>
                  <span className="text-cyan-400 font-mono">
                    {(input.match(/[A-Z]/g) || []).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lowercase:</span>
                  <span className="text-cyan-400 font-mono">
                    {(input.match(/[a-z]/g) || []).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Reading Time */}
            <div className="bg-indigo-500/10 border border-indigo-500/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm mb-1">Estimated Reading Time</h3>
                  <p className="text-xs text-gray-400">Based on 200 words per minute</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-400">
                    {Math.max(1, Math.ceil((info.words || 0) / 200))}
                  </div>
                  <div className="text-xs text-gray-400">minute{Math.ceil((info.words || 0) / 200) !== 1 ? 's' : ''}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Help Text */}
        {!info && (
          <div className="bg-slate-800/50 rounded-lg p-4 text-sm text-gray-400">
            <h3 className="font-medium text-white mb-2">What does this tool do?</h3>
            <p className="mb-3">
              String Inspector analyzes text and provides detailed statistics including:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Character count (handles emoji and Unicode correctly)</li>
              <li>Word and line counts</li>
              <li>Byte size in UTF-8 encoding</li>
              <li>Unicode and emoji detection</li>
              <li>Character type breakdown</li>
              <li>Reading time estimation</li>
            </ul>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
