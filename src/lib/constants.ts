/**
 * Application constants
 */

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'DevFlow'
export const APP_VERSION = process.env.NEXT_PUBLIC_VERSION || '1.0.0'

/**
 * Tool categories
 */
export const TOOL_CATEGORIES = {
  ENCODERS: 'Encoders/Decoders',
  CONVERTERS: 'Converters',
  FORMATTERS: 'Formatters',
  VALIDATORS: 'Validators',
  GENERATORS: 'Generators',
  UTILITIES: 'Utilities',
} as const

export type ToolCategory = (typeof TOOL_CATEGORIES)[keyof typeof TOOL_CATEGORIES]

/**
 * Theme modes
 */
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES]

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'devflow-theme',
  FAVORITES: 'devflow-favorites',
  RECENT: 'devflow-recent',
  SETTINGS: 'devflow-settings',
} as const

/**
 * Keyboard shortcuts
 */
export const SHORTCUTS = {
  SEARCH: 'mod+k',
  THEME_TOGGLE: 'mod+shift+t',
  COPY: 'mod+c',
  PASTE: 'mod+v',
  CLEAR: 'mod+shift+x',
} as const
