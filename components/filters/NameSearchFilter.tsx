'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface NameSearchFilterProps {
  value: string
  onChange: (value: string) => void
}

export function NameSearchFilter({ value, onChange }: NameSearchFilterProps) {
  return (
    <div className="p-4 space-y-2">
      <label className="text-sm font-medium text-gray-700 block">
        🔍 Search Candidate Name
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Enter candidate name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {value && (
        <p className="text-xs text-gray-500">
          Filtering by: <span className="font-medium">{value}</span>
        </p>
      )}
    </div>
  )
}
