'use client'

import { Button } from '@/components/ui/button'
import { useFilteredData } from '@/hooks'
import { downloadCSV, downloadExcel } from '@/lib/exportUtils'
import { Download, FileSpreadsheet } from 'lucide-react'

export function ExportButtons() {
  const { data, filteredRecords, totalRecords } = useFilteredData()

  const handleCSVExport = () => {
    downloadCSV(data, 'ta_dashboard_export.csv')
  }

  const handleExcelExport = () => {
    downloadExcel(data, 'ta_dashboard_export.csv')
  }

  const isFiltered = filteredRecords < totalRecords

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleCSVExport}
        variant="outline"
        size="sm"
        className="gap-2"
        disabled={data.length === 0}
      >
        <Download className="h-4 w-4" />
        Export CSV
        {isFiltered && (
          <span className="text-xs opacity-75">({data.length})</span>
        )}
      </Button>
      <Button
        onClick={handleExcelExport}
        variant="outline"
        size="sm"
        className="gap-2"
        disabled={data.length === 0}
      >
        <FileSpreadsheet className="h-4 w-4" />
        Export Excel
        {isFiltered && (
          <span className="text-xs opacity-75">({data.length})</span>
        )}
      </Button>
    </div>
  )
}
