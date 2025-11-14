import { MainLayout } from '@/components/layouts/MainLayout'
import { Star } from 'lucide-react'

export const metadata = {
  title: 'Favorite Tools - DevFlow',
  description: 'Your favorite tools',
}

export default function FavoritesPage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Favorite Tools</h1>
          <p className="text-slate-400">Your favorite tools will appear here</p>
        </div>

        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
            <Star className="h-8 w-8 text-slate-500" />
          </div>
          <p className="text-slate-400 mb-2">No favorites yet</p>
          <p className="text-sm text-slate-500">
            Star your favorite tools for quick access
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

