'use client';

import { useFilteredData } from '@/hooks';
import { detectAlerts } from '@/lib/alertDetection';
import { AlertCard } from '@/components/alerts/AlertCard';

export function AlertsTab() {
  const filteredData = useFilteredData();
  const alerts = detectAlerts(filteredData.data);

  const criticalCount = alerts.filter(a => a.overallSeverity === 'critical').length;
  const moderateCount = alerts.filter(a => a.overallSeverity === 'moderate').length;
  const warningCount = alerts.filter(a => a.overallSeverity === 'warning').length;
  
  // Count alerts by type
  const screeningDelayCount = alerts.filter(a => a.screeningDelayViolation).length;
  const tthCount = alerts.filter(a => a.tthViolation).length;
  const ttfCount = alerts.filter(a => a.ttfViolation).length;

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Alert Summary</h2>
        
        {/* Severity Breakdown */}
        <div className="flex gap-4 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm font-medium text-gray-700">
              Critical: <span className="font-bold text-red-600">{criticalCount}</span>
            </span>
            <span className="text-xs text-gray-500">(10+ days over limit)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm font-medium text-gray-700">
              Moderate: <span className="font-bold text-orange-600">{moderateCount}</span>
            </span>
            <span className="text-xs text-gray-500">(5-10 days over limit)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm font-medium text-gray-700">
              Warning: <span className="font-bold text-yellow-600">{warningCount}</span>
            </span>
            <span className="text-xs text-gray-500">(0-5 days over limit)</span>
          </div>
        </div>

        {/* Alert Type Breakdown */}
        <div className="flex gap-6">
          <div className="text-sm">
            <span className="font-medium text-gray-700">🔴 Screening Delays:</span>{' '}
            <span className="font-bold text-gray-900">{screeningDelayCount}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">⏱️ TTH Violations:</span>{' '}
            <span className="font-bold text-gray-900">{tthCount}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">📅 TTF Violations:</span>{' '}
            <span className="font-bold text-gray-900">{ttfCount}</span>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div>
        {alerts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-green-500 mb-3">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alerts</h3>
            <p className="text-gray-600">
              All candidates are within the Screening (2 days), TTH (30 days), and TTF (60 days) limits.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <AlertCard key={index} alert={alert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
