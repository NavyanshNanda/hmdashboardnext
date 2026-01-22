'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [dataStatus, setDataStatus] = useState<{
    loading: boolean
    error: string | null
    recordCount: number | null
    summary: any | null
  }>({
    loading: true,
    error: null,
    recordCount: null,
    summary: null,
  })

  useEffect(() => {
    async function testAPI() {
      try {
        const response = await fetch('/api/data')
        const result = await response.json()

        if (result.success) {
          setDataStatus({
            loading: false,
            error: null,
            recordCount: result.data.records.length,
            summary: result.data.summary,
          })
        } else {
          setDataStatus({
            loading: false,
            error: result.message || 'Failed to load data',
            recordCount: null,
            summary: null,
          })
        }
      } catch (error) {
        setDataStatus({
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          recordCount: null,
          summary: null,
        })
      }
    }

    testAPI()
  }, [])

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-[#1e293b] mb-2">
          📊 Talent Acquisition Dashboard
        </h1>
        <p className="text-[#64748b] text-lg mb-8">
          Real-time Candidate Analytics & Insights
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-[#334155] mb-4">
            Phase 1: Project Setup ✅
          </h2>
          <ul className="space-y-2 text-[#475569]">
            <li>✅ Next.js 14 with App Router</li>
            <li>✅ TypeScript configured</li>
            <li>✅ Tailwind CSS ready</li>
            <li>✅ All dependencies installed</li>
            <li>✅ Folder structure prepared</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#334155] mb-4">
            Phase 2: Data Layer {dataStatus.loading ? '⏳' : dataStatus.error ? '❌' : '✅'}
          </h2>

          {dataStatus.loading && (
            <div className="flex items-center space-x-3 text-[#64748b]">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Loading CSV data...</span>
            </div>
          )}

          {dataStatus.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold mb-2">Error loading data:</p>
              <p className="text-red-600">{dataStatus.error}</p>
              <p className="text-sm text-red-500 mt-4">
                Make sure to place your CSV file at: <code className="bg-red-100 px-2 py-1 rounded">public/data/TA Tracker - HM Sheet.csv</code>
              </p>
            </div>
          )}

          {!dataStatus.loading && !dataStatus.error && dataStatus.summary && (
            <div>
              <p className="text-[#64748b] mb-6">
                Data processing layer successfully implemented and tested!
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Total Records</p>
                  <p className="text-3xl font-bold text-blue-900">{dataStatus.recordCount}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Joined</p>
                  <p className="text-3xl font-bold text-green-900">{dataStatus.summary.joined}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-600 font-medium">Selected</p>
                  <p className="text-3xl font-bold text-orange-900">{dataStatus.summary.selected}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600 font-medium">Rejected</p>
                  <p className="text-3xl font-bold text-red-900">{dataStatus.summary.rejected}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-600 font-medium">Screening Reject</p>
                  <p className="text-3xl font-bold text-purple-900">{dataStatus.summary.screeningReject}</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4">
                  <p className="text-sm text-cyan-600 font-medium">Pending</p>
                  <p className="text-3xl font-bold text-cyan-900">{dataStatus.summary.pending}</p>
                </div>
              </div>

              <ul className="space-y-2 text-[#475569]">
                <li>✅ TypeScript interfaces defined</li>
                <li>✅ CSV parsing implemented (Papa Parse)</li>
                <li>✅ Data cleaning logic ported</li>
                <li>✅ Status categorization working</li>
                <li>✅ Filter utilities created</li>
                <li>✅ API route functional</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
