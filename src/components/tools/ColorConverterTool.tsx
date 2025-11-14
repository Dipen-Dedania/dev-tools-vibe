'use client'

import { useState } from 'react'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/tools/converters'
import { CopyButton } from '../ui/CopyButton'

export function ColorConverterTool() {
  const [hexInput, setHexInput] = useState('#4F46E5')
  const [rgbR, setRgbR] = useState(79)
  const [rgbG, setRgbG] = useState(70)
  const [rgbB, setRgbB] = useState(229)
  const [hslH, setHslH] = useState(243)
  const [hslS, setHslS] = useState(75)
  const [hslL, setHslL] = useState(59)

  const updateFromHex = (hex: string) => {
    try {
      const rgb = hexToRgb(hex)
      setRgbR(rgb.r)
      setRgbG(rgb.g)
      setRgbB(rgb.b)
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      setHslH(hsl.h)
      setHslS(hsl.s)
      setHslL(hsl.l)
    } catch (error) {
      // Invalid hex
    }
  }

  const updateFromRgb = () => {
    const hex = rgbToHex(rgbR, rgbG, rgbB)
    setHexInput(hex)
    const hsl = rgbToHsl(rgbR, rgbG, rgbB)
    setHslH(hsl.h)
    setHslS(hsl.s)
    setHslL(hsl.l)
  }

  const updateFromHsl = () => {
    const rgb = hslToRgb(hslH, hslS, hslL)
    setRgbR(rgb.r)
    setRgbG(rgb.g)
    setRgbB(rgb.b)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    setHexInput(hex)
  }

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div>
        <label className="block text-sm font-medium mb-2">Preview</label>
        <div
          className="w-full h-32 rounded-lg border-2 border-slate-700"
          style={{ backgroundColor: hexInput }}
        />
      </div>

      {/* HEX */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">HEX</label>
          <CopyButton text={hexInput} />
        </div>
        <input
          type="text"
          value={hexInput}
          onChange={e => {
            setHexInput(e.target.value)
            updateFromHex(e.target.value)
          }}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
        />
      </div>

      {/* RGB */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">RGB</label>
          <CopyButton text={`rgb(${rgbR}, ${rgbG}, ${rgbB})`} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">R</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbR}
              onChange={e => {
                setRgbR(Number(e.target.value))
                updateFromRgb()
              }}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">G</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbG}
              onChange={e => {
                setRgbG(Number(e.target.value))
                updateFromRgb()
              }}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">B</label>
            <input
              type="number"
              min="0"
              max="255"
              value={rgbB}
              onChange={e => {
                setRgbB(Number(e.target.value))
                updateFromRgb()
              }}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* HSL */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">HSL</label>
          <CopyButton text={`hsl(${hslH}, ${hslS}%, ${hslL}%)`} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">H (0-360)</label>
            <input
              type="number"
              min="0"
              max="360"
              value={hslH}
              onChange={e => {
                setHslH(Number(e.target.value))
                updateFromHsl()
              }}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">S (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hslS}
              onChange={e => {
                setHslS(Number(e.target.value))
                updateFromHsl()
              }}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">L (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hslL}
              onChange={e => {
                setHslL(Number(e.target.value))
                updateFromHsl()
              }}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
