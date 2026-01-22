'use client'

import * as React from 'react'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DateRangeFilterProps {
  startDate: Date | null
  endDate: Date | null
  minDate?: Date | null
  maxDate?: Date | null
  onChange: (range: [Date, Date] | null) => void
}

export function DateRangeFilter({
  startDate,
  endDate,
  minDate,
  maxDate,
  onChange,
}: DateRangeFilterProps) {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null
    if (date && endDate) {
      onChange([date, endDate])
    }
  }

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null
    if (date && startDate) {
      onChange([startDate, date])
    }
  }

  const formatDateForInput = (date: Date | null) => {
    if (!date) return ''
    return format(date, 'yyyy-MM-dd')
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Calendar className="h-4 w-4" />
        <span>Custom Date Range</span>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-600 block mb-1">From</label>
          <input
            type="date"
            value={formatDateForInput(startDate)}
            min={minDate ? formatDateForInput(minDate) : undefined}
            max={endDate ? formatDateForInput(endDate) : maxDate ? formatDateForInput(maxDate) : undefined}
            onChange={handleStartChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">To</label>
          <input
            type="date"
            value={formatDateForInput(endDate)}
            min={startDate ? formatDateForInput(startDate) : minDate ? formatDateForInput(minDate) : undefined}
            max={maxDate ? formatDateForInput(maxDate) : undefined}
            onChange={handleEndChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {startDate && endDate && (
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          {format(startDate, 'MMM dd, yyyy')} - {format(endDate, 'MMM dd, yyyy')}
        </div>
      )}
    </div>
  )
}
