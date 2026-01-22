'use client'

import { useFilteredData } from '@/hooks'

export function KPICards() {
  const { summary } = useFilteredData()

  const cards = [
    {
      title: '👥 Total Candidates',
      value: summary.total,
      gradient: 'from-[#6366f1] to-[#8b5cf6]',
    },
    {
      title: '❌ Rejections',
      value: summary.rejected,
      gradient: 'from-[#ec4899] to-[#ef4444]',
    },
    {
      title: '⭐ Selected',
      value: summary.selected,
      gradient: 'from-[#f59e0b] to-[#f97316]',
    },
    {
      title: '✅ Joined',
      value: summary.joined,
      gradient: 'from-[#10b981] to-[#059669]',
    },
    {
      title: '⏳ Pending',
      value: summary.pending,
      gradient: 'from-[#06b6d4] to-[#3b82f6]',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
        >
          <h3 className="text-sm font-medium opacity-90 mb-2">{card.title}</h3>
          <p className="text-4xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
