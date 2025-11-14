import { Tool } from '@/types'
import { TOOL_CATEGORIES } from './constants'

/**
 * Central registry of all available tools
 */
export const toolRegistry: Tool[] = [
  // Encoders/Decoders
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode or decode Base64 strings',
    category: TOOL_CATEGORIES.ENCODERS,
    icon: 'Lock',
    keywords: ['base64', 'encode', 'decode', 'btoa', 'atob'],
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URL/URI components',
    category: TOOL_CATEGORIES.ENCODERS,
    icon: 'Link',
    keywords: ['url', 'uri', 'encode', 'decode', 'percent'],
  },
  {
    id: 'html-encoder',
    name: 'HTML Entities Encoder/Decoder',
    description: 'Encode or decode HTML entities',
    category: TOOL_CATEGORIES.ENCODERS,
    icon: 'Code',
    keywords: ['html', 'entities', 'encode', 'decode', 'escape'],
  },

  // Formatters
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format, validate, and minify JSON data',
    category: TOOL_CATEGORIES.FORMATTERS,
    icon: 'FileJson',
    keywords: ['json', 'format', 'validate', 'beautify', 'minify', 'pretty'],
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and beautify XML data',
    category: TOOL_CATEGORIES.FORMATTERS,
    icon: 'FileCode',
    keywords: ['xml', 'format', 'beautify', 'pretty'],
  },
  {
    id: 'html-formatter',
    name: 'HTML Formatter',
    description: 'Format and beautify HTML code',
    category: TOOL_CATEGORIES.FORMATTERS,
    icon: 'FileCode',
    keywords: ['html', 'format', 'beautify', 'pretty'],
  },

  // Generators
  {
    id: 'uuid-generator',
    name: 'UUID/GUID Generator',
    description: 'Generate random UUIDs (v4)',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: 'Hash',
    keywords: ['uuid', 'guid', 'generate', 'random', 'unique'],
  },
  {
    id: 'nanoid-generator',
    name: 'Nano ID Generator',
    description: 'Generate URL-friendly unique IDs',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: 'Key',
    keywords: ['nanoid', 'id', 'generate', 'unique'],
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate SHA-256, SHA-512, MD5 hashes',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: 'Fingerprint',
    keywords: ['hash', 'sha', 'md5', 'sha256', 'sha512', 'checksum'],
  },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder Lorem Ipsum text',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: 'Type',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'dummy'],
  },
]

/**
 * Get a tool by its ID
 */
export function getToolById(id: string): Tool | undefined {
  return toolRegistry.find(tool => tool.id === id)
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: string): Tool[] {
  return toolRegistry.filter(tool => tool.category === category)
}

/**
 * Search tools by query
 */
export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase()
  return toolRegistry.filter(
    tool =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Get all tool categories
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(toolRegistry.map(tool => tool.category)))
}
