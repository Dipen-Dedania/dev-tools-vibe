'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/hooks'
import { Button } from './Button'
import { THEME_MODES } from '@/lib/constants'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const getIcon = () => {
    switch (theme) {
      case THEME_MODES.LIGHT:
        return <Sun className="h-5 w-5" />
      case THEME_MODES.DARK:
        return <Moon className="h-5 w-5" />
      case THEME_MODES.SYSTEM:
        return <Monitor className="h-5 w-5" />
      default:
        return <Moon className="h-5 w-5" />
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-10 h-10 p-0"
      title={`Current theme: ${theme}`}
    >
      {getIcon()}
    </Button>
  )
}
