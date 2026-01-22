import { useDashboardStore } from '@/store/dashboardStore'

/**
 * Hook to access current filter values
 */
export function useFilters() {
  const filters = useDashboardStore((state) => state.filters)
  const minDate = useDashboardStore((state) => state.minDate)
  const maxDate = useDashboardStore((state) => state.maxDate)

  return {
    ...filters,
    minDate,
    maxDate,
  }
}
