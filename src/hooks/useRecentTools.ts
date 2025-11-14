import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '@/lib/constants'

interface RecentTool {
  id: string
  timestamp: number
}

const MAX_RECENT_TOOLS = 10

export function useRecentTools() {
  const [recentTools, setRecentTools] = useLocalStorage<RecentTool[]>(STORAGE_KEYS.RECENT, [])

  const addRecentTool = (toolId: string) => {
    setRecentTools(current => {
      // Remove if already exists
      const filtered = current.filter(tool => tool.id !== toolId)

      // Add to front
      const updated = [{ id: toolId, timestamp: Date.now() }, ...filtered]

      // Keep only last MAX_RECENT_TOOLS
      return updated.slice(0, MAX_RECENT_TOOLS)
    })
  }

  const clearRecentTools = () => {
    setRecentTools([])
  }

  // Get tool IDs sorted by most recent
  const getRecentToolIds = () => {
    return recentTools.map(tool => tool.id)
  }

  return {
    recentTools,
    addRecentTool,
    clearRecentTools,
    getRecentToolIds,
  }
}
