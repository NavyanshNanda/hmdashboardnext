import { CandidateRecord } from './types'
import { format } from 'date-fns'

/**
 * Convert data to CSV format
 */
export function convertToCSV(data: CandidateRecord[]): string {
  if (data.length === 0) return ''

  // Get headers from first record
  const headers = Object.keys(data[0])
  
  // Create CSV header row
  const csvHeaders = headers.map(escapeCSVValue).join(',')
  
  // Create CSV data rows
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header as keyof CandidateRecord]
      
      // Format dates
      if (value instanceof Date) {
        return escapeCSVValue(format(value, 'yyyy-MM-dd'))
      }
      
      return escapeCSVValue(String(value ?? ''))
    }).join(',')
  })
  
  return [csvHeaders, ...csvRows].join('\n')
}

/**
 * Escape CSV values (handle commas, quotes, newlines)
 */
function escapeCSVValue(value: string): string {
  // If value contains comma, quote, or newline, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Download CSV file
 */
export function downloadCSV(data: CandidateRecord[], filename: string = 'candidates.csv') {
  const csv = convertToCSV(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

/**
 * Convert data to Excel-compatible CSV (with UTF-8 BOM)
 */
export function convertToExcelCSV(data: CandidateRecord[]): string {
  const csv = convertToCSV(data)
  // Add UTF-8 BOM for Excel compatibility
  return '\uFEFF' + csv
}

/**
 * Download Excel-compatible CSV file
 */
export function downloadExcel(data: CandidateRecord[], filename: string = 'candidates.csv') {
  const csv = convertToExcelCSV(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
