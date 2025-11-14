'use client'

import { cn, copyToClipboard } from '@/lib/utils'
import { Copy, Check, Info } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button'
import { motion } from 'framer-motion'

interface ToolPageProps {
  title: string
  description: string
  children: React.ReactNode
  infoContent?: string
}

export function ToolPage({ title, description, children, infoContent }: ToolPageProps) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-slate-200 mb-2">{title}</h1>
        <div className="flex items-center gap-3">
          <p className="text-slate-400">{description}</p>
          {infoContent && (
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-slate-500 hover:text-slate-300 transition-colors"
              aria-label="Show info"
            >
              <Info className="h-4 w-4" />
            </button>
          )}
        </div>
        {showInfo && infoContent && (
          <motion.div
            className="mt-4 p-4 rounded-lg bg-blue-600/10 border border-blue-600/20 text-sm text-blue-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {infoContent}
          </motion.div>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface TextAreaWithCopyProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  onCopy?: () => void
}

export function TextAreaWithCopy({
  label,
  value,
  onCopy,
  className,
  ...props
}: TextAreaWithCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (value) {
      const success = await copyToClipboard(String(value))
      if (success) {
        setCopied(true)
        onCopy?.()
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 gap-2"
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
        )}
      </div>
      <textarea
        value={value}
        className={cn(
          'w-full min-h-[200px] p-4 rounded-lg bg-slate-900 border border-slate-700',
          'text-slate-200 font-mono text-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder:text-slate-500',
          'resize-y',
          className
        )}
        {...props}
      />
    </div>
  )
}
