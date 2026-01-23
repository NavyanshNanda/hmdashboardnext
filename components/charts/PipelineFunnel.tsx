'use client'

import { useFilteredData } from '@/hooks'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export function PipelineFunnel() {
  const { summary, data } = useFilteredData()

  // Calculate funnel metrics
  const totalCandidates = summary.total
  const afterScreening = totalCandidates - summary.screeningReject
  const afterInterviews = afterScreening - summary.rejected
  const shortlisted = summary.selected
  const joined = summary.joined

  const funnelData = [
    { stage: 'Total Candidates', count: totalCandidates, color: '#10b981' },
    { stage: 'After Screening', count: afterScreening, color: '#3b82f6' },
    { stage: 'After Interviews', count: afterInterviews, color: '#f59e0b' },
    { stage: 'Shortlisted', count: shortlisted, color: '#ef4444' },
    { stage: 'Joined', count: joined, color: '#8b5cf6' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">🎯 Recruitment Pipeline</h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={funnelData}
          layout="vertical"
          margin={{ top: 5, right: 50, left: 20, bottom: 5 }}
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
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
