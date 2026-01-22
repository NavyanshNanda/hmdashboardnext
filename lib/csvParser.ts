import Papa from 'papaparse'
import { CandidateRecord } from './types'
import { cleanAndProcessData } from './dataProcessing'

/**
 * Parse CSV data from string
 */
export function parseCSVString(csvContent: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    // Split content into lines and remove first line (metadata row)
    const lines = csvContent.split('\n')
    const contentWithoutMetadata = lines.slice(1).join('\n')
    
    Papa.parse(contentWithoutMetadata, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error('CSV parsing errors:', results.errors)
        }
        resolve(results.data)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

/**
 * Load CSV file from URL (browser)
 */
export async function loadCSVFromURL(url: string): Promise<CandidateRecord[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load CSV: ${response.statusText}`)
  }
  
  const csvText = await response.text()
  const rawData = await parseCSVString(csvText)
  return cleanAndProcessData(rawData)
}

/**
 * Load CSV file from file system (Node.js)
 */
export async function loadCSVFromFile(filePath: string): Promise<CandidateRecord[]> {
  const fs = await import('fs/promises')
  const csvText = await fs.readFile(filePath, 'utf-8')
  const rawData = await parseCSVString(csvText)
  return cleanAndProcessData(rawData)
}
