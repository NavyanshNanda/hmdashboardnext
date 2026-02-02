import { AlertInfo } from '@/lib/alertDetection';

interface AlertCardProps {
  alert: AlertInfo;
}

export function AlertCard({ alert }: AlertCardProps) {
  const { candidate, tthViolation, ttfViolation, screeningDelayViolation, overallSeverity, panelistR1, panelistR2, panelistR3 } = alert;

  const bgColor = 
    overallSeverity === 'critical' ? 'bg-red-50 border-red-200' :
    overallSeverity === 'moderate' ? 'bg-orange-50 border-orange-200' :
    'bg-yellow-50 border-yellow-200';

  const badgeColor = 
    overallSeverity === 'critical' ? 'bg-red-100 text-red-800' :
    overallSeverity === 'moderate' ? 'bg-orange-100 text-orange-800' :
    'bg-yellow-100 text-yellow-800';

  const badgeLabel = 
    overallSeverity === 'critical' ? 'CRITICAL' :
    overallSeverity === 'moderate' ? 'MODERATE' :
    'WARNING';

  return (
    <div className={`border rounded-lg p-4 ${bgColor}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {candidate['Candidate Name']}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">HM:</span> {candidate['HM Details'] || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Recruiter:</span> {candidate['Recruiter Name'] || 'N/A'}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
          {badgeLabel}
        </span>
      </div>

      {/* Panelists Section */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Panelists</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-sm">
            <span className="font-medium text-gray-600">R1:</span>{' '}
            <span className="text-gray-900">{panelistR1 || '-'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-600">R2:</span>{' '}
            <span className="text-gray-900">{panelistR2 || '-'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-600">R3:</span>{' '}
            <span className="text-gray-900">{panelistR3 || '-'}</span>
          </div>
        </div>
      </div>

      {/* Violations Section */}
      <div className="space-y-2">
        {screeningDelayViolation && (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Screening Delay:</span>
              <span className="ml-2 text-sm text-gray-900">
                {screeningDelayViolation.daysDelayed} days
                {screeningDelayViolation.isPending && ' (Pending Screening)'}
              </span>
            </div>
            <span className="px-2 py-1 rounded text-xs font-semibold bg-red-200 text-red-900">
              {screeningDelayViolation.daysDelayed - 2} days over limit
            </span>
          </div>
        )}

        {tthViolation && (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Time to Hire (TTH):</span>
              <span className="ml-2 text-sm text-gray-900">{tthViolation.value} days</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              tthViolation.severity === 'critical' ? 'bg-red-200 text-red-900' :
              tthViolation.severity === 'moderate' ? 'bg-orange-200 text-orange-900' :
              'bg-yellow-200 text-yellow-900'
            }`}>
              {tthViolation.exceeded} days over limit
            </span>
          </div>
        )}
        
        {ttfViolation && (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Time to Fill (TTF):</span>
              <span className="ml-2 text-sm text-gray-900">{ttfViolation.value} days</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              ttfViolation.severity === 'critical' ? 'bg-red-200 text-red-900' :
              ttfViolation.severity === 'moderate' ? 'bg-orange-200 text-orange-900' :
              'bg-yellow-200 text-yellow-900'
            }`}>
              {ttfViolation.exceeded} days over limit
            </span>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Limits:</span> Screening ≤ 2 days, TTH ≤ 30 days, TTF ≤ 60 days
        </p>
      </div>
    </div>
  );
}
