'use client'

import { Check, Copy } from 'lucide-react'
import { useClipboard } from '@/hooks'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function CopyButton({ text, className, size = 'sm' }: CopyButtonProps) {
  const { copied, copy } = useClipboard()

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={() => copy(text)}
      className={cn('gap-2', className)}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-green-500">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </>
      )}
    </Button>
  )
}
