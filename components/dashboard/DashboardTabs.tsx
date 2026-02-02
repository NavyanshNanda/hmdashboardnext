'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PipelineFunnel } from '@/components/charts/PipelineFunnel'
import { StatusPieChart } from '@/components/charts/StatusPieChart'
import { QuickStats } from '@/components/charts/QuickStats'
import { ConversionFunnel } from '@/components/charts/ConversionFunnel'
import { OfferConversionFunnel } from '@/components/charts/OfferConversionFunnel'
import { SourceAnalysis } from '@/components/charts/SourceAnalysis'
import { DataTable } from './DataTable'
import { PerformanceTable } from './PerformanceTable'
import { ExportButtons } from './ExportButtons'
import { AlertsTab } from '@/components/alerts/AlertsTab'
import { useFilteredData } from '@/hooks'
import { detectAlerts } from '@/lib/alertDetection'
import { useDashboardStore } from '@/store/dashboardStore'

export function DashboardTabs() {
  const { data } = useFilteredData()
  const alerts = detectAlerts(data)
  const alertCount = alerts.length
  const { activeTab, setActiveTab, filters, setCategoryFilter } = useDashboardStore()

  const getCategoryLabel = (category: typeof filters.categoryFilter) => {
    switch (category) {
      case 'all': return 'All Candidates'
      case 'screening-cleared': return 'Screening Cleared'
      case 'interview-cleared': return 'Interview Cleared'
      case 'offered': return 'Offered Candidates'
      case 'joined': return 'Joined'
      default: return null
    }
  }

  const categoryLabel = getCategoryLabel(filters.categoryFilter)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="bg-white shadow-sm p-1.5 gap-2">
        <TabsTrigger 
          value="overview" 
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          📊 Pipeline Overview
        </TabsTrigger>
        <TabsTrigger 
          value="metrics"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          📈 Performance Metrics
        </TabsTrigger>
        <TabsTrigger 
          value="records"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          📋 Candidate Records
        </TabsTrigger>
        <TabsTrigger 
          value="kpi"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          📈 KPI Metrics
        </TabsTrigger>
        <TabsTrigger 
          value="alerts"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white relative"
        >
          🚨 Alerts
          {alertCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
              {alertCount}
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <div className="space-y-6">
          {/* Charts Row - 60/40 Split */}
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3">
              <PipelineFunnel />
            </div>
            <div className="col-span-2">
              <StatusPieChart />
            </div>
          </div>
          
          {/* Quick Stats - Full Width Horizontal */}
          <QuickStats />
        </div>
      </TabsContent>

      <TabsContent value="metrics" className="mt-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">📈 Performance Metrics</h3>
            <ExportButtons />
          </div>
          <PerformanceTable data={data.slice(0, 50)} pageSize={10} />
        </div>
      </TabsContent>

      <TabsContent value="records" className="mt-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-900">📋 Complete Candidate Data</h3>
              {categoryLabel && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  <span className="text-sm font-medium">Filtered: {categoryLabel}</span>
                  <button
                    onClick={() => setCategoryFilter(null)}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                    title="Clear filter"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <ExportButtons />
          </div>
          <DataTable data={data} pageSize={20} />
        </div>
      </TabsContent>

      <TabsContent value="kpi" className="mt-6">
        <div className="space-y-6">
          <ConversionFunnel />
          <OfferConversionFunnel />
          <SourceAnalysis />
        </div>
      </TabsContent>

      <TabsContent value="alerts" className="mt-6">
        <AlertsTab />
      </TabsContent>
    </Tabs>
  )
}
