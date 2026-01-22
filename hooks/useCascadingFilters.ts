import { useDashboardStore } from '@/store/dashboardStore'

/**
 * Hook to access cascading filter options
 */
export function useCascadingFilters() {
  const cascadingOptions = useDashboardStore((state) => state.cascadingOptions)
  return cascadingOptions
}
