'use client'

import { useState } from 'react'
import { ToolPage, TextAreaWithCopy } from '../ui/ToolPage'
import { Button } from '../ui/Button'
import { encodeBase64, decodeBase64 } from '@/lib/tools/encoders'
import { ArrowRight } from 'lucide-react'

export function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleEncode = () => {
    try {
      setError('')
      const result = encodeBase64(input)
      setOutput(result)
    } catch (err) {
      setError((err as Error).message)
      setOutput('')
    }
  }

  const handleDecode = () => {
    try {
      setError('')
      const result = decodeBase64(input)
      setOutput(result)
    } catch (err) {
      setError((err as Error).message)
      setOutput('')
    }
  }

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode()
    } else {
      handleDecode()
    }
  }

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setInput(output)
    setOutput(input)
    setError('')
  }

  return (
    <ToolPage
      title="Base64 Encoder/Decoder"
      description="Encode or decode Base64 strings"
      infoContent="Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used for encoding data in email, URLs, and web applications."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={mode === 'encode' ? 'default' : 'secondary'}
            onClick={() => setMode('encode')}
          >
            Encode
          </Button>
          <Button
            variant="ghost"
            onClick={toggleMode}
            className="px-3"
            aria-label="Swap input/output"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant={mode === 'decode' ? 'default' : 'secondary'}
            onClick={() => setMode('decode')}
          >
            Decode
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextAreaWithCopy
            label="Input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Enter text to encode...'
                : 'Enter Base64 string to decode...'
            }
          />

          <TextAreaWithCopy
            label="Output"
            value={output}
            readOnly
            placeholder="Output will appear here..."
          />
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-600/10 border border-red-600/20 text-sm text-red-300">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={handleProcess} className="flex-1">
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setInput('')
              setOutput('')
              setError('')
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </ToolPage>
  )
}
