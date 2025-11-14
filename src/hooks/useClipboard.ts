import { useState, useCallback } from 'react'

interface UseClipboardReturn {
  copied: boolean
  copy: (text: string) => Promise<void>
  paste: () => Promise<string>
  isSupported: boolean
}

/**
 * Custom hook for clipboard operations with visual feedback
 */
export function useClipboard(timeout: number = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false)
  const isSupported = typeof navigator !== 'undefined' && 'clipboard' in navigator

  const copy = useCallback(
    async (text: string) => {
      if (!isSupported) {
        console.warn('Clipboard API not supported')
        return
      }

      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        setCopied(false)
      }
    },
    [isSupported, timeout]
  )

  const paste = useCallback(async (): Promise<string> => {
    if (!isSupported) {
      console.warn('Clipboard API not supported')
      return ''
    }

    try {
      const text = await navigator.clipboard.readText()
      return text
    } catch (error) {
      console.error('Failed to read from clipboard:', error)
      return ''
    }
  }, [isSupported])

  return { copied, copy, paste, isSupported }
}
