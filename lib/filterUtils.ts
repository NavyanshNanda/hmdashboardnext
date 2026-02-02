import { CandidateRecord, FilterState, CascadingFilterOptions } from './types'
import { isAfter, isBefore, startOfDay } from 'date-fns'

/**
 * Apply all filters to the dataset
 */
export function applyFilters(
  data: CandidateRecord[],
  filters: FilterState
): CandidateRecord[] {
  let filtered = [...data]

  // Date range filter (using Req Date as primary)
  if (filters.dateRange) {
    const [startDate, endDate] = filters.dateRange
    filtered = filtered.filter((row) => {
      const rowDate = row['Req Date']
      if (!rowDate) return false
      
      const date = rowDate instanceof Date ? rowDate : new Date(rowDate)
      const start = startOfDay(startDate)
      const end = startOfDay(endDate)
      
      return (
        (isAfter(date, start) || date.getTime() === start.getTime()) &&
        (isBefore(date, end) || date.getTime() === end.getTime())
      )
    })
  }

  // HM filter
  if (filters.hmFilter.length > 0) {
    filtered = filtered.filter((row) =>
      filters.hmFilter.includes(row['HM Details'])
    )
  }

  // Skill filter
  if (filters.skillFilter.length > 0) {
    filtered = filtered.filter((row) =>
      filters.skillFilter.includes(row['Skill'])
    )
  }

  // Location filter
  if (filters.locationFilter.length > 0) {
    filtered = filtered.filter((row) =>
      filters.locationFilter.includes(row['Location of posting'])
    )
  }

  // Recruiter filter
  if (filters.recruiterFilter.length > 0) {
    filtered = filtered.filter((row) =>
      filters.recruiterFilter.includes(row['Recruiter Name'])
    )
  }

  // Name search
  if (filters.nameSearch.trim() !== '') {
    const searchLower = filters.nameSearch.toLowerCase()
    filtered = filtered.filter((row) =>
      row['Candidate Name'].toLowerCase().includes(searchLower)
    )
  }

  // Category filter (pipeline bar clicked)
  if (filters.categoryFilter) {
    switch (filters.categoryFilter) {
      case 'all':
        // Show all candidates (no additional filter)
        break
      case 'screening-cleared':
        // All candidates EXCEPT screening rejects
        filtered = filtered.filter((row) => 
          row.Dashboard_Category !== 'Screening Reject'
        )
        break
      case 'interview-cleared':
        // Candidates who passed screening AND passed interviews
        filtered = filtered.filter((row) => 
          row.Dashboard_Category !== 'Screening Reject' && 
          row.Dashboard_Category !== 'Rejected'
        )
        break
      case 'offered':
        // Offered candidates (Selected)
        filtered = filtered.filter((row) => 
          row.Dashboard_Category === 'Selected'
        )
        break
      case 'joined':
        // Joined candidates
        filtered = filtered.filter((row) => 
          row.Dashboard_Category === 'Joined'
        )
        break
    }
  }

  return filtered
}

/**
 * Get unique values from a column in filtered data
 */
function getUniqueValues(data: CandidateRecord[], column: keyof CandidateRecord): string[] {
  const values = data
    .map((row) => row[column])
    .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
  return Array.from(new Set(values)).sort()
}

/**
 * Calculate cascading filter options based on current selections
 * This replicates the Python get_filtered_options function
 */
export function getCascadingOptions(
  data: CandidateRecord[],
  filters: FilterState,
  currentFilterCol: 'HM Details' | 'Skill' | 'Location of posting' | 'Recruiter Name'
): string[] {
  let filtered = [...data]

  // Apply date filter (using Req Date as primary)
  if (filters.dateRange) {
    const [startDate, endDate] = filters.dateRange
    filtered = filtered.filter((row) => {
      const rowDate = row['Req Date']
      if (!rowDate) return false
      
      const date = rowDate instanceof Date ? rowDate : new Date(rowDate)
      const start = startOfDay(startDate)
      const end = startOfDay(endDate)
      
      return (
        (isAfter(date, start) || date.getTime() === start.getTime()) &&
        (isBefore(date, end) || date.getTime() === end.getTime())
      )
    })
  }

  // Apply other filters except the current one
  if (currentFilterCol !== 'HM Details' && filters.hmFilter.length > 0) {
    filtered = filtered.filter((row) => filters.hmFilter.includes(row['HM Details']))
  }

  if (currentFilterCol !== 'Skill' && filters.skillFilter.length > 0) {
    filtered = filtered.filter((row) => filters.skillFilter.includes(row['Skill']))
  }

  if (currentFilterCol !== 'Location of posting' && filters.locationFilter.length > 0) {
    filtered = filtered.filter((row) =>
      filters.locationFilter.includes(row['Location of posting'])
    )
  }

  if (currentFilterCol !== 'Recruiter Name' && filters.recruiterFilter.length > 0) {
    filtered = filtered.filter((row) =>
      filters.recruiterFilter.includes(row['Recruiter Name'])
    )
  }

  return getUniqueValues(filtered, currentFilterCol)
}

/**
 * Get all cascading filter options at once
 */
export function getAllCascadingOptions(
  data: CandidateRecord[],
  filters: FilterState
): CascadingFilterOptions {
  return {
    availableHMs: getCascadingOptions(data, filters, 'HM Details'),
    availableSkills: getCascadingOptions(data, filters, 'Skill'),
    availableLocations: getCascadingOptions(data, filters, 'Location of posting'),
    availableRecruiters: getCascadingOptions(data, filters, 'Recruiter Name'),
  }
}
