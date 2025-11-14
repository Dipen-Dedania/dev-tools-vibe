'use client'

import { useState } from 'react'
import { markdownToHtml, htmlToMarkdown } from '@/lib/tools/converters'
import { CopyButton } from '../ui/CopyButton'
import { Button } from '../ui/Button'

export function MarkdownHTMLConverterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleMDToHTML = () => {
    setOutput(markdownToHtml(input))
  }

  const handleHTMLToMD = () => {
    setOutput(htmlToMarkdown(input))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Input</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-48 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          placeholder="Enter Markdown or HTML..."
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleMDToHTML}>Markdown → HTML</Button>
        <Button onClick={handleHTMLToMD} variant="outline">
          HTML → Markdown
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
            className="w-full h-48 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm"
          />
          <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded-lg">
            <label className="block text-sm font-medium mb-2">Preview</label>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: output.startsWith('<') ? output : markdownToHtml(output) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
