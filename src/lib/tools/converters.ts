/**
 * Converter utilities for transforming data between formats
 */

// JSON <-> YAML
export function jsonToYaml(json: string): string {
  try {
    const obj = JSON.parse(json)
    return objectToYaml(obj, 0)
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`)
  }
}

function objectToYaml(obj: any, indent: number = 0): string {
  const spaces = '  '.repeat(indent)
  let yaml = ''

  if (Array.isArray(obj)) {
    obj.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        yaml += `${spaces}-\n${objectToYaml(item, indent + 1)}`
      } else {
        yaml += `${spaces}- ${item}\n`
      }
    })
  } else if (typeof obj === 'object' && obj !== null) {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        yaml += `${spaces}${key}:\n${objectToYaml(value, indent + 1)}`
      } else {
        yaml += `${spaces}${key}: ${value}\n`
      }
    })
  }

  return yaml
}

export function yamlToJson(yaml: string): string {
  // Simple YAML parser (for basic cases)
  try {
    const lines = yaml.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'))
    const result: any = {}
    let currentObj: any = result
    const stack: any[] = [result]
    let lastIndent = 0

    lines.forEach(line => {
      const indent = line.search(/\S/)
      const trimmed = line.trim()

      if (trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':')
        const value = valueParts.join(':').trim()

        if (value) {
          currentObj[key.trim()] = isNaN(Number(value)) ? value : Number(value)
        } else {
          const newObj: any = {}
          currentObj[key.trim()] = newObj
          stack.push(newObj)
          currentObj = newObj
        }
      }

      lastIndent = indent
    })

    return JSON.stringify(result, null, 2)
  } catch (error) {
    throw new Error(`Failed to convert YAML: ${(error as Error).message}`)
  }
}

// JSON <-> CSV
export function jsonToCsv(json: string): string {
  try {
    const data = JSON.parse(json)
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('JSON must be an array of objects')
    }

    const headers = Object.keys(data[0])
    const csvRows = [headers.join(',')]

    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header]
        return typeof value === 'string' && value.includes(',')
          ? `"${value}"`
          : value
      })
      csvRows.push(values.join(','))
    })

    return csvRows.join('\n')
  } catch (error) {
    throw new Error(`Failed to convert JSON to CSV: ${(error as Error).message}`)
  }
}

export function csvToJson(csv: string): string {
  try {
    const lines = csv.split('\n').filter(line => line.trim())
    if (lines.length === 0) throw new Error('Empty CSV')

    const headers = lines[0].split(',').map(h => h.trim())
    const data: any[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''))
      const obj: any = {}
      headers.forEach((header, index) => {
        obj[header] = values[index]
      })
      data.push(obj)
    }

    return JSON.stringify(data, null, 2)
  } catch (error) {
    throw new Error(`Failed to convert CSV to JSON: ${(error as Error).message}`)
  }
}

// JSON <-> XML
export function jsonToXml(json: string): string {
  try {
    const obj = JSON.parse(json)
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + objectToXml(obj, 'root')
  } catch (error) {
    throw new Error(`Failed to convert JSON to XML: ${(error as Error).message}`)
  }
}

function objectToXml(obj: any, tagName: string): string {
  if (typeof obj !== 'object' || obj === null) {
    return `<${tagName}>${obj}</${tagName}>\n`
  }

  if (Array.isArray(obj)) {
    return obj.map(item => objectToXml(item, tagName)).join('')
  }

  let xml = `<${tagName}>\n`
  Object.entries(obj).forEach(([key, value]) => {
    xml += objectToXml(value, key)
  })
  xml += `</${tagName}>\n`
  return xml
}

export function xmlToJson(xml: string): string {
  // Simple XML parser (basic implementation)
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')
    const result = xmlNodeToObject(doc.documentElement)
    return JSON.stringify(result, null, 2)
  } catch (error) {
    throw new Error(`Failed to convert XML to JSON: ${(error as Error).message}`)
  }
}

function xmlNodeToObject(node: Element): any {
  if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
    return node.textContent
  }

  const obj: any = {}
  Array.from(node.children).forEach(child => {
    const key = child.tagName
    const value = xmlNodeToObject(child)

    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value)
      } else {
        obj[key] = [obj[key], value]
      }
    } else {
      obj[key] = value
    }
  })

  return obj
}

// Number Base Converter
export function convertNumberBase(
  value: string,
  fromBase: number,
  toBase: number
): string {
  try {
    const decimal = parseInt(value, fromBase)
    if (isNaN(decimal)) throw new Error('Invalid number for the specified base')
    return decimal.toString(toBase).toUpperCase()
  } catch (error) {
    throw new Error(`Failed to convert number base: ${(error as Error).message}`)
  }
}

// Temperature Converter
export function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number

  // Convert to Celsius first
  switch (from.toLowerCase()) {
    case 'celsius':
    case 'c':
      celsius = value
      break
    case 'fahrenheit':
    case 'f':
      celsius = (value - 32) * (5 / 9)
      break
    case 'kelvin':
    case 'k':
      celsius = value - 273.15
      break
    default:
      throw new Error('Invalid temperature unit')
  }

  // Convert from Celsius to target
  switch (to.toLowerCase()) {
    case 'celsius':
    case 'c':
      return celsius
    case 'fahrenheit':
    case 'f':
      return celsius * (9 / 5) + 32
    case 'kelvin':
    case 'k':
      return celsius + 273.15
    default:
      throw new Error('Invalid temperature unit')
  }
}

// Markdown <-> HTML
export function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Line breaks
    .replace(/\n/g, '<br>')

  return html
}

export function htmlToMarkdown(html: string): string {
  let markdown = html
    // Headers
    .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n')
    .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n')
    // Bold
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    // Italic
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i>(.*?)<\/i>/gi, '*$1*')
    // Links
    .replace(/<a href="(.*?)">(.*?)<\/a>/gi, '[$2]($1)')
    // Code
    .replace(/<code>(.*?)<\/code>/gi, '`$1`')
    // Line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Remove remaining tags
    .replace(/<[^>]*>/g, '')

  return markdown
}

// Color Converter
export interface ColorRGB {
  r: number
  g: number
  b: number
}

export interface ColorHSL {
  h: number
  s: number
  l: number
}

export function hexToRgb(hex: string): ColorRGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) throw new Error('Invalid hex color')

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

export function rgbToHsl(r: number, g: number, b: number): ColorHSL {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function hslToRgb(h: number, s: number, l: number): ColorRGB {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}
