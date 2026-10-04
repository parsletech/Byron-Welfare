export default function StatCard({ label, value, sublabel, icon: Icon, trend, isLoading }) {
  if (isLoading) {
    return (
      <div className="card p-5 animate-fade-in">
        <div className="shimmer h-3 w-24 rounded mb-4" />
        <div className="shimmer h-7 w-32 rounded mb-2" />
        <div className="shimmer h-3 w-20 rounded" />
      </div>
    )
  }
  return (
    <div className="card p-5 hover:shadow-md dark:hover:shadow-black/30 transition-shadow duration-200 animate-fade-in group">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium tracking-widest uppercase text-charcoal/50 dark:text-titanium/40">{label}</p>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <Icon size={14} className="text-accent" />
          </div>
        )}
      </div>
      <p className="stat-value text-2xl lg:text-3xl mb-1">{value}</p>
      {sublabel && <p className="text-xs text-charcoal/40 dark:text-titanium/30 font-mono">{sublabel}</p>}
      {trend !== undefined && (
        <div className={`mt-2 text-xs font-mono font-medium ${trend >= 0 ? "text-accent" : "text-rose-500"}`}>
          {trend >= 0 ? "+" : ""}{trend}%
        </div>
      )}
    </div>
  )
}