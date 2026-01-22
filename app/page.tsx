'use client'

import { useDashboardData, useFilteredData } from '@/hooks'

export default function DashboardPage() {
  // Load data using the new hook
  const { loading, error } = useDashboardData()
  const { summary, totalRecords, filteredRecords } = useFilteredData()

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

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-[#334155] mb-4">
            Phase 2: Data Layer {loading ? '⏳' : error ? '❌' : '✅'}
          </h2>

          {loading && (
            <div className="flex items-center space-x-3 text-[#64748b]">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Loading CSV data...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold mb-2">Error loading data:</p>
              <p className="text-red-600">{error}</p>
              <p className="text-sm text-red-500 mt-4">
                Make sure to place your CSV file at: <code className="bg-red-100 px-2 py-1 rounded">public/data/TA Tracker - HM Sheet.csv</code>
              </p>
            </div>
          )}

          {!loading && !error && summary && (
            <div>
              <p className="text-[#64748b] mb-6">
                Data processing layer successfully implemented and tested!
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Total Records</p>
                  <p className="text-3xl font-bold text-blue-900">{totalRecords}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Joined</p>
                  <p className="text-3xl font-bold text-green-900">{summary.joined}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-600 font-medium">Selected</p>
                  <p className="text-3xl font-bold text-orange-900">{summary.selected}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600 font-medium">Rejected</p>
                  <p className="text-3xl font-bold text-red-900">{summary.rejected}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-600 font-medium">Screening Reject</p>
                  <p className="text-3xl font-bold text-purple-900">{summary.screeningReject}</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4">
                  <p className="text-sm text-cyan-600 font-medium">Pending</p>
                  <p className="text-3xl font-bold text-cyan-900">{summary.pending}</p>
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

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#334155] mb-4">
            Phase 3: State Management {loading ? '⏳' : error ? '❌' : '✅'}
          </h2>
          
          {!loading && !error && (
            <div>
              <p className="text-[#64748b] mb-6">
                Zustand store and custom hooks successfully implemented!
              </p>

              <ul className="space-y-2 text-[#475569]">
                <li>✅ Zustand store created</li>
                <li>✅ localStorage persistence configured</li>
                <li>✅ Filter state management</li>
                <li>✅ Cascading filter logic integrated</li>
                <li>✅ Custom hooks implemented:
                  <ul className="ml-6 mt-2 space-y-1 text-sm">
                    <li>• useDashboardData() - Data loading</li>
                    <li>• useFilteredData() - Filtered results</li>
                    <li>• useCascadingFilters() - Available options</li>
                    <li>• useFilterActions() - Filter manipulation</li>
                    <li>• useFilters() - Current filter values</li>
                  </ul>
                </li>
                <li>✅ Bulk actions (select all, clear all)</li>
                <li>✅ Real-time data filtering</li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your filter preferences are saved in browser localStorage and will persist across page refreshes!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
