'use client'

import { useState } from 'react'
import { encodeHTML, decodeHTML } from '@/lib/tools/encoders'
import { CopyButton } from '../ui/CopyButton'
import { Button } from '../ui/Button'

export function HTMLEncoderTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleEncode = () => {
    setOutput(encodeHTML(input))
  }

  const handleDecode = () => {
    setOutput(decodeHTML(input))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Input</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-32 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          placeholder="Enter HTML to encode/decode..."
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleEncode}>Encode</Button>
        <Button onClick={handleDecode} variant="outline">
          Decode
        </Button>
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Output</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm"
          />
        </div>
      )}
    </div>
  )
}
