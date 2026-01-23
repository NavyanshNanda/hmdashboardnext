'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PipelineFunnel } from '@/components/charts/PipelineFunnel'
import { StatusPieChart } from '@/components/charts/StatusPieChart'
import { QuickStats } from '@/components/charts/QuickStats'
import { ConversionFunnel } from '@/components/charts/ConversionFunnel'
import { OfferConversionFunnel } from '@/components/charts/OfferConversionFunnel'
import { SourceAnalysis } from '@/components/charts/SourceAnalysis'
import { DataTable } from './DataTable'
import { ExportButtons } from './ExportButtons'
import { useFilteredData } from '@/hooks'

export function DashboardTabs() {
  const { data } = useFilteredData()

  return (
    <Tabs defaultValue="overview" className="w-full">
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
          📈 Candidate Metrics
        </TabsTrigger>
        <TabsTrigger 
          value="records"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          📋 Detailed Records
        </TabsTrigger>
        <TabsTrigger 
          value="kpi"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          📈 KPI Metrics
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
          <DataTable data={data.slice(0, 50)} pageSize={10} />
        </div>
      </TabsContent>

      <TabsContent value="records" className="mt-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">📋 Complete Candidate Data</h3>
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
    </Tabs>
  )
}
