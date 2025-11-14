import { MainLayout } from '@/components/layouts/MainLayout'
import { toolRegistry, getToolsByCategory } from '@/lib/toolRegistry'
import { TOOL_CATEGORIES } from '@/lib/constants'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Map URL paths to category names
const categoryMap: Record<string, string> = {
  'encoders': TOOL_CATEGORIES.ENCODERS,
  'converters': TOOL_CATEGORIES.CONVERTERS,
  'formatters': TOOL_CATEGORIES.FORMATTERS,
  'generators': TOOL_CATEGORIES.GENERATORS,
  'validators': TOOL_CATEGORIES.VALIDATORS,
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const categoryName = categoryMap[category]

  if (!categoryName) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${categoryName} - DevFlow`,
    description: `Browse all ${categoryName.toLowerCase()} tools`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const categoryName = categoryMap[category]

  if (!categoryName) {
    notFound()
  }

  const tools = getToolsByCategory(categoryName)

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-200 mb-2">{categoryName}</h1>
          <p className="text-slate-400">
            Browse through {tools.length} {categoryName.toLowerCase()} tools
          </p>
        </div>

        {tools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No tools found in this category yet.</p>
            <p className="text-sm text-slate-500 mt-2">Check back soon for new tools!</p>
          </div>
        ) : (
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
        )}
      </div>
    </MainLayout>
  )
}

export async function generateStaticParams() {
  return [
    { category: 'encoders' },
    { category: 'converters' },
    { category: 'formatters' },
    { category: 'generators' },
    { category: 'validators' },
  ]
}

