'use client'

import { useFilteredData } from '@/hooks'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export function ConversionFunnel() {
  const { data } = useFilteredData()

  // Calculate conversion metrics
  const screeningCleared = data.filter(
    (r) => r['Screening check status'] && 
    r['Screening check status'].toLowerCase() === 'cleared'
  ).length

  const interviewsCleared = data.filter(
    (r) => r['Status of R3'] && 
    r['Status of R3'].toLowerCase() === 'cleared'
  ).length

  const conversionRate = screeningCleared > 0 
    ? ((interviewsCleared / screeningCleared) * 100).toFixed(1)
    : 0

  const chartData = [
    { stage: 'Screening Cleared', count: screeningCleared, color: '#3b82f6' },
    { stage: 'Interviews Cleared', count: interviewsCleared, color: '#10b981' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">📊 Conversion Funnel Breakdown</h3>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg">
          <div className="text-xs font-medium opacity-90">Conversion Rate</div>
          <div className="text-2xl font-bold">{conversionRate}%</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis 
                dataKey="stage" 
                type="category" 
                stroke="#6b7280"
                width={150}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 flex flex-col justify-center">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">💡 About This KPI</h4>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            This metric shows the percentage of candidates who successfully cleared all three interview rounds 
            out of those who passed the initial screening stage.
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-700">Higher is better:</strong> A higher conversion rate indicates effective 
            screening processes and quality candidate selection.
          </p>
        </div>
      </div>
    </div>
  )
}
