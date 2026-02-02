import { CandidateRecord } from './types';

export type AlertSeverity = 'critical' | 'moderate' | 'warning';

export interface AlertInfo {
  candidate: CandidateRecord;
  tthViolation?: {
    value: number;
    exceeded: number;
    severity: AlertSeverity;
  };
  ttfViolation?: {
    value: number;
    exceeded: number;
    severity: AlertSeverity;
  };
  screeningDelayViolation?: {
    daysDelayed: number;
    isPending: boolean;
    severity: AlertSeverity;
  };
  overallSeverity: AlertSeverity;
  panelistR1: string;
  panelistR2: string;
  panelistR3: string;
}

const TTH_LIMIT = 30;
const TTF_LIMIT = 60;
const SCREENING_DELAY_LIMIT = 2; // 2 days / 48 hours
const MODERATE_THRESHOLD = 5;
const CRITICAL_THRESHOLD = 10;

function calculateSeverity(exceededDays: number): AlertSeverity {
  if (exceededDays >= CRITICAL_THRESHOLD) return 'critical';
  if (exceededDays >= MODERATE_THRESHOLD) return 'moderate';
  return 'warning';
}

function parseDate(dateValue: string | Date): Date | null {
  if (!dateValue) return null;
  if (dateValue instanceof Date) return dateValue;
  
  // Parse DD-MMM-YY format (e.g., "01-Dec-25")
  const parts = dateValue.toString().match(/(\d{1,2})-(\w{3})-(\d{2})/);
  if (parts) {
    const day = parseInt(parts[1]);
    const monthStr = parts[2];
    const year = 2000 + parseInt(parts[3]); // Convert 25 to 2025
    
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    const month = monthMap[monthStr];
    if (month !== undefined) {
      return new Date(year, month, day);
    }
  }
  
  // Fallback to standard date parsing
  const date = new Date(dateValue);
  return isNaN(date.getTime()) ? null : date;
}

function calculateDaysDifference(date1: Date, date2: Date): number {
  // Calculate difference where date2 should be after date1
  // Returns positive if date2 is after date1, negative if before
  const diffTime = date2.getTime() - date1.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function extractPanelistNames(candidate: CandidateRecord): { r1: string; r2: string; r3: string } {
  // Find panelist columns - they appear before "Status of R1", "Status of R2", "Status of R3"
  // Based on CSV structure, the panelist columns are "Panelist name", "Panelist name_1", "Panelist name_2"
  const r1 = (candidate as any)['Panelist name'] || '';
  const r2 = (candidate as any)['Panelist name_1'] || '';
  const r3 = (candidate as any)['Panelist name_2'] || '';
  
  return { r1, r2, r3 };
}

export function detectAlerts(candidates: CandidateRecord[]): AlertInfo[] {
  const alerts: AlertInfo[] = [];

  for (const candidate of candidates) {
    const tthRaw = candidate['TTH (30 days)'];
    const ttfRaw = candidate['TTF (60 days)'];

    // Convert to number if string
    const tth = typeof tthRaw === 'string' ? parseFloat(tthRaw) : tthRaw;
    const ttf = typeof ttfRaw === 'string' ? parseFloat(ttfRaw) : ttfRaw;

    let tthViolation: AlertInfo['tthViolation'] = undefined;
    let ttfViolation: AlertInfo['ttfViolation'] = undefined;
    let screeningDelayViolation: AlertInfo['screeningDelayViolation'] = undefined;

    // Check Screening Delay
    const sourcingDate = parseDate(candidate['Sourcing Date']);
    const screeningDate = parseDate(candidate['Screening Date']);
    
    if (sourcingDate) {
      if (screeningDate) {
        // Screening completed - check delay between sourcing and screening
        // Only alert if screening date is AFTER sourcing date
        const delayDays = calculateDaysDifference(sourcingDate, screeningDate);
        if (delayDays > SCREENING_DELAY_LIMIT) {
          screeningDelayViolation = {
            daysDelayed: delayDays,
            isPending: false,
            severity: 'critical', // Always red for screening delays
          };
        }
      } else {
        // Screening not done yet - check delay from sourcing to today
        const today = new Date();
        const delayDays = calculateDaysDifference(sourcingDate, today);
        if (delayDays > SCREENING_DELAY_LIMIT) {
          screeningDelayViolation = {
            daysDelayed: delayDays,
            isPending: true,
            severity: 'critical', // Always red for screening delays
          };
        }
      }
    }

    // Check TTH violation (positive values only, exceeded by more than TTH_LIMIT)
    if (tth && !isNaN(tth) && tth > 0 && tth > TTH_LIMIT) {
      const exceeded = tth - TTH_LIMIT;
      tthViolation = {
        value: tth,
        exceeded,
        severity: calculateSeverity(exceeded),
      };
    }

    // Check TTF violation (positive values only, exceeded by more than TTF_LIMIT)
    if (ttf && !isNaN(ttf) && ttf > 0 && ttf > TTF_LIMIT) {
      const exceeded = ttf - TTF_LIMIT;
      ttfViolation = {
        value: ttf,
        exceeded,
        severity: calculateSeverity(exceeded),
      };
    }

    // Only create alert if there's at least one violation
    if (tthViolation || ttfViolation || screeningDelayViolation) {
      const panelists = extractPanelistNames(candidate);
      
      // Overall severity is the highest severity of any violation
      let overallSeverity: AlertSeverity = 'warning';
      if (tthViolation?.severity === 'critical' || ttfViolation?.severity === 'critical' || screeningDelayViolation?.severity === 'critical') {
        overallSeverity = 'critical';
      } else if (tthViolation?.severity === 'moderate' || ttfViolation?.severity === 'moderate') {
        overallSeverity = 'moderate';
      }

      alerts.push({
        candidate,
        tthViolation,
        ttfViolation,
        screeningDelayViolation,
        overallSeverity,
        panelistR1: panelists.r1,
        panelistR2: panelists.r2,
        panelistR3: panelists.r3,
      });
    }
  }

  // Sort: Red (critical) first, then orange (moderate), then yellow (warning)
  const severityOrder = { critical: 0, moderate: 1, warning: 2 };
  return alerts.sort((a, b) => severityOrder[a.overallSeverity] - severityOrder[b.overallSeverity]);
}
