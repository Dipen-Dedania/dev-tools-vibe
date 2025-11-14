import { notFound } from 'next/navigation'
import { getToolById } from '@/lib/toolRegistry'
import { MainLayout } from '@/components/layouts/MainLayout'
import { Base64Tool } from '@/components/tools/Base64Tool'
import { JSONFormatterTool } from '@/components/tools/JSONFormatterTool'
import { UUIDGeneratorTool } from '@/components/tools/UUIDGeneratorTool'

const toolComponents: Record<string, React.ComponentType> = {
  'base64-encoder': Base64Tool,
  'json-formatter': JSONFormatterTool,
  'uuid-generator': UUIDGeneratorTool,
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = getToolById(id)

  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  return {
    title: `${tool.name} - DevFlow`,
    description: tool.description,
    keywords: tool.keywords,
  }
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = getToolById(id)

  if (!tool) {
    notFound()
  }

  const ToolComponent = toolComponents[id]

  if (!ToolComponent) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold text-slate-200 mb-4">{tool.name}</h1>
          <p className="text-slate-400 mb-6">{tool.description}</p>
          <div className="p-8 rounded-xl bg-yellow-600/10 border border-yellow-600/20">
            <p className="text-yellow-300">
              This tool is coming soon! We&apos;re working hard to bring you the best experience.
            </p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <ToolComponent />
    </MainLayout>
  )
}

export async function generateStaticParams() {
  return [
    { id: 'base64-encoder' },
    { id: 'json-formatter' },
    { id: 'uuid-generator' },
  ]
}
