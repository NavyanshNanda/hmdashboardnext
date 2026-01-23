// Core data types for the TA Dashboard

export interface CandidateRecord {
  'Req Date': string | Date
  'Sourcing Date': string | Date
  'HM Details': string
  'Skill': string
  'Location of posting': string
  'Recruiter Name': string
  'Candidate Name': string
  'Status': string
  'Status of R1': string
  'Status of R2': string
  'Status of R3': string
  'Screening check status': string
  'TTF (60 days)': string | number
  'TTH (30 days)': string | number
  'Dashboard_Category': DashboardCategory
  'Reject_Round': RejectRound | null
  'Offer date': string | Date
  'Offer Acceptance Date': string | Date
  'Joining Date': string | Date
  'Source': string
  'Sub Source': string
}

export type DashboardCategory = 
  | 'Joined'
  | 'Selected'
  | 'Rejected'
  | 'Screening Reject'
  | 'Pending/Active'
  | 'Other'

export type RejectRound = 'R1' | 'R2' | 'R3'

export interface ProcessedData {
  records: CandidateRecord[]
  summary: {
    total: number
    joined: number
    selected: number
    rejected: number
    screeningReject: number
    pending: number
  }
}

export interface FilterOptions {
  hmOptions: string[]
  skillOptions: string[]
  locationOptions: string[]
  recruiterOptions: string[]
}

export interface FilterState {
  dateRange: [Date, Date] | null
  hmFilter: string[]
  skillFilter: string[]
  locationFilter: string[]
  recruiterFilter: string[]
  nameSearch: string
}

export interface CascadingFilterOptions {
  availableHMs: string[]
  availableSkills: string[]
  availableLocations: string[]
  availableRecruiters: string[]
}
