import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CandidateRecord, FilterState, CascadingFilterOptions } from '@/lib/types'
import { applyFilters, getAllCascadingOptions } from '@/lib/filterUtils'
import { calculateSummary } from '@/lib/dataProcessing'

interface DashboardState {
  // Data
  rawData: CandidateRecord[]
  filteredData: CandidateRecord[]
  
  // Filter state
  filters: FilterState
  cascadingOptions: CascadingFilterOptions
  
  // UI state
  loading: boolean
  error: string | null
  
  // Date range bounds
  minDate: Date | null
  maxDate: Date | null
  
  // Actions
  setRawData: (data: CandidateRecord[], minDate: Date, maxDate: Date) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Filter actions
  setDateRange: (range: [Date, Date] | null) => void
  setHMFilter: (hms: string[]) => void
  setSkillFilter: (skills: string[]) => void
  setLocationFilter: (locations: string[]) => void
  setRecruiterFilter: (recruiters: string[]) => void
  setNameSearch: (search: string) => void
  
  // Bulk filter actions
  toggleHM: (hm: string) => void
  toggleSkill: (skill: string) => void
  toggleLocation: (location: string) => void
  toggleRecruiter: (recruiter: string) => void
  
  selectAllHM: () => void
  clearAllHM: () => void
  selectAllSkill: () => void
  clearAllSkill: () => void
  selectAllLocation: () => void
  clearAllLocation: () => void
  selectAllRecruiter: () => void
  clearAllRecruiter: () => void
  
  resetAllFilters: () => void
  
  // Internal method to update filtered data
  updateFilteredData: () => void
}

const initialFilterState: FilterState = {
  dateRange: null,
  hmFilter: [],
  skillFilter: [],
  locationFilter: [],
  recruiterFilter: [],
  nameSearch: '',
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Initial state
      rawData: [],
      filteredData: [],
      filters: initialFilterState,
      cascadingOptions: {
        availableHMs: [],
        availableSkills: [],
        availableLocations: [],
        availableRecruiters: [],
      },
      loading: false,
      error: null,
      minDate: null,
      maxDate: null,

      // Set raw data and initialize filters
      setRawData: (data, minDate, maxDate) => {
        set({
          rawData: data,
          minDate,
          maxDate,
          filters: {
            ...initialFilterState,
            dateRange: [minDate, maxDate],
          },
        })
        get().updateFilteredData()
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      // Filter actions
      setDateRange: (range) => {
        set((state) => ({
          filters: { ...state.filters, dateRange: range },
        }))
        get().updateFilteredData()
      },

      setHMFilter: (hms) => {
        set((state) => ({
          filters: { ...state.filters, hmFilter: hms },
        }))
        get().updateFilteredData()
      },

      setSkillFilter: (skills) => {
        set((state) => ({
          filters: { ...state.filters, skillFilter: skills },
        }))
        get().updateFilteredData()
      },

      setLocationFilter: (locations) => {
        set((state) => ({
          filters: { ...state.filters, locationFilter: locations },
        }))
        get().updateFilteredData()
      },

      setRecruiterFilter: (recruiters) => {
        set((state) => ({
          filters: { ...state.filters, recruiterFilter: recruiters },
        }))
        get().updateFilteredData()
      },

      setNameSearch: (search) => {
        set((state) => ({
          filters: { ...state.filters, nameSearch: search },
        }))
        get().updateFilteredData()
      },

      // Toggle individual items
      toggleHM: (hm) => {
        const current = get().filters.hmFilter
        const updated = current.includes(hm)
          ? current.filter((h) => h !== hm)
          : [...current, hm]
        get().setHMFilter(updated)
      },

      toggleSkill: (skill) => {
        const current = get().filters.skillFilter
        const updated = current.includes(skill)
          ? current.filter((s) => s !== skill)
          : [...current, skill]
        get().setSkillFilter(updated)
      },

      toggleLocation: (location) => {
        const current = get().filters.locationFilter
        const updated = current.includes(location)
          ? current.filter((l) => l !== location)
          : [...current, location]
        get().setLocationFilter(updated)
      },

      toggleRecruiter: (recruiter) => {
        const current = get().filters.recruiterFilter
        const updated = current.includes(recruiter)
          ? current.filter((r) => r !== recruiter)
          : [...current, recruiter]
        get().setRecruiterFilter(updated)
      },

      // Select/Clear all actions
      selectAllHM: () => {
        const available = get().cascadingOptions.availableHMs
        get().setHMFilter(available)
      },

      clearAllHM: () => {
        get().setHMFilter([])
      },

      selectAllSkill: () => {
        const available = get().cascadingOptions.availableSkills
        get().setSkillFilter(available)
      },

      clearAllSkill: () => {
        get().setSkillFilter([])
      },

      selectAllLocation: () => {
        const available = get().cascadingOptions.availableLocations
        get().setLocationFilter(available)
      },

      clearAllLocation: () => {
        get().setLocationFilter([])
      },

      selectAllRecruiter: () => {
        const available = get().cascadingOptions.availableRecruiters
        get().setRecruiterFilter(available)
      },

      clearAllRecruiter: () => {
        get().setRecruiterFilter([])
      },

      resetAllFilters: () => {
        const { minDate, maxDate } = get()
        set({
          filters: {
            ...initialFilterState,
            dateRange: minDate && maxDate ? [minDate, maxDate] : null,
          },
        })
        get().updateFilteredData()
      },

      // Update filtered data and cascading options
      updateFilteredData: () => {
        const { rawData, filters } = get()
        
        // Apply filters
        const filtered = applyFilters(rawData, filters)
        
        // Calculate cascading options
        const cascading = getAllCascadingOptions(rawData, filters)
        
        set({
          filteredData: filtered,
          cascadingOptions: cascading,
        })
      },
    }),
    {
      name: 'ta-dashboard-filters',
      partialize: (state) => ({
        filters: state.filters,
      }),
    }
  )
)
