'use client'

import { useFilteredData } from '@/hooks'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = {
  Joined: '#4f46e5',        // indigo 600
  Selected: '#6366f1',      // indigo 500
  Rejected: '#818cf8',      // indigo 400
  'Screening Reject': '#a5b4fc', // indigo 300
  Pending: '#c7d2fe',       // indigo 200
}

export function StatusPieChart() {
  const { summary } = useFilteredData()

  const pieData = [
    { name: 'Joined', value: summary.joined, color: COLORS.Joined },
    { name: 'Selected', value: summary.selected, color: COLORS.Selected },
    { name: 'Rejected', value: summary.rejected, color: COLORS.Rejected },
    { name: 'Screening Reject', value: summary.screeningReject, color: COLORS['Screening Reject'] },
    { name: 'Pending', value: summary.pending, color: COLORS.Pending },
  ].filter(item => item.value > 0) // Only show categories with data

  const total = summary.total

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      const percentage = ((data.value / total) * 100).toFixed(1)
      
      return (
        <div className="bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Count: {data.value}</p>
          <p className="text-sm text-gray-600">Percentage: {percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">📊 Status Distribution</h3>
      
      <div style={{ position: 'relative', width: '100%', height: 450 }}>
        <ResponsiveContainer width="100%" height={450}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="45%"
              labelLine={false}
              outerRadius={130}
              innerRadius={85}
              paddingAngle={0}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
          <div className="text-sm text-gray-500">Total Candidates</div>
          <div className="text-4xl font-bold text-gray-900">{total}</div>
        </div>
      </div>
      
      {/* Custom legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
        {pieData.map((entry, index) => {
          const percentage = ((entry.value / total) * 100).toFixed(0)
          return (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">
                {entry.name}: <span className="font-semibold text-gray-900">{percentage}%</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
