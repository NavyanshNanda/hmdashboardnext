'use client'

import * as React from 'react'
import { CandidateRecord } from '@/lib/types'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PerformanceTableProps {
  data: CandidateRecord[]
  pageSize?: number
}

type SortField = 'HM Details' | 'Skill' | 'Status' | 'Recruiter Name'
type SortDirection = 'asc' | 'desc'

export function PerformanceTable({ data, pageSize = 10 }: PerformanceTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [sortField, setSortField] = React.useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc')

  const sortedData = React.useMemo(() => {
    if (!sortField) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]

      // Handle null/undefined values
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      if (aVal === bVal) return 0

      const comparison = aVal < bVal ? -1 : 1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [data, sortField, sortDirection])

  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = sortedData.slice(startIndex, endIndex)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1)
  }

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-gray-900 transition-colors"
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  )

  React.useEffect(() => {
    setCurrentPage(1)
  }, [data.length])

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="HM Details" label="HM" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="Skill" label="Skill" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="Status" label="Status" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="Recruiter Name" label="Recruiter" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((candidate, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {candidate['Recruiter Name']}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, sortedData.length)}</span> of{' '}
                <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
