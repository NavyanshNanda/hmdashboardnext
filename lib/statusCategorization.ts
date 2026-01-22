import { DashboardCategory, RejectRound } from './types'

// Status lists matching the Python logic
const joinedList = new Set(['joined', 'internship letter shared'])
const selectedList = new Set(['selected', 'yes', 'shortlisted'])
const rejectedList = new Set([
  'rejected',
  'rejected in r1',
  'rejected in r2',
  'offer declined...',
])
const screeningList = new Set(['screening reject', 'rejected in technical screening'])
const pendingList = new Set([
  'in process',
  'under discussion',
  'pending at r1',
  'pending at r2',
  'pending at r3',
  'on hold',
  'scheduled for r1',
  'scheduled for r2',
  'scheduled for r3',
])

/**
 * Safely convert value to string, handling null, undefined, and NaN
 */
function safeString(value: unknown): string {
  if (value === null || value === undefined || value === 'nan' || value === 'NaN') {
    return ''
  }
  return String(value).trim()
}

/**
 * Categorize candidate status based on Status and Round columns
 * This replicates the Python categorize_status function
 */
export function categorizeStatus(row: {
  Status?: unknown
  'Status of R1'?: unknown
  'Status of R2'?: unknown
  'Status of R3'?: unknown
}): [DashboardCategory, RejectRound | null] {
  const status = safeString(row.Status)
  const r1 = safeString(row['Status of R1'])
  const r2 = safeString(row['Status of R2'])
  const r3 = safeString(row['Status of R3'])

  const statusLc = status.toLowerCase()

  // Treat blanks as Pending/Active
  if (status === '' || statusLc === 'nan') {
    return ['Pending/Active', null]
  }

  // Check joined
  if (joinedList.has(statusLc)) {
    return ['Joined', null]
  }

  // Check selected
  if (selectedList.has(statusLc)) {
    return ['Selected', null]
  }

  // Check screening reject
  if (screeningList.has(statusLc)) {
    return ['Screening Reject', null]
  }

  // Determine reject round
  let rejectRound: RejectRound | null = null
  if (r1 === 'Not Cleared') {
    rejectRound = 'R1'
  } else if (r2 === 'Not Cleared') {
    rejectRound = 'R2'
  } else if (r3 === 'Not Cleared') {
    rejectRound = 'R3'
  }

  // Check rejected
  if (rejectedList.has(statusLc) || statusLc.includes('rejected')) {
    // If no round info, treat as screening reject
    if (rejectRound === null && r1 === '' && r2 === '' && r3 === '') {
      return ['Screening Reject', null]
    }
    return ['Rejected', rejectRound]
  }

  // Check pending
  if (pendingList.has(statusLc)) {
    return ['Pending/Active', null]
  }

  // Default to Other
  return ['Other', null]
}
