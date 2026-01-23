'use client'

import { useFilteredData } from '@/hooks'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export function OfferConversionFunnel() {
  const { data } = useFilteredData()

  // Calculate offer conversion metrics
  const offeredCandidates = data.filter(
    (r) => r['Offer date'] && r['Offer date'] !== ''
  ).length

  const acceptedCandidates = data.filter(
    (r) => r['Offer Acceptance Date'] && r['Offer Acceptance Date'] !== ''
  ).length

  const joinedCandidates = data.filter(
    (r) => r['Joining Date'] && r['Joining Date'] !== ''
  ).length

  const acceptanceRate = offeredCandidates > 0 
    ? ((acceptedCandidates / offeredCandidates) * 100).toFixed(1)
    : 0

  const joiningRate = offeredCandidates > 0 
    ? ((joinedCandidates / offeredCandidates) * 100).toFixed(1)
    : 0

  const chartData = [
    { stage: 'Offered', count: offeredCandidates, color: '#3b82f6' },
    { stage: 'Accepted', count: acceptedCandidates, color: '#8b5cf6' },
    { stage: 'Joined', count: joinedCandidates, color: '#10b981' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">🎯 Offer to Joining Conversion</h3>

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

        <div className="col-span-2 flex flex-col justify-center gap-4">
          {/* Acceptance Rate */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-xs font-medium opacity-90 mb-1">Offer Acceptance Rate</div>
            <div className="text-4xl font-bold mb-4">{acceptanceRate}%</div>
            
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs font-medium mb-2">Formula:</div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="bg-white/30 px-2.5 py-1.5 rounded font-semibold">
                  {acceptedCandidates}
                </div>
                <div className="text-base">÷</div>
                <div className="bg-white/30 px-2.5 py-1.5 rounded font-semibold">
                  {offeredCandidates}
                </div>
                <div className="text-base">×</div>
                <div className="bg-white/30 px-2 py-1.5 rounded font-semibold">
                  100
                </div>
              </div>
              <div className="text-xs mt-2 opacity-90">
                (Accepted / Offered) × 100
              </div>
            </div>
          </div>

          {/* Joining Rate */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-xs font-medium opacity-90 mb-1">Offer Joining Rate</div>
            <div className="text-4xl font-bold mb-4">{joiningRate}%</div>
            
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs font-medium mb-2">Formula:</div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="bg-white/30 px-2.5 py-1.5 rounded font-semibold">
                  {joinedCandidates}
                </div>
                <div className="text-base">÷</div>
                <div className="bg-white/30 px-2.5 py-1.5 rounded font-semibold">
                  {offeredCandidates}
                </div>
                <div className="text-base">×</div>
                <div className="bg-white/30 px-2 py-1.5 rounded font-semibold">
                  100
                </div>
              </div>
              <div className="text-xs mt-2 opacity-90">
                (Joined / Offered) × 100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
