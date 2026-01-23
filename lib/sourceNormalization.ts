/**
 * Normalize source types (handle typos and variations)
 */
export function normalizeSource(source: string | null | undefined): string {
  if (!source) return 'Unknown'
  
  const normalized = source.toLowerCase().trim()
  
  // Handle Employee Referral variations
  if (normalized === 'referral' || normalized === 'employee referral') {
    return 'Employee Referral'
  }
  
  if (normalized === 'job site' || normalized === 'jobsite') {
    return 'Job Site'
  }
  
  if (normalized === 'walkin' || normalized === 'walk in' || normalized === 'walk-in') {
    return 'WalkIn'
  }
  
  return source
}

/**
 * Extract clean job site name from sub source
 * Examples:
 * - "Naukri (Pardeep)" -> "Naukri"
 * - "Pardeep Naukri" -> "Naukri"
 * - "LinkedIn (John)" -> "LinkedIn"
 * - "Indeed" -> "Indeed"
 */
export function extractJobSiteName(subSource: string | null | undefined): string {
  if (!subSource) return 'Unknown'
  
  const normalized = subSource.trim()
  
  // List of known job sites
  const jobSites = [
    'naukri',
    'linkedin',
    'indeed',
    'monster',
    'shine',
    'timesjobs',
    'instahyre',
    'hirist',
    'foundit',
    'internshala',
  ]
  
  // Check if any job site keyword exists in the string
  const lowerSubSource = normalized.toLowerCase()
  
  for (const site of jobSites) {
    if (lowerSubSource.includes(site)) {
      // Return the proper capitalized version
      return site.charAt(0).toUpperCase() + site.slice(1)
    }
  }
  
  // If no known job site found, clean up the string
  // Remove content in parentheses: "Something (Name)" -> "Something"
  let cleaned = normalized.replace(/\s*\([^)]*\)/g, '').trim()
  
  // Remove common person name patterns (first word if followed by site name)
  const words = cleaned.split(/\s+/)
  if (words.length > 1) {
    // If multiple words, take the last word (assumes "Name SiteName" pattern)
    cleaned = words[words.length - 1]
  }
  
  return cleaned || 'Other'
}

/**
 * Extract employee name from sub source for referrals
 */
export function extractEmployeeName(subSource: string | null | undefined): string {
  if (!subSource) return 'Unknown'
  return subSource.trim()
}

/**
 * Get grouped source statistics
 */
export interface SourceStats {
  totalJobSite: number
  totalEmployeeReferral: number
  totalWalkIn: number
  jobSiteBreakdown: Record<string, number>
  employeeReferralBreakdown: Record<string, number>
  walkInBreakdown: Record<string, number>
}

export function getSourceStatistics(data: any[]): SourceStats {
  const stats: SourceStats = {
    totalJobSite: 0,
    totalEmployeeReferral: 0,
    totalWalkIn: 0,
    jobSiteBreakdown: {},
    employeeReferralBreakdown: {},
    walkInBreakdown: {},
  }
  
  data.forEach(record => {
    const source = normalizeSource(record['Source'])
    const subSource = record['Sub Source']
    
    if (source === 'Job Site') {
      stats.totalJobSite++
      const siteName = extractJobSiteName(subSource)
      stats.jobSiteBreakdown[siteName] = (stats.jobSiteBreakdown[siteName] || 0) + 1
    } else if (source === 'Employee Referral') {
      stats.totalEmployeeReferral++
      const employeeName = extractEmployeeName(subSource)
      stats.employeeReferralBreakdown[employeeName] = (stats.employeeReferralBreakdown[employeeName] || 0) + 1
    } else if (source === 'WalkIn') {
      stats.totalWalkIn++
      const walkInType = subSource || 'Direct'
      stats.walkInBreakdown[walkInType] = (stats.walkInBreakdown[walkInType] || 0) + 1
    }
  })
  
  return stats
}
