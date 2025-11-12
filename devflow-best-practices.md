# DevFlow: Implementation Best Practices & Code Examples

## 🎯 Industry Standards Applied

### 1. **Code Architecture Pattern: Feature-Based Structure**

```
src/
├── features/
│   ├── encoders/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── types.ts
│   │   └── index.ts
│   ├── converters/
│   ├── formatters/
│   └── generators/
├── shared/
│   ├── components/ (reusable UI)
│   ├── hooks/ (shared logic)
│   ├── lib/ (utilities)
│   └── types/ (global types)
└── core/
    ├── layout/
    ├── theme/
    └── search/
```

---

## 🎨 React Bits Integration Example

### Using React Bits Animated Components

```tsx
// src/components/ui/AnimatedCard.tsx
import React from 'react';
import { FadeIn, SlideUp, ScaleIn } from 'react-bits';

interface AnimatedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <FadeIn duration={300}>
      <SlideUp duration={400} delay={100}>
        <div
          onClick={onClick}
          className="group relative cursor-pointer rounded-lg border border-slate-700 
                     bg-slate-900 p-6 transition-all duration-300 
                     hover:border-cyan-500 hover:bg-slate-800"
        >
          <div className="mb-4 text-3xl text-cyan-500 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
          
          {/* Animated underline on hover */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 
                          to-indigo-600 w-0 group-hover:w-full transition-all duration-300" />
        </div>
      </SlideUp>
    </FadeIn>
  );
};
```

---

## 🛠️ Custom Hooks for Developer Utilities

### useClipboard Hook (Smart Detection)

```tsx
// src/hooks/useClipboard.ts
import { useState, useCallback, useEffect } from 'react';

export interface ClipboardContent {
  text: string;
  detectedTool: string | null;
}

export const useClipboard = () => {
  const [clipboard, setClipboard] = useState<ClipboardContent>({
    text: '',
    detectedTool: null,
  });

  const detectTool = useCallback((text: string): string | null => {
    // JSON Detection
    if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
      try {
        JSON.parse(text);
        return 'json-formatter';
      } catch {}
    }

    // UUID Detection
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(text)) {
      return 'uuid-generator';
    }

    // Base64 Detection
    if (/^[A-Za-z0-9+/=]+$/.test(text) && text.length % 4 === 0 && text.length > 8) {
      try {
        atob(text);
        return 'base64-decoder';
      } catch {}
    }

    // Unix Timestamp Detection
    if (/^\d{10}$/.test(text)) {
      return 'unix-time-converter';
    }

    // URL Detection
    if (text.startsWith('http://') || text.startsWith('https://')) {
      return 'url-encoder';
    }

    // CSV Detection
    if (text.includes(',') && text.includes('\n')) {
      return 'csv-converter';
    }

    return null;
  }, []);

  const updateClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const detectedTool = detectTool(text);
      setClipboard({ text, detectedTool });
    } catch (error) {
      console.log('Clipboard access denied');
    }
  }, [detectTool]);

  useEffect(() => {
    updateClipboard();
    const interval = setInterval(updateClipboard, 1000);
    return () => clearInterval(interval);
  }, [updateClipboard]);

  return clipboard;
};
```

---

## 🔧 Tool Implementation Example: JSON Formatter

```tsx
// src/features/formatters/components/JSONFormatter.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Copy, Maximize2, Minimize2 } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

interface JSONFormatterProps {
  initialValue?: string;
}

export const JSONFormatter: React.FC<JSONFormatterProps> = ({ initialValue = '' }) => {
  const [input, setInput] = useState(initialValue);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatJSON = useCallback((jsonString: string) => {
    try {
      setError('');
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setOutput('');
    }
  }, []);

  const minifyJSON = useCallback((jsonString: string) => {
    try {
      setError('');
      const parsed = JSON.parse(jsonString);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setOutput('');
    }
  }, []);

  const handleFormat = () => formatJSON(input);
  const handleMinify = () => minifyJSON(input);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedOutput = output
    ? Prism.highlight(output, Prism.languages.json, 'json')
    : '';

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Input Section */}
      <div className="flex-1 flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-300">Input JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="flex-1 p-4 bg-slate-950 border border-slate-700 rounded-lg 
                     text-white font-mono text-sm focus:outline-none focus:border-cyan-500
                     resize-none"
        />
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleFormat}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg 
                     text-white font-medium transition-colors"
        >
          Format
        </button>
        <button
          onClick={handleMinify}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg 
                     text-white font-medium transition-colors"
        >
          Minify
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto px-3 py-2 text-slate-400 hover:text-slate-200"
        >
          {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      {/* Output Section */}
      <div className={`flex flex-col gap-2 ${isExpanded ? 'h-96' : 'h-32'}`}>
        <label className="text-sm font-medium text-slate-300">Output</label>
        
        {error ? (
          <div className="flex-1 p-4 bg-red-950/20 border border-red-700 rounded-lg 
                          text-red-200 text-sm overflow-auto">
            {error}
          </div>
        ) : (
          <div className="relative flex-1">
            <pre
              className="absolute inset-0 p-4 bg-slate-950 border border-slate-700 
                         rounded-lg text-sm overflow-auto"
              dangerouslySetInnerHTML={{
                __html: highlightedOutput || '<span class="text-slate-500">Output will appear here...</span>',
              }}
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 
                           rounded text-slate-300 hover:text-white transition-all"
                title="Copy to clipboard"
              >
                <Copy size={16} />
                {copied && <span className="ml-1">Copied!</span>}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 🔍 Search Implementation with Keyboard Shortcuts

```tsx
// src/features/core/components/SearchBar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSearch = (value: string) => {
    setQuery(value);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search tools... (⌘K)"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 bg-slate-900 border border-slate-700 
                     rounded-lg text-white placeholder-slate-500 focus:outline-none 
                     focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 
                       hover:text-slate-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="absolute right-2 top-2 px-2 py-1 bg-slate-800 rounded text-xs 
                      text-slate-500 pointer-events-none">
        ⌘K
      </div>
    </div>
  );
};
```

---

## 📊 Zustand State Management for Tool Preferences

```tsx
// src/lib/store/toolStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ToolPreference {
  favorites: string[];
  recent: string[];
  defaultTool: string | null;
  theme: 'dark' | 'light';
  fontSize: 'sm' | 'md' | 'lg';
}

export const useToolStore = create<ToolPreference & {
  addFavorite: (toolId: string) => void;
  removeFavorite: (toolId: string) => void;
  addRecent: (toolId: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
}>(
  persist(
    (set) => ({
      favorites: [],
      recent: [],
      defaultTool: null,
      theme: 'dark',
      fontSize: 'md',

      addFavorite: (toolId: string) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, toolId])],
        })),

      removeFavorite: (toolId: string) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== toolId),
        })),

      addRecent: (toolId: string) =>
        set((state) => ({
          recent: [
            toolId,
            ...state.recent.filter((id) => id !== toolId),
          ].slice(0, 10),
        })),

      setTheme: (theme) => set({ theme }),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: 'tool-preferences',
      version: 1,
    }
  )
);
```

---

## ✅ TypeScript Types & Interfaces

```tsx
// src/types/tools.ts
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  component: React.ComponentType<any>;
  keywords: string[];
  isOffline: boolean;
}

export type ToolCategory =
  | 'encoders'
  | 'converters'
  | 'formatters'
  | 'generators'
  | 'validators'
  | 'inspectors';

export interface ToolResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

export interface SearchResult {
  tool: Tool;
  score: number;
  matches: string[];
}
```

---

## 🚀 Performance Optimization: Code Splitting

```tsx
// src/components/ToolLoader.tsx
'use client';

import React, { Suspense, lazy } from 'react';
import { Tool } from '@/types/tools';

interface ToolLoaderProps {
  tool: Tool;
}

const toolComponents: Record<string, React.LazyExoticComponent<any>> = {
  'json-formatter': lazy(() => import('@/features/formatters/components/JSONFormatter')),
  'base64-encoder': lazy(() => import('@/features/encoders/components/Base64Encoder')),
  'uuid-generator': lazy(() => import('@/features/generators/components/UUIDGenerator')),
  // ... more tools
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent" />
  </div>
);

export const ToolLoader: React.FC<ToolLoaderProps> = ({ tool }) => {
  const ToolComponent = toolComponents[tool.id];

  if (!ToolComponent) {
    return <div>Tool not found</div>;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ToolComponent />
    </Suspense>
  );
};
```

---

## ♿ Accessibility: WCAG 2.1 AA Compliance

```tsx
// Example: Accessible Button Component
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  aria-label?: string;
  aria-pressed?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  'aria-label': ariaLabel,
  variant = 'primary',
  ...props
}) => {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      aria-label={ariaLabel || typeof children === 'string' ? children : undefined}
      className={`
        px-4 py-2 rounded-lg font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
```

---

## 🧪 Testing Example: Vitest

```tsx
// src/features/encoders/__tests__/base64.test.ts
import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from '../lib/base64';

describe('Base64 Encoder/Decoder', () => {
  it('should encode string to base64', () => {
    expect(encodeBase64('hello world')).toBe('aGVsbG8gd29ybGQ=');
  });

  it('should decode base64 to string', () => {
    expect(decodeBase64('aGVsbG8gd29ybGQ=')).toBe('hello world');
  });

  it('should handle unicode characters', () => {
    const text = '你好世界';
    const encoded = encodeBase64(text);
    expect(decodeBase64(encoded)).toBe(text);
  });

  it('should throw on invalid base64', () => {
    expect(() => decodeBase64('!!!invalid!!!')).toThrow();
  });
});
```

---

## 📈 Performance Monitoring

```tsx
// src/lib/monitoring/performance.ts
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    const body = JSON.stringify(metric);
    navigator.sendBeacon('/api/metrics', body);
  }
};

export const measureToolPerformance = async (
  toolId: string,
  operation: () => Promise<void>
) => {
  const start = performance.now();
  try {
    await operation();
    const duration = performance.now() - start;
    console.log(`Tool ${toolId} executed in ${duration.toFixed(2)}ms`);
    
    if (duration > 500) {
      console.warn(`Tool ${toolId} performance warning: ${duration}ms`);
    }
  } catch (error) {
    console.error(`Tool ${toolId} failed:`, error);
  }
};
```

---

## 🎓 Best Practices Summary

### Code Quality
✅ **TypeScript Strict Mode**: Enable `strict: true` in tsconfig  
✅ **ESLint Configuration**: Use `eslint-config-next`  
✅ **Prettier Formatting**: Auto-format on save  
✅ **Pre-commit Hooks**: Use Husky + lint-staged  

### Performance
✅ **Code Splitting**: Lazy load tools with React.lazy  
✅ **Image Optimization**: Use Next.js `<Image>`  
✅ **Bundle Analysis**: Monitor with Bundle Stats  
✅ **Caching Strategy**: Leverage Vercel's edge caching  

### Accessibility
✅ **WCAG 2.1 AA**: Target at minimum AA level  
✅ **Semantic HTML**: Use proper HTML elements  
✅ **ARIA Labels**: Add for interactive elements  
✅ **Keyboard Navigation**: All features keyboard accessible  

### Testing
✅ **Unit Tests**: 80%+ coverage with Vitest  
✅ **Integration Tests**: Test tool workflows  
✅ **E2E Tests**: Optional Playwright tests  
✅ **Performance Tests**: Lighthouse CI  

### Security
✅ **Client-Side Only**: All processing local  
✅ **HTTPS Enforcement**: Always HTTPS in production  
✅ **Security Headers**: X-Frame-Options, CSP, etc.  
✅ **Dependency Scanning**: Automated via CI/CD  

---

## 🎯 Success Checklist

- [ ] MVP built (5-6 core tools working)
- [ ] TypeScript strict mode enabled
- [ ] Tests passing (80%+ coverage)
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Lighthouse score 95+
- [ ] Offline functionality 100%
- [ ] CI/CD pipeline deployed
- [ ] Production deployment on Vercel
- [ ] Performance targets met (<500ms tool response)
- [ ] Developer feels delighted using the platform

---

This guide provides production-ready code examples and best practices for building DevFlow following industry standards.