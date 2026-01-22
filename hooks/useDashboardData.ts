import { useEffect } from 'react'
import { useDashboardStore } from '@/store/dashboardStore'

/**
 * Hook to load dashboard data from API
 */
export function useDashboardData() {
  const { rawData, loading, error, setRawData, setLoading, setError } = useDashboardStore()

  useEffect(() => {
    // Only load if we don't have data yet
    if (rawData.length > 0) return

    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/data')
        const result = await response.json()

        if (result.success) {
          const minDate = new Date(result.data.dateRange.min)
          const maxDate = new Date(result.data.dateRange.max)
          
          setRawData(result.data.records, minDate, maxDate)
        } else {
          setError(result.message || 'Failed to load data')
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [rawData.length, setRawData, setLoading, setError])

  return { loading, error }
}
