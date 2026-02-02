import { parse, isValid } from 'date-fns'
import { CandidateRecord } from './types'
import { categorizeStatus } from './statusCategorization'

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
 * Parse date from various formats
 */
function parseDate(dateStr: unknown): Date | null {
  if (!dateStr || dateStr === 'nan' || dateStr === 'NaN') {
    return null
  }

  const str = String(dateStr).trim()
  if (str === '') return null

  // Try parsing DD-MMM-YY format first (e.g., "01-Dec-25", "1-Dec-25")
  const ddMmmYyMatch = str.match(/^(\d{1,2})-(\w{3})-(\d{2})$/i);
  if (ddMmmYyMatch) {
    const day = parseInt(ddMmmYyMatch[1]);
    const monthStr = ddMmmYyMatch[2];
    const year = 2000 + parseInt(ddMmmYyMatch[3]); // Convert 25 to 2025
    
    const monthMap: { [key: string]: number } = {
      'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
      'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
    };
    
    const month = monthMap[monthStr.toLowerCase()];
    if (month !== undefined) {
      const date = new Date(year, month, day);
      if (isValid(date)) {
        return date;
      }
    }
  }

  // Try parsing as ISO date
  const isoDate = new Date(str)
  if (isValid(isoDate)) {
    return isoDate
  }

  // Try common date formats
  const formats = [
    'yyyy-MM-dd',
    'MM/dd/yyyy',
    'dd/MM/yyyy',
    'M/d/yyyy',
    'd/M/yyyy',
  ]

  for (const format of formats) {
    try {
      const parsed = parse(str, format, new Date())
      if (isValid(parsed)) {
        return parsed
      }
    } catch {
      continue
    }
  }

  return null
}

/**
 * Clean and process raw CSV data
 * Replicates the Python load_and_clean_data function
 */
/**
 * Check if a record is valid (filter out #N/A and other invalid records)
 */
function isValidRecord(row: any): boolean {
  const status = safeString(row['Status'])
  // Filter out #N/A and completely empty records
  if (status === '#N/A' || status === '#n/a') {
    return false
  }
  // Filter out rows where candidate name is empty
  if (!row['Candidate Name'] || safeString(row['Candidate Name']) === '') {
    return false
  }
  return true
}

export function cleanAndProcessData(rawData: any[]): CandidateRecord[] {
  return rawData
    .filter(isValidRecord)
    .map((row) => {
    // Clean string columns
    const cleanedRow: any = {}
    
    const stringColumns = [
      'Status',
      'HM Details',
      'Skill',
      'Location of posting',
      'Recruiter Name',
      'Candidate Name',
      'Screening check status',
      'Status of R1',
      'Status of R2',
      'Status of R3',
    ]

    // Process all columns
    for (const key in row) {
      if (stringColumns.includes(key)) {
        cleanedRow[key] = safeString(row[key])
      } else {
        cleanedRow[key] = row[key]
      }
    }

    // Parse dates
    const reqDate = parseDate(row['Req Date'])
    const sourcingDate = parseDate(row['Sourcing Date'])
    const screeningDate = parseDate(row['Screening Date'])
    cleanedRow['Req Date'] = reqDate || new Date()
    cleanedRow['Sourcing Date'] = sourcingDate || new Date()
    cleanedRow['Screening Date'] = screeningDate || '' // Don't set default if missing

    // Categorize status
    const [category, rejectRound] = categorizeStatus({
      Status: cleanedRow['Status'],
      'Status of R1': cleanedRow['Status of R1'],
      'Status of R2': cleanedRow['Status of R2'],
      'Status of R3': cleanedRow['Status of R3'],
    })

    cleanedRow['Dashboard_Category'] = category
    cleanedRow['Reject_Round'] = rejectRound

    return cleanedRow as CandidateRecord
  })
}

/**
 * Get unique sorted values from a column
 */
export function getUniqueValues(data: CandidateRecord[], column: keyof CandidateRecord): string[] {
  const values = data
    .map((row) => {
      const value = row[column]
      if (typeof value === 'string' && value.trim() !== '') {
        return value
      }
      return null
    })
    .filter((v): v is string => v !== null)

  return Array.from(new Set(values)).sort()
}

/**
 * Calculate summary statistics
 */
export function calculateSummary(data: CandidateRecord[]) {
  return {
    total: data.length,
    joined: data.filter((r) => r.Dashboard_Category === 'Joined').length,
    selected: data.filter((r) => r.Dashboard_Category === 'Selected').length,
    rejected: data.filter((r) => r.Dashboard_Category === 'Rejected').length,
    screeningReject: data.filter((r) => r.Dashboard_Category === 'Screening Reject').length,
    pending: data.filter((r) => r.Dashboard_Category === 'Pending/Active').length,
  }
}
