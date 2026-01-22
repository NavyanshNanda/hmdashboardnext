import { useMemo } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'
import { calculateSummary } from '@/lib/dataProcessing'

/**
 * Hook to get filtered data and summary statistics
 */
export function useFilteredData() {
  const { filteredData, rawData } = useDashboardStore()

  const summary = useMemo(() => {
    return calculateSummary(filteredData)
  }, [filteredData])

  const totalRecords = rawData.length
  const filteredRecords = filteredData.length

  return {
    data: filteredData,
    summary,
    totalRecords,
    filteredRecords,
    hasFilters: filteredRecords !== totalRecords,
  }
}
