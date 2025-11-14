/**
 * Formatter utilities
 */

export function formatJSON(input: string, indent: number = 2): string {
  try {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed, null, indent)
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`)
  }
}

export function minifyJSON(input: string): string {
  try {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed)
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`)
  }
}

export function validateJSON(input: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(input)
    return { valid: true }
  } catch (error) {
    return { valid: false, error: (error as Error).message }
  }
}

export function formatXML(input: string, indent: number = 2): string {
  try {
    const PADDING = ' '.repeat(indent)
    const reg = /(>)(<)(\/*)/g
    let formatted = input.replace(reg, '$1\n$2$3')
    let pad = 0

    formatted = formatted
      .split('\n')
      .map(line => {
        let indent = 0
        if (line.match(/.+<\/\w[^>]*>$/)) {
          indent = 0
        } else if (line.match(/^<\/\w/)) {
          if (pad !== 0) {
            pad -= 1
          }
        } else if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1
        } else {
          indent = 0
        }

        const padding = PADDING.repeat(pad)
        pad += indent
        return padding + line
      })
      .join('\n')

    return formatted
  } catch (error) {
    throw new Error('Failed to format XML')
  }
}

export function formatHTML(input: string): string {
  return formatXML(input)
}

export function formatCSS(input: string): string {
  try {
    let formatted = input.replace(/\s+/g, ' ').trim()
    formatted = formatted.replace(/\{/g, ' {\n  ')
    formatted = formatted.replace(/\}/g, '\n}\n')
    formatted = formatted.replace(/;/g, ';\n  ')
    formatted = formatted.replace(/:\s*/g, ': ')
    return formatted.replace(/\n\s*\n/g, '\n')
  } catch (error) {
    throw new Error('Failed to format CSS')
  }
}

export function formatSQL(input: string, indent: number = 2): string {
  try {
    const PADDING = ' '.repeat(indent)

    // SQL keywords that should be on new lines
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY',
      'HAVING', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
      'JOIN', 'ON', 'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES',
      'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'DROP TABLE',
      'ALTER TABLE', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
    ]

    let formatted = input.trim()

    // Normalize whitespace
    formatted = formatted.replace(/\s+/g, ' ')

    // Add newlines before major keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      formatted = formatted.replace(regex, `\n${keyword}`)
    })

    // Format commas in SELECT statements
    formatted = formatted.replace(/,\s*/g, ',\n')

    // Add indentation
    const lines = formatted.split('\n').filter(line => line.trim())
    let indentLevel = 0
    const formattedLines = lines.map(line => {
      const trimmed = line.trim()

      // Decrease indent for certain keywords
      if (trimmed.match(/^(WHERE|FROM|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|GROUP BY|ORDER BY|HAVING|LIMIT)/i)) {
        indentLevel = 1
      } else if (trimmed.match(/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/i)) {
        indentLevel = 0
      } else if (trimmed.match(/^(AND|OR|ON|WHEN|THEN|ELSE)/i)) {
        indentLevel = 2
      }

      const padding = PADDING.repeat(Math.max(0, indentLevel))
      return padding + trimmed
    })

    return formattedLines.join('\n')
  } catch (error) {
    throw new Error(`Failed to format SQL: ${(error as Error).message}`)
  }
}
