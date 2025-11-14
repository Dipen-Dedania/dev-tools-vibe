import { MainLayout } from '@/components/layouts/MainLayout'
import { toolRegistry, getAllCategories } from '@/lib/toolRegistry'
import Link from 'next/link'
import { Search } from 'lucide-react'

export const metadata = {
  title: 'All Tools - DevFlow',
  description: 'Browse all 50+ developer utilities',
}

export default function AllToolsPage() {
  const categories = getAllCategories()

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-200 mb-2">All Tools</h1>
          <p className="text-slate-400">
            Browse through {toolRegistry.length}+ developer utilities
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="space-y-12">
          {categories.map(category => {
            const tools = toolRegistry.filter(tool => tool.category === category)
            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-slate-200 mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map(tool => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-primary-600 transition-all group"
                    >
                      <h3 className="font-semibold text-slate-200 mb-2 group-hover:text-primary-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-400">{tool.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tool.keywords.slice(0, 3).map(keyword => (
                          <span
                            key={keyword}
                            className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-400"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </MainLayout>
  )
}
