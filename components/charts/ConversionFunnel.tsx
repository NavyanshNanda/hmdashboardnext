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
      <h3 className="text-xl font-semibold text-gray-900 mb-6">📊 Interview to Screening Conversion</h3>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <ResponsiveContainer width="100%" height={280}>
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
              <Bar 
                dataKey="count" 
                radius={[0, 8, 8, 0]}
                label={{ position: 'right', fill: '#374151', fontWeight: 600 }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 flex flex-col justify-center">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
            <div className="text-sm font-medium opacity-90 mb-2">Conversion Rate</div>
            <div className="text-5xl font-bold mb-6">{conversionRate}%</div>
            
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-xs font-medium mb-3">Formula:</div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="bg-white/30 px-3 py-2 rounded font-semibold">
                  {interviewsCleared}
                </div>
                <div className="text-lg">÷</div>
                <div className="bg-white/30 px-3 py-2 rounded font-semibold">
                  {screeningCleared}
                </div>
                <div className="text-lg">×</div>
                <div className="bg-white/30 px-2 py-2 rounded font-semibold">
                  100
                </div>
              </div>
              <div className="text-xs mt-3 opacity-90">
                (Interviews Cleared / Screening Cleared) × 100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
