/**
 * Encoder/Decoder utilities
 */

export function encodeBase64(input: string): string {
  try {
    return btoa(input)
  } catch (error) {
    throw new Error('Failed to encode Base64: Invalid input')
  }
}

export function decodeBase64(input: string): string {
  try {
    return atob(input)
  } catch (error) {
    throw new Error('Failed to decode Base64: Invalid input')
  }
}

export function encodeURL(input: string): string {
  return encodeURIComponent(input)
}

export function decodeURL(input: string): string {
  try {
    return decodeURIComponent(input)
  } catch (error) {
    throw new Error('Failed to decode URL: Invalid input')
  }
}

export function encodeHTML(input: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return input.replace(/[&<>"']/g, char => entities[char])
}

export function decodeHTML(input: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  }
  return input.replace(/&[a-z]+;/g, entity => entities[entity] || entity)
}

export function encodeHex(input: string): string {
  return Array.from(input)
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
}

export function decodeHex(input: string): string {
  try {
    const hex = input.replace(/\s/g, '')
    if (hex.length % 2 !== 0) throw new Error('Invalid hex string')
    return hex
      .match(/.{1,2}/g)!
      .map(byte => String.fromCharCode(parseInt(byte, 16)))
      .join('')
  } catch (error) {
    throw new Error('Failed to decode Hex: Invalid input')
  }
}

export function encodeBinary(input: string): string {
  return Array.from(input)
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ')
}

export function decodeBinary(input: string): string {
  try {
    return input
      .split(/\s+/)
      .map(binary => String.fromCharCode(parseInt(binary, 2)))
      .join('')
  } catch (error) {
    throw new Error('Failed to decode Binary: Invalid input')
  }
}
