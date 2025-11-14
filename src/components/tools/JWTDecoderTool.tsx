'use client'

import { useState } from 'react'
import { decodeJWT } from '@/lib/tools/validators'
import { CopyButton } from '../ui/CopyButton'

export function JWTDecoderTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleDecode = (token: string) => {
    setInput(token)
    if (!token.trim()) {
      setResult(null)
      return
    }
    const decoded = decodeJWT(token)
    setResult(decoded)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">JWT Token</label>
        <textarea
          value={input}
          onChange={e => handleDecode(e.target.value)}
          className="w-full h-32 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          placeholder="Paste JWT token here..."
        />
      </div>

      {result && !result.isValid && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {result.error}
        </div>
      )}

      {result && result.isValid && (
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-primary-400">Header</label>
              <CopyButton text={JSON.stringify(result.header, null, 2)} />
            </div>
            <pre className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(result.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-accent-400">Payload</label>
              <CopyButton text={JSON.stringify(result.payload, null, 2)} />
            </div>
            <pre className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(result.payload, null, 2)}
            </pre>
          </div>

          {/* Signature */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-yellow-400">Signature</label>
              <CopyButton text={result.signature} />
            </div>
            <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm break-all">
              {result.signature}
            </div>
          </div>

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-sm">
            Note: This tool only decodes the JWT. Signature verification is not performed.
          </div>
        </div>
      )}
    </div>
  )
}
