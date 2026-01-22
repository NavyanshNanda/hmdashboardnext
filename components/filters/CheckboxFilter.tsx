'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Collapsible } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

interface CheckboxFilterProps {
  title: string
  options: string[]
  selected: string[]
  onToggle: (option: string) => void
  onSelectAll: () => void
  onClearAll: () => void
  searchable?: boolean
  defaultOpen?: boolean
}

export function CheckboxFilter({
  title,
  options,
  selected,
  onToggle,
  onSelectAll,
  onClearAll,
  searchable = true,
  defaultOpen = false,
}: CheckboxFilterProps) {
  const [searchTerm, setSearchTerm] = React.useState('')

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [options, searchTerm])

  return (
    <Collapsible title={title} defaultOpen={defaultOpen}>
      <div className="space-y-3">
        {searchable && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={`Search ${title}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="flex-1 text-xs"
          >
            ✔️ All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="flex-1 text-xs"
          >
            ❌ Clear
          </Button>
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2">
          {filteredOptions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No options found
            </p>
          ) : (
            filteredOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onToggle(option)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))
          )}
        </div>

        {filteredOptions.length > 0 && (
          <p className="text-xs text-gray-500 text-center">
            {selected.length} of {options.length} selected
          </p>
        )}
      </div>
    </Collapsible>
  )
}
