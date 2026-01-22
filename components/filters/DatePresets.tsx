'use client'

import { Button } from '@/components/ui/button'
import { useFilterActions } from '@/hooks'
import { getDateRangeForPreset } from '@/lib/datePresets'
import { Calendar } from 'lucide-react'

export function DatePresets() {
  const { setDateRange } = useFilterActions()

  const presets = [
    { label: 'Last 7 Days', value: 'last7days' as const, icon: Calendar },
    { label: 'Last 30 Days', value: 'last30days' as const, icon: Calendar },
    { label: 'Last Year', value: 'lastYear' as const, icon: Calendar },
    { label: 'All Time', value: 'allTime' as const, icon: Calendar },
  ]

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Quick Presets</label>
      <div className="grid grid-cols-1 gap-2">
        {presets.map((preset) => {
          const Icon = preset.icon
          return (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              onClick={() => {
                const range = getDateRangeForPreset(preset.value)
                setDateRange([range.start, range.end])
              }}
              className="justify-start text-xs"
            >
              <Icon className="h-3 w-3 mr-1.5" />
              {preset.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
