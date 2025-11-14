'use client'

import { useRecentTools } from '@/hooks'
import { toolRegistry } from '@/lib/toolRegistry'
import { MainLayout } from '@/components/layouts/MainLayout'
import Link from 'next/link'
import { Clock, ArrowRight, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function RecentToolsPage() {
  const { getRecentToolIds, clearRecentTools } = useRecentTools()

  const recentToolIds = getRecentToolIds()
  const recentTools = recentToolIds
    .map(id => toolRegistry.find(tool => tool.id === id))
    .filter(Boolean)

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-200 mb-2">Recent Tools</h1>
            <p className="text-slate-400">
              Your recently accessed tools
            </p>
          </div>
          {recentTools.length > 0 && (
            <Button
              variant="outline"
              onClick={clearRecentTools}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear History
            </Button>
          )}
        </div>

        {recentTools.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="h-16 w-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No recent tools
            </h3>
            <p className="text-slate-400 mb-6">
              Tools you use will appear here
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              Browse Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTools.map(tool => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-primary-600/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-slate-200 group-hover:text-primary-400 transition-colors">
                    {tool.name}
                  </h3>
                  <Clock className="h-5 w-5 text-slate-500" />
                </div>
                <p className="text-sm text-slate-400 mb-3">{tool.description}</p>
                <div className="flex items-center text-xs text-slate-500">
                  <span className="px-2 py-1 bg-slate-800 rounded">
                    {tool.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

