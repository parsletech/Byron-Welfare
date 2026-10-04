import { WifiOff } from "lucide-react"

export default function SyncBadge({ isLive, isFetching, lastSync, isError }) {
  const timeAgo = lastSync ? `${Math.round((Date.now() - lastSync.getTime()) / 1000)}s ago` : null

  if (isError) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400">
        <WifiOff size={12} />
        <span className="hidden sm:inline">Sheet unavailable</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className={`w-1.5 h-1.5 rounded-full live-dot ${isFetching ? "bg-amber-400" : "bg-accent"}`} />
      <span className="text-accent font-medium hidden sm:inline">
        {isFetching ? "Syncing..." : isLive ? "Live Sync Active" : "Mock Data"}
      </span>
      {timeAgo && !isFetching && (
        <span className="text-charcoal/30 dark:text-titanium/30 hidden md:inline">· {timeAgo}</span>
      )}
    </div>
  )
}