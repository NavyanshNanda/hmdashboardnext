'use client'

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="h-12 bg-gray-100 rounded"></div>
        <div className="h-12 bg-gray-100 rounded"></div>
        <div className="h-12 bg-gray-100 rounded"></div>
        <div className="h-12 bg-gray-100 rounded"></div>
        <div className="h-12 bg-gray-100 rounded"></div>
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="space-y-3">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded"></div>
        ))}
      </div>
    </div>
  )
}
