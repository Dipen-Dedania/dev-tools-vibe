'use client'

import { useState } from 'react'
import { generateLoremIpsum } from '@/lib/tools/generators'
import { CopyButton } from '../ui/CopyButton'
import { Button } from '../ui/Button'

export function LoremIpsumGeneratorTool() {
  const [paragraphs, setParagraphs] = useState(3)
  const [output, setOutput] = useState('')

  const handleGenerate = () => {
    setOutput(generateLoremIpsum(paragraphs))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Number of Paragraphs: {paragraphs}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={paragraphs}
          onChange={e => setParagraphs(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <Button onClick={handleGenerate} className="w-full">
        Generate Lorem Ipsum
      </Button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Output</label>
            <CopyButton text={output} />
          </div>
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
            {output}
          </div>
        </div>
      )}
    </div>
  )
}
