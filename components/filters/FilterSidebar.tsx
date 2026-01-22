'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { DateRangeFilter } from './DateRangeFilter'
import { CheckboxFilter } from './CheckboxFilter'
import { NameSearchFilter } from './NameSearchFilter'
import { useFilters, useCascadingFilters, useFilterActions } from '@/hooks'
import { RefreshCw } from 'lucide-react'

export function FilterSidebar() {
  const filters = useFilters()
  const cascading = useCascadingFilters()
  const actions = useFilterActions()

  const hasActiveFilters = React.useMemo(() => {
    return (
      filters.hmFilter.length > 0 ||
      filters.skillFilter.length > 0 ||
      filters.locationFilter.length > 0 ||
      filters.recruiterFilter.length > 0 ||
      filters.nameSearch.trim() !== ''
    )
  }, [filters])

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">TA Analytics</h1>
        <p className="text-sm text-gray-600">Filter & Analyze Candidates</p>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto">
        {/* Date Range */}
        <div className="border-b border-gray-200">
          <DateRangeFilter
            startDate={filters.dateRange?.[0] || null}
            endDate={filters.dateRange?.[1] || null}
            minDate={filters.minDate}
            maxDate={filters.maxDate}
            onChange={actions.setDateRange}
          />
        </div>

        {/* Name Search */}
        <div className="border-b border-gray-200">
          <NameSearchFilter
            value={filters.nameSearch}
            onChange={actions.setNameSearch}
          />
        </div>

        {/* Hiring Manager */}
        <CheckboxFilter
          title="🏢 Hiring Manager"
          options={cascading.availableHMs}
          selected={filters.hmFilter}
          onToggle={actions.toggleHM}
          onSelectAll={actions.selectAllHM}
          onClearAll={actions.clearAllHM}
        />

        {/* Skill */}
        <CheckboxFilter
          title="💼 Skill"
          options={cascading.availableSkills}
          selected={filters.skillFilter}
          onToggle={actions.toggleSkill}
          onSelectAll={actions.selectAllSkill}
          onClearAll={actions.clearAllSkill}
        />

        {/* Location */}
        <CheckboxFilter
          title="📍 Location"
          options={cascading.availableLocations}
          selected={filters.locationFilter}
          onToggle={actions.toggleLocation}
          onSelectAll={actions.selectAllLocation}
          onClearAll={actions.clearAllLocation}
        />

        {/* Recruiter */}
        <CheckboxFilter
          title="👤 Recruiter"
          options={cascading.availableRecruiters}
          selected={filters.recruiterFilter}
          onToggle={actions.toggleRecruiter}
          onSelectAll={actions.selectAllRecruiter}
          onClearAll={actions.clearAllRecruiter}
        />
      </div>

      {/* Footer - Reset Button */}
      {hasActiveFilters && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <Button
            variant="outline"
            onClick={actions.resetAllFilters}
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
