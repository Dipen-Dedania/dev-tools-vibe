import { useMemo } from 'react'

export interface DetectedTool {
  id: string
  name: string
  confidence: number
}

/**
 * Custom hook for auto-detecting tool type from input text
 */
export function useToolDetection(input: string): DetectedTool[] {
  return useMemo(() => {
    const detections: DetectedTool[] = []

    if (!input || input.trim().length === 0) {
      return detections
    }

    const trimmed = input.trim()

    // UUID Detection
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed)) {
      detections.push({ id: 'uuid-generator', name: 'UUID/GUID', confidence: 1.0 })
    }

    // JSON Detection
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        JSON.parse(trimmed)
        detections.push({ id: 'json-formatter', name: 'JSON', confidence: 0.95 })
      } catch {
        // Not valid JSON
      }
    }

    // Base64 Detection
    if (/^[A-Za-z0-9+/]+=*$/.test(trimmed) && trimmed.length % 4 === 0 && trimmed.length > 20) {
      detections.push({ id: 'base64-encoder', name: 'Base64', confidence: 0.8 })
    }

    // URL Detection
    if (/^https?:\/\/.+/.test(trimmed) || trimmed.includes('%20') || trimmed.includes('%3A')) {
      detections.push({ id: 'url-encoder', name: 'URL', confidence: 0.85 })
    }

    // HTML Detection
    if (trimmed.includes('&lt;') || trimmed.includes('&gt;') || trimmed.includes('&amp;')) {
      detections.push({ id: 'html-encoder', name: 'HTML Entities', confidence: 0.9 })
    }

    // XML Detection
    if (trimmed.startsWith('<?xml') || (trimmed.startsWith('<') && trimmed.endsWith('>') && trimmed.includes('</'))) {
      detections.push({ id: 'xml-formatter', name: 'XML', confidence: 0.9 })
    }

    // Hex Detection
    if (/^[0-9a-f\s]+$/i.test(trimmed) && trimmed.length > 10) {
      detections.push({ id: 'hex-encoder', name: 'Hex', confidence: 0.7 })
    }

    // Binary Detection
    if (/^[01\s]+$/.test(trimmed) && trimmed.length > 16) {
      detections.push({ id: 'binary-encoder', name: 'Binary', confidence: 0.75 })
    }

    // JWT Detection
    if (/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/.test(trimmed)) {
      detections.push({ id: 'jwt-decoder', name: 'JWT', confidence: 0.95 })
    }

    // Unix Timestamp Detection
    if (/^\d{10}$/.test(trimmed) || /^\d{13}$/.test(trimmed)) {
      detections.push({ id: 'timestamp-converter', name: 'Unix Timestamp', confidence: 0.85 })
    }

    // Color Hex Detection
    if (/^#[0-9A-F]{6}$/i.test(trimmed) || /^#[0-9A-F]{3}$/i.test(trimmed)) {
      detections.push({ id: 'color-converter', name: 'Color', confidence: 0.95 })
    }

    // Sort by confidence
    return detections.sort((a, b) => b.confidence - a.confidence)
  }, [input])
}
