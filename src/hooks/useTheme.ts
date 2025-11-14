import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS, THEME_MODES, ThemeMode } from '@/lib/constants'

/**
 * Custom hook for managing theme with persistence
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<ThemeMode>(STORAGE_KEYS.THEME, THEME_MODES.DARK)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === THEME_MODES.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME_MODES.DARK
        : THEME_MODES.LIGHT
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(currentTheme => {
      if (currentTheme === THEME_MODES.DARK) return THEME_MODES.LIGHT
      if (currentTheme === THEME_MODES.LIGHT) return THEME_MODES.SYSTEM
      return THEME_MODES.DARK
    })
  }

  return { theme, setTheme, toggleTheme }
}
