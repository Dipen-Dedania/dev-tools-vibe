import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '@/lib/constants'

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(STORAGE_KEYS.FAVORITES, [])

  const isFavorite = (toolId: string) => favorites.includes(toolId)

  const toggleFavorite = (toolId: string) => {
    setFavorites(current =>
      current.includes(toolId)
        ? current.filter(id => id !== toolId)
        : [...current, toolId]
    )
  }

  const addFavorite = (toolId: string) => {
    if (!favorites.includes(toolId)) {
      setFavorites(current => [...current, toolId])
    }
  }

  const removeFavorite = (toolId: string) => {
    setFavorites(current => current.filter(id => id !== toolId))
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  }
}
