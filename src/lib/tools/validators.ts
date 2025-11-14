/**
 * Validator utilities for testing and validating data
 */

// RegExp Tester
export interface RegExpTestResult {
  matches: RegExpMatch[]
  isValid: boolean
  error?: string
}

export interface RegExpMatch {
  match: string
  index: number
  groups: string[]
}

export function testRegExp(pattern: string, flags: string, testString: string): RegExpTestResult {
  try {
    const regex = new RegExp(pattern, flags)
    const matches: RegExpMatch[] = []
    let match: RegExpExecArray | null

    if (flags.includes('g')) {
      while ((match = regex.exec(testString)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        })
      }
    } else {
      match = regex.exec(testString)
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        })
      }
    }

    return { matches, isValid: true }
  } catch (error) {
    return {
      matches: [],
      isValid: false,
      error: (error as Error).message,
    }
  }
}

// Cron Expression Parser
export interface CronParseResult {
  isValid: boolean
  description?: string
  nextRuns?: Date[]
  error?: string
}

export function parseCron(expression: string): CronParseResult {
  try {
    const parts = expression.trim().split(/\s+/)

    if (parts.length < 5 || parts.length > 6) {
      return {
        isValid: false,
        error: 'Cron expression must have 5 or 6 parts',
      }
    }

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts

    const description = generateCronDescription(minute, hour, dayOfMonth, month, dayOfWeek)

    return {
      isValid: true,
      description,
      nextRuns: [], // Would need a full cron library for accurate next runs
    }
  } catch (error) {
    return {
      isValid: false,
      error: (error as Error).message,
    }
  }
}

function generateCronDescription(
  minute: string,
  hour: string,
  dayOfMonth: string,
  month: string,
  dayOfWeek: string
): string {
  const parts: string[] = []

  // Minute
  if (minute === '*') parts.push('every minute')
  else if (minute.includes('/')) parts.push(`every ${minute.split('/')[1]} minutes`)
  else parts.push(`at minute ${minute}`)

  // Hour
  if (hour === '*') parts.push('every hour')
  else if (hour.includes('/')) parts.push(`every ${hour.split('/')[1]} hours`)
  else parts.push(`at ${hour}:00`)

  // Day of month
  if (dayOfMonth !== '*') {
    parts.push(`on day ${dayOfMonth} of the month`)
  }

  // Month
  if (month !== '*') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    parts.push(`in ${months[parseInt(month) - 1] || month}`)
  }

  // Day of week
  if (dayOfWeek !== '*') {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    parts.push(`on ${days[parseInt(dayOfWeek)] || dayOfWeek}`)
  }

  return parts.join(', ')
}

// YAML Validator
export function validateYaml(yaml: string): { valid: boolean; error?: string } {
  try {
    // Basic YAML validation
    const lines = yaml.split('\n')
    let lastIndent = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim() || line.trim().startsWith('#')) continue

      const indent = line.search(/\S/)
      if (indent % 2 !== 0 && indent > 0) {
        return {
          valid: false,
          error: `Invalid indentation at line ${i + 1}. YAML requires consistent 2-space indentation.`,
        }
      }

      if (indent - lastIndent > 2) {
        return {
          valid: false,
          error: `Invalid indentation jump at line ${i + 1}`,
        }
      }

      lastIndent = indent
    }

    return { valid: true }
  } catch (error) {
    return { valid: false, error: (error as Error).message }
  }
}

// JWT Decoder
export interface JWTDecoded {
  header: any
  payload: any
  signature: string
  isValid: boolean
  error?: string
}

export function decodeJWT(token: string): JWTDecoded {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return {
        header: null,
        payload: null,
        signature: '',
        isValid: false,
        error: 'Invalid JWT format. Must have 3 parts separated by dots.',
      }
    }

    const [headerB64, payloadB64, signature] = parts

    // Decode header
    const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')))

    // Decode payload
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')))

    return {
      header,
      payload,
      signature,
      isValid: true,
    }
  } catch (error) {
    return {
      header: null,
      payload: null,
      signature: '',
      isValid: false,
      error: (error as Error).message,
    }
  }
}

export function encodeJWT(header: any, payload: any): string {
  try {
    const headerB64 = btoa(JSON.stringify(header))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')

    const payloadB64 = btoa(JSON.stringify(payload))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')

    return `${headerB64}.${payloadB64}.SIGNATURE_REQUIRED`
  } catch (error) {
    throw new Error(`Failed to encode JWT: ${(error as Error).message}`)
  }
}

// URL Validator
export function validateURL(url: string): { valid: boolean; error?: string; parts?: any } {
  try {
    const urlObj = new URL(url)
    return {
      valid: true,
      parts: {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
      },
    }
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid URL format',
    }
  }
}

// Email Validator
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const valid = emailRegex.test(email)

  return {
    valid,
    error: valid ? undefined : 'Invalid email format',
  }
}

// Timestamp Converter
export function timestampToDate(timestamp: number | string): Date {
  const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp

  // Check if milliseconds or seconds
  if (ts > 10000000000) {
    return new Date(ts)
  } else {
    return new Date(ts * 1000)
  }
}

export function dateToTimestamp(date: Date, inMilliseconds: boolean = true): number {
  return inMilliseconds ? date.getTime() : Math.floor(date.getTime() / 1000)
}

// String Inspector
export interface StringInfo {
  length: number
  characters: number
  words: number
  lines: number
  bytes: number
  encoding: string
  hasUnicode: boolean
  hasEmoji: boolean
}

export function inspectString(str: string): StringInfo {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str).length

  const words = str.trim().split(/\s+/).filter(w => w.length > 0).length
  const lines = str.split('\n').length

  const hasUnicode = /[^\x00-\x7F]/.test(str)
  const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(str)

  return {
    length: str.length,
    characters: Array.from(str).length, // Handles surrogate pairs correctly
    words,
    lines,
    bytes,
    encoding: 'UTF-8',
    hasUnicode,
    hasEmoji,
  }
}
