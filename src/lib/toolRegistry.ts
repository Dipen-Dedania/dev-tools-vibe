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
  {
    id: 'hex-encoder',
    name: 'Hex Encoder/Decoder',
    description: 'Convert text to hexadecimal and back',
    category: TOOL_CATEGORIES.ENCODERS,
    icon: 'Binary',
    keywords: ['hex', 'hexadecimal', 'encode', 'decode'],
  },
  {
    id: 'binary-encoder',
    name: 'Binary Encoder/Decoder',
    description: 'Convert text to binary and back',
    category: TOOL_CATEGORIES.ENCODERS,
    icon: 'Binary',
    keywords: ['binary', 'encode', 'decode', '01'],
  },

  // Converters
  {
    id: 'json-yaml-converter',
    name: 'JSON ↔ YAML Converter',
    description: 'Convert between JSON and YAML formats',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: 'Repeat',
    keywords: ['json', 'yaml', 'convert', 'transform'],
  },
  {
    id: 'json-csv-converter',
    name: 'JSON ↔ CSV Converter',
    description: 'Convert between JSON and CSV formats',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: 'Repeat',
    keywords: ['json', 'csv', 'convert', 'transform', 'table'],
  },
  {
    id: 'json-xml-converter',
    name: 'JSON ↔ XML Converter',
    description: 'Convert between JSON and XML formats',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: 'Repeat',
    keywords: ['json', 'xml', 'convert', 'transform'],
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert between binary, octal, decimal, and hex',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: 'Binary',
    keywords: ['number', 'base', 'binary', 'octal', 'decimal', 'hex', 'convert'],
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, and HSL color formats',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: 'Palette',
    keywords: ['color', 'hex', 'rgb', 'hsl', 'convert'],
  },
  {
    id: 'markdown-html-converter',
    name: 'Markdown ↔ HTML Converter',
    description: 'Convert between Markdown and HTML',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: 'FileText',
    keywords: ['markdown', 'html', 'convert', 'md'],
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and dates',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: 'Clock',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert'],
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    category: TOOL_CATEGORIES.CONVERTERS,
    icon: 'Thermometer',
    keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'convert'],
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
  {
    id: 'sql-formatter',
    name: 'SQL Formatter & Beautifier',
    description: 'Format and beautify SQL queries with syntax highlighting',
    category: TOOL_CATEGORIES.FORMATTERS,
    icon: 'Database',
    keywords: ['sql', 'format', 'beautify', 'query', 'database'],
  },
  {
    id: 'css-formatter',
    name: 'CSS Formatter & Beautifier',
    description: 'Format and beautify CSS stylesheets with syntax highlighting',
    category: TOOL_CATEGORIES.FORMATTERS,
    icon: 'Paintbrush',
    keywords: ['css', 'format', 'beautify', 'style', 'stylesheet'],
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Write markdown and preview the rendered HTML in real-time',
    category: TOOL_CATEGORIES.FORMATTERS,
    icon: 'FileText',
    keywords: ['markdown', 'preview', 'md', 'live', 'render'],
  },

  // Validators
  {
    id: 'regexp-tester',
    name: 'RegExp Tester',
    description: 'Test regular expressions with live preview',
    category: TOOL_CATEGORIES.VALIDATORS,
    icon: 'Search',
    keywords: ['regex', 'regexp', 'regular expression', 'test', 'match'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and inspect JWT tokens',
    category: TOOL_CATEGORIES.VALIDATORS,
    icon: 'Key',
    keywords: ['jwt', 'json web token', 'decode', 'token'],
  },
  {
    id: 'cron-parser',
    name: 'Cron Expression Parser',
    description: 'Parse and validate cron expressions',
    category: TOOL_CATEGORIES.VALIDATORS,
    icon: 'Calendar',
    keywords: ['cron', 'schedule', 'parse', 'validate', 'expression'],
  },
  {
    id: 'string-inspector',
    name: 'String Inspector',
    description: 'Analyze string properties and encoding information',
    category: TOOL_CATEGORIES.VALIDATORS,
    icon: 'Info',
    keywords: ['string', 'inspect', 'analyze', 'characters', 'encoding', 'unicode'],
  },
  {
    id: 'text-diff',
    name: 'Text Diff Checker',
    description: 'Compare two text inputs and visualize differences',
    category: TOOL_CATEGORIES.VALIDATORS,
    icon: 'GitCompare',
    keywords: ['diff', 'compare', 'text', 'difference', 'merge', 'side-by-side'],
  },
  {
    id: 'yaml-validator',
    name: 'YAML Validator',
    description: 'Validate YAML syntax and check for indentation errors',
    category: TOOL_CATEGORIES.VALIDATORS,
    icon: 'FileCheck',
    keywords: ['yaml', 'validate', 'syntax', 'yml', 'indentation'],
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
    description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: 'Fingerprint',
    keywords: ['hash', 'sha', 'sha1', 'sha256', 'sha512', 'checksum'],
  },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder Lorem Ipsum text',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: 'Type',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'dummy'],
  },
  {
    id: 'random-string-generator',
    name: 'Random String Generator',
    description: 'Generate random strings with customizable length and character sets',
    category: TOOL_CATEGORIES.GENERATORS,
    icon: 'Shuffle',
    keywords: ['random', 'string', 'generate', 'password', 'token'],
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
