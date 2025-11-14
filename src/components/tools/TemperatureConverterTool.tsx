'use client'

import { useState } from 'react'
import { ToolPage } from '@/components/ui/ToolPage'
import { Button } from '@/components/ui/Button'
import { convertTemperature } from '@/lib/tools/converters'

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin'

export default function TemperatureConverterTool() {
  const [value, setValue] = useState<string>('')
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius')
  const [toUnit, setToUnit] = useState<TemperatureUnit>('fahrenheit')
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleConvert = () => {
    setError('')
    setResult('')

    if (!value.trim()) {
      setError('Please enter a temperature value')
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setError('Please enter a valid number')
      return
    }

    try {
      const converted = convertTemperature(numValue, fromUnit, toUnit)
      setResult(converted.toFixed(2))
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleClear = () => {
    setValue('')
    setResult('')
    setError('')
  }

  const handleSwapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    if (result) {
      setValue(result)
      setResult('')
    }
  }

  const units: { value: TemperatureUnit; label: string; symbol: string }[] = [
    { value: 'celsius', label: 'Celsius', symbol: '°C' },
    { value: 'fahrenheit', label: 'Fahrenheit', symbol: '°F' },
    { value: 'kelvin', label: 'Kelvin', symbol: 'K' },
  ]

  return (
    <ToolPage
      title="Temperature Converter"
      description="Convert between Celsius, Fahrenheit, and Kelvin"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter temperature"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleConvert()
                  }
                }}
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as TemperatureUnit)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button onClick={handleSwapUnits} variant="ghost" size="sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </Button>
          </div>

          {/* Output Section */}
          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={result}
                readOnly
                placeholder="Result"
                className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-gray-400"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as TemperatureUnit)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleConvert} className="flex-1">
            Convert
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>

        {/* Common Conversions Reference */}
        <div className="bg-slate-800/50 rounded-lg p-4 text-sm">
          <h3 className="font-medium mb-2">Common Reference Points</h3>
          <div className="space-y-1 text-gray-400">
            <div className="flex justify-between">
              <span>Water Freezing Point:</span>
              <span>0°C = 32°F = 273.15K</span>
            </div>
            <div className="flex justify-between">
              <span>Water Boiling Point:</span>
              <span>100°C = 212°F = 373.15K</span>
            </div>
            <div className="flex justify-between">
              <span>Room Temperature:</span>
              <span>20°C = 68°F = 293.15K</span>
            </div>
            <div className="flex justify-between">
              <span>Absolute Zero:</span>
              <span>-273.15°C = -459.67°F = 0K</span>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
