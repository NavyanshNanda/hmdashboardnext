import { useDashboardStore } from '@/store/dashboardStore'

/**
 * Hook to access filter actions
 */
export function useFilterActions() {
  const {
    setDateRange,
    setHMFilter,
    setSkillFilter,
    setLocationFilter,
    setRecruiterFilter,
    setNameSearch,
    toggleHM,
    toggleSkill,
    toggleLocation,
    toggleRecruiter,
    selectAllHM,
    clearAllHM,
    selectAllSkill,
    clearAllSkill,
    selectAllLocation,
    clearAllLocation,
    selectAllRecruiter,
    clearAllRecruiter,
    resetAllFilters,
  } = useDashboardStore()

  return {
    // Direct setters
    setDateRange,
    setHMFilter,
    setSkillFilter,
    setLocationFilter,
    setRecruiterFilter,
    setNameSearch,
    
    // Toggle actions
    toggleHM,
    toggleSkill,
    toggleLocation,
    toggleRecruiter,
    
    // Bulk actions
    selectAllHM,
    clearAllHM,
    selectAllSkill,
    clearAllSkill,
    selectAllLocation,
    clearAllLocation,
    selectAllRecruiter,
    clearAllRecruiter,
    
    // Reset
    resetAllFilters,
  }
}
