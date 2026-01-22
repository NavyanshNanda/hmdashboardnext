'use client'

import { useFilteredData } from '@/hooks'

export function QuickStats() {
  const { summary, data, filteredRecords, totalRecords } = useFilteredData()

  const conversionRate = summary.total > 0 ? (summary.joined / summary.total * 100) : 0
  const selectionRate = summary.total > 0 ? (summary.selected / summary.total * 100) : 0
  const pendingCount = summary.pending

  const stats = [
    {
      label: 'Pending Candidates',
      value: pendingCount,
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-900',
      labelColor: 'text-cyan-600',
    },
    {
      label: 'Conversion Rate',
      value: `${conversionRate.toFixed(1)}%`,
      bgColor: 'bg-green-50',
      textColor: 'text-green-900',
      labelColor: 'text-green-600',
    },
    {
      label: 'Shortlist Rate',
      value: `${selectionRate.toFixed(1)}%`,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-900',
      labelColor: 'text-blue-600',
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">📌 Quick Stats</h3>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
            <p className={`text-sm font-medium ${stat.labelColor}`}>{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
