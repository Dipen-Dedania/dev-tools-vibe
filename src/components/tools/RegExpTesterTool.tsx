'use client'

import { useState } from 'react'
import { testRegExp } from '@/lib/tools/validators'

export function RegExpTesterTool() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleTest = () => {
    const testResult = testRegExp(pattern, flags, testString)
    setResult(testResult)
  }

  const flagOptions = [
    { value: 'g', label: 'Global' },
    { value: 'i', label: 'Case Insensitive' },
    { value: 'm', label: 'Multiline' },
    { value: 's', label: 'Dot All' },
  ]

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''))
    } else {
      setFlags(flags + flag)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Regular Expression Pattern</label>
        <div className="flex gap-2">
          <span className="flex items-center px-3 bg-slate-900 border border-slate-700 rounded-l-lg text-slate-400">
            /
          </span>
          <input
            type="text"
            value={pattern}
            onChange={e => {
              setPattern(e.target.value)
              if (e.target.value) handleTest()
            }}
            className="flex-1 px-4 py-2 bg-slate-900 border-y border-slate-700 focus:ring-2 focus:ring-primary-500 font-mono"
            placeholder="Enter regex pattern..."
          />
          <span className="flex items-center px-3 bg-slate-900 border border-slate-700 rounded-r-lg text-slate-400">
            /{flags}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Flags</label>
        <div className="flex flex-wrap gap-2">
          {flagOptions.map(flag => (
            <button
              key={flag.value}
              onClick={() => {
                toggleFlag(flag.value)
                if (pattern) handleTest()
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                flags.includes(flag.value)
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {flag.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Test String</label>
        <textarea
          value={testString}
          onChange={e => {
            setTestString(e.target.value)
            if (pattern) handleTest()
          }}
          className="w-full h-32 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          placeholder="Enter text to test..."
        />
      </div>

      {result && !result.isValid && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          Invalid RegExp: {result.error}
        </div>
      )}

      {result && result.isValid && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Matches ({result.matches.length})
          </label>
          {result.matches.length === 0 ? (
            <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 text-center">
              No matches found
            </div>
          ) : (
            <div className="space-y-2">
              {result.matches.map((match: any, index: number) => (
                <div
                  key={index}
                  className="p-3 bg-slate-900 border border-slate-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary-400">Match {index + 1}</span>
                    <span className="text-xs text-slate-500">Index: {match.index}</span>
                  </div>
                  <div className="font-mono text-sm bg-slate-800 p-2 rounded">
                    {match.match}
                  </div>
                  {match.groups.length > 0 && (
                    <div className="mt-2 text-xs text-slate-400">
                      Groups: {match.groups.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
