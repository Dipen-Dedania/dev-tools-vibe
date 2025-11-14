'use client'

import { useState, useEffect } from 'react'
import { timestampToDate, dateToTimestamp } from '@/lib/tools/validators'
import { CopyButton } from '../ui/CopyButton'

export function TimestampConverterTool() {
  const [timestamp, setTimestamp] = useState('')
  const [dateString, setDateString] = useState('')
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleTimestampChange = (ts: string) => {
    setTimestamp(ts)
    if (ts) {
      try {
        const date = timestampToDate(ts)
        setDateString(date.toISOString())
      } catch (error) {
        setDateString('Invalid timestamp')
      }
    }
  }

  const handleDateChange = (date: string) => {
    setDateString(date)
    if (date) {
      try {
        const ts = dateToTimestamp(new Date(date))
        setTimestamp(ts.toString())
      } catch (error) {
        setTimestamp('Invalid date')
      }
    }
  }

  const currentDate = new Date(currentTime)

  return (
    <div className="space-y-6">
      {/* Current Time */}
      <div className="p-4 bg-primary-600/10 border border-primary-600/20 rounded-lg">
        <h3 className="text-sm font-medium text-primary-400 mb-3">Current Time</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate-400">Unix (seconds)</label>
              <CopyButton text={Math.floor(currentTime / 1000).toString()} />
            </div>
            <div className="p-2 bg-slate-900 rounded font-mono text-sm">
              {Math.floor(currentTime / 1000)}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate-400">Unix (milliseconds)</label>
              <CopyButton text={currentTime.toString()} />
            </div>
            <div className="p-2 bg-slate-900 rounded font-mono text-sm">
              {currentTime}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-slate-400">ISO 8601</label>
            <CopyButton text={currentDate.toISOString()} />
          </div>
          <div className="p-2 bg-slate-900 rounded font-mono text-sm">
            {currentDate.toISOString()}
          </div>
        </div>
      </div>

      {/* Timestamp to Date */}
      <div>
        <label className="block text-sm font-medium mb-2">Unix Timestamp</label>
        <input
          type="text"
          value={timestamp}
          onChange={e => handleTimestampChange(e.target.value)}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
          placeholder="Enter timestamp (seconds or milliseconds)..."
        />
        {timestamp && dateString !== 'Invalid timestamp' && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate-400">Converted Date</label>
              <CopyButton text={dateString} />
            </div>
            <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm">
              {dateString}
            </div>
          </div>
        )}
      </div>

      {/* Date to Timestamp */}
      <div>
        <label className="block text-sm font-medium mb-2">Date (ISO 8601)</label>
        <input
          type="text"
          value={dateString}
          onChange={e => handleDateChange(e.target.value)}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
          placeholder="Enter date (YYYY-MM-DDTHH:mm:ss.sssZ)..."
        />
        {dateString && timestamp !== 'Invalid date' && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate-400">Converted Timestamp</label>
              <CopyButton text={timestamp} />
            </div>
            <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg font-mono text-sm">
              {timestamp}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
