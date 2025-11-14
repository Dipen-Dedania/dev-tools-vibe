import { ToolCategory } from '@/lib/constants'

/**
 * Tool definition interface
 */
export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  icon: string
  keywords: string[]
  component?: React.ComponentType<any>
}

/**
 * Tool input/output interface
 */
export interface ToolIO {
  input: string
  output: string
  error?: string
}

/**
 * User settings interface
 */
export interface Settings {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large'
  lineNumbers: boolean
  wordWrap: boolean
  autoDetect: boolean
  soundEffects: boolean
}

/**
 * Recent tool usage
 */
export interface RecentTool {
  toolId: string
  timestamp: number
  usage: number
}

/**
 * Favorite tools
 */
export type FavoriteTool = string[]

/**
 * Detection result
 */
export interface DetectionResult {
  type: string
  confidence: number
  toolId?: string
}
