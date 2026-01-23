'use client'

import { useState } from 'react'
import { useFilteredData } from '@/hooks'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getSourceStatistics } from '@/lib/sourceNormalization'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SOURCE_COLORS = {
  'Job Site': '#3b82f6',
  'Employee Referral': '#8b5cf6',
  'WalkIn': '#10b981',
}

export function SourceAnalysis() {
  const { data } = useFilteredData()
  const [drillDown, setDrillDown] = useState<string | null>(null)
  
  const stats = getSourceStatistics(data)
  
  // Main view data
  const mainData = [
    { source: 'Job Site', count: stats.totalJobSite, color: SOURCE_COLORS['Job Site'] },
    { source: 'Employee Referral', count: stats.totalEmployeeReferral, color: SOURCE_COLORS['Employee Referral'] },
    { source: 'WalkIn', count: stats.totalWalkIn, color: SOURCE_COLORS['WalkIn'] },
  ]
  
  // Drill-down data
  const getDrillDownData = () => {
    if (!drillDown) return []
    
    if (drillDown === 'Job Site') {
      return Object.entries(stats.jobSiteBreakdown)
        .map(([site, count]) => ({ source: site, count, color: SOURCE_COLORS['Job Site'] }))
        .sort((a, b) => b.count - a.count)
    } else if (drillDown === 'Employee Referral') {
      return Object.entries(stats.employeeReferralBreakdown)
        .map(([name, count]) => ({ source: name, count, color: SOURCE_COLORS['Employee Referral'] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10) // Show top 10 referrers
    } else if (drillDown === 'WalkIn') {
      return Object.entries(stats.walkInBreakdown)
        .map(([type, count]) => ({ source: type, count, color: SOURCE_COLORS['WalkIn'] }))
        .sort((a, b) => b.count - a.count)
    }
    
    return []
  }
  
  const displayData = drillDown ? getDrillDownData() : mainData
  const title = drillDown ? `${drillDown} Breakdown` : 'Candidate Source Distribution'
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">📍 {title}</h3>
        {drillDown && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDrillDown(null)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Button>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={displayData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onClick={(data) => {
            if (!drillDown && data && data.activeLabel) {
              setDrillDown(data.activeLabel)
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis 
            dataKey="source" 
            type="category" 
            stroke="#6b7280"
            width={drillDown === 'Employee Referral' ? 150 : 120}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar 
            dataKey="count" 
            radius={[0, 8, 8, 0]}
            label={{ position: 'right', fill: '#374151', fontWeight: 600 }}
            style={{ cursor: drillDown ? 'default' : 'pointer' }}
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {!drillDown && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            💡 Click on any bar to see detailed breakdown
          </p>
        </div>
      )}
      
      {drillDown === 'Employee Referral' && getDrillDownData().length === 10 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing top 10 referrers
          </p>
        </div>
      )}
    </div>
  )
}
