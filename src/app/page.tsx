import { MainLayout } from '@/components/layouts/MainLayout'
import { Code, Lock, Repeat, Hash, FileJson, Zap, Shield, Gauge } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Lock,
    title: '10+ Encoders',
    description: 'Base64, URL, HTML, Hex, Binary, and more',
  },
  {
    icon: Repeat,
    title: '12+ Converters',
    description: 'JSON, YAML, XML, CSV transformations',
  },
  {
    icon: Code,
    title: '15+ Formatters',
    description: 'Beautify JSON, SQL, HTML, CSS, JavaScript',
  },
  {
    icon: Hash,
    title: '13+ Generators',
    description: 'UUID, QR codes, hashes, random data',
  },
  {
    icon: FileJson,
    title: '8+ Validators',
    description: 'RegEx tester, JSON, YAML, Cron parser',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-500ms response time',
  },
  {
    icon: Shield,
    title: '100% Offline',
    description: 'Zero data collection or tracking',
  },
  {
    icon: Gauge,
    title: 'Smart Detection',
    description: 'Auto-detect and suggest tools',
  },
]

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-600/20 text-primary-400 text-sm font-medium">
            <div className="h-2 w-2 bg-primary-500 rounded-full animate-pulse" />
            50+ Developer Utilities in One Place
          </div>

          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-accent-500 bg-clip-text text-transparent">
              All-in-One
            </span>
            <br />
            <span className="text-slate-200">Developer Toolkit</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Beautiful, fast, and privacy-focused utilities for developers. Works 100% offline with
            zero data collection.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/tools"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              Explore Tools
            </Link>
            <a
              href="https://github.com/Dipen-Dedania/dev-tools-vibe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary-600/10 text-primary-500 group-hover:bg-primary-600/20 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-200">{feature.title}</h3>
                </div>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary-600/10 via-purple-600/5 to-accent-600/10 border border-primary-600/20">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-200">Why DevFlow?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <div className="text-3xl font-bold text-primary-500 mb-2">50+</div>
                <p className="text-slate-400">Essential Tools</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-500 mb-2">&lt;500ms</div>
                <p className="text-slate-400">Response Time</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">0%</div>
                <p className="text-slate-400">Data Collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
