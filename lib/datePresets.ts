import { startOfDay, subDays, startOfWeek, startOfMonth, startOfQuarter, startOfYear, endOfDay } from 'date-fns'

export type DatePreset = 
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisQuarter'
  | 'lastQuarter'
  | 'thisYear'
  | 'lastYear'
  | 'allTime'

export interface DateRange {
  start: Date
  end: Date
  label: string
}

/**
 * Get date range for a preset
 */
export function getDateRangeForPreset(preset: DatePreset, minDate?: Date, maxDate?: Date): DateRange {
  const now = new Date()
  const today = startOfDay(now)
  const endToday = endOfDay(now)

  switch (preset) {
    case 'today':
      return { start: today, end: endToday, label: 'Today' }
    
    case 'yesterday':
      const yesterday = subDays(today, 1)
      return { start: yesterday, end: endOfDay(yesterday), label: 'Yesterday' }
    
    case 'last7days':
      return { start: subDays(today, 6), end: endToday, label: 'Last 7 Days' }
    
    case 'last30days':
      return { start: subDays(today, 29), end: endToday, label: 'Last 30 Days' }
    
    case 'thisWeek':
      return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endToday, label: 'This Week' }
    
    case 'lastWeek':
      const lastWeekStart = startOfWeek(subDays(now, 7), { weekStartsOn: 1 })
      const lastWeekEnd = endOfDay(subDays(startOfWeek(now, { weekStartsOn: 1 }), 1))
      return { start: lastWeekStart, end: lastWeekEnd, label: 'Last Week' }
    
    case 'thisMonth':
      return { start: startOfMonth(now), end: endToday, label: 'This Month' }
    
    case 'lastMonth':
      const lastMonthStart = startOfMonth(subDays(startOfMonth(now), 1))
      const lastMonthEnd = endOfDay(subDays(startOfMonth(now), 1))
      return { start: lastMonthStart, end: lastMonthEnd, label: 'Last Month' }
    
    case 'thisQuarter':
      return { start: startOfQuarter(now), end: endToday, label: 'This Quarter' }
    
    case 'lastQuarter':
      const lastQuarterStart = startOfQuarter(subDays(startOfQuarter(now), 1))
      const lastQuarterEnd = endOfDay(subDays(startOfQuarter(now), 1))
      return { start: lastQuarterStart, end: lastQuarterEnd, label: 'Last Quarter' }
    
    case 'thisYear':
      return { start: startOfYear(now), end: endToday, label: 'This Year' }
    
    case 'lastYear':
      const lastYearStart = startOfYear(subDays(startOfYear(now), 1))
      const lastYearEnd = endOfDay(subDays(startOfYear(now), 1))
      return { start: lastYearStart, end: lastYearEnd, label: 'Last Year' }
    
    case 'allTime':
      return {
        start: minDate || subDays(today, 365),
        end: maxDate || endToday,
        label: 'All Time'
      }
    
    default:
      return { start: today, end: endToday, label: 'Today' }
  }
}

/**
 * Get all available date presets
 */
export const DATE_PRESETS: { value: DatePreset; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'lastWeek', label: 'Last Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'thisQuarter', label: 'This Quarter' },
  { value: 'lastQuarter', label: 'Last Quarter' },
  { value: 'thisYear', label: 'This Year' },
  { value: 'lastYear', label: 'Last Year' },
  { value: 'allTime', label: 'All Time' },
]
