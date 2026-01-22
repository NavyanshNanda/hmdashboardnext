'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PipelineFunnel } from '@/components/charts/PipelineFunnel'
import { QuickStats } from '@/components/charts/QuickStats'
import { ConversionFunnel } from '@/components/charts/ConversionFunnel'
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
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PipelineFunnel />
          </div>
          <div>
            <QuickStats />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="metrics" className="mt-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📈 Performance Metrics</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    HM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skill
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 10).map((candidate, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {candidate['Candidate Name']}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate['HM Details']}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate['Skill']}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        candidate.Dashboard_Category === 'Joined' ? 'bg-green-100 text-green-800' :
                        candidate.Dashboard_Category === 'Selected' ? 'bg-blue-100 text-blue-800' :
                        candidate.Dashboard_Category === 'Rejected' ? 'bg-red-100 text-red-800' :
                        candidate.Dashboard_Category === 'Screening Reject' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {candidate.Dashboard_Category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length > 10 && (
            <p className="text-sm text-gray-500 mt-4 text-center">
              Showing 10 of {data.length} candidates
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="records" className="mt-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 Complete Candidate Data</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    HM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skill
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recruiter
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((candidate, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {candidate['Candidate Name']}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate['HM Details']}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate['Skill']}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate['Status']}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate['Recruiter Name']}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="kpi" className="mt-6">
        <ConversionFunnel />
      </TabsContent>
    </Tabs>
  )
}
