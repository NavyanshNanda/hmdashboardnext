export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-[#1e293b] mb-2">
          📊 Talent Acquisition Dashboard
        </h1>
        <p className="text-[#64748b] text-lg mb-8">
          Real-time Candidate Analytics & Insights
        </p>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-[#334155] mb-4">
            Project Setup Complete! 🎉
          </h2>
          <p className="text-[#64748b] mb-4">
            Phase 1 is complete. The Next.js project structure is now ready.
          </p>
          <ul className="space-y-2 text-[#475569]">
            <li>✅ Next.js 14 with App Router</li>
            <li>✅ TypeScript configured</li>
            <li>✅ Tailwind CSS ready</li>
            <li>✅ All dependencies defined</li>
            <li>✅ Folder structure prepared</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
