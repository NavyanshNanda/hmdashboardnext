'use client'

import * as React from 'react'
import { FilterSidebar } from '@/components/filters/FilterSidebar'
import { KPICards } from './KPICards'
import { DashboardTabs } from './DashboardTabs'
import { useDashboardData, useFilteredData } from '@/hooks'
import { Loader2 } from 'lucide-react'

export function DashboardLayout() {
  const { loading, error } = useDashboardData()
  const { filteredRecords, totalRecords } = useFilteredData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading TA Analytics Dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Processing candidate data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please make sure the CSV file is placed at:{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">
              public/data/TA Tracker - HM Sheet.csv
            </code>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <FilterSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              📊 Talent Acquisition Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Real-time Candidate Analytics & Insights
            </p>
            {filteredRecords !== totalRecords && (
              <p className="text-sm text-blue-600 mt-2">
                Showing {filteredRecords} of {totalRecords} candidates
              </p>
            )}
          </div>

          {/* KPI Cards */}
          <KPICards />

          {/* Dashboard Tabs with Charts */}
          <DashboardTabs />
        </div>
      </div>
    </div>
  )
}
