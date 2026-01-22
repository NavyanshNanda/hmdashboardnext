import { NextRequest, NextResponse } from 'next/server'
import { loadCSVFromFile } from '@/lib/csvParser'
import { calculateSummary, getUniqueValues } from '@/lib/dataProcessing'
import path from 'path'

export const dynamic = 'force-dynamic' // Disable caching for now

/**
 * API Route to load and process CSV data
 * GET /api/data
 */
export async function GET(request: NextRequest) {
  try {
    // Path to CSV file in public directory
    const csvPath = path.join(process.cwd(), 'public', 'data', 'TA Tracker - HM Sheet.csv')
    
    // Load and process data
    const records = await loadCSVFromFile(csvPath)
    
    // Calculate summary statistics
    const summary = calculateSummary(records)
    
    // Get filter options
    const filterOptions = {
      hmOptions: getUniqueValues(records, 'HM Details'),
      skillOptions: getUniqueValues(records, 'Skill'),
      locationOptions: getUniqueValues(records, 'Location of posting'),
      recruiterOptions: getUniqueValues(records, 'Recruiter Name'),
    }

    // Get date range (using Req Date as primary)
    const dates = records
      .map((r) => r['Req Date'])
      .filter((d): d is Date => d instanceof Date)
    
    const minDate = dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : new Date()
    const maxDate = dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : new Date()

    return NextResponse.json({
      success: true,
      data: {
        records,
        summary,
        filterOptions,
        dateRange: {
          min: minDate.toISOString(),
          max: maxDate.toISOString(),
        },
      },
    })
  } catch (error) {
    console.error('Error loading CSV data:', error)
    
    // Return detailed error for debugging
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
