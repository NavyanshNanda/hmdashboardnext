'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export function Collapsible({ title, defaultOpen = false, children, className }: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className={cn('border-b border-gray-200 last:border-0', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="font-medium text-gray-700">{title}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-gray-500 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}
