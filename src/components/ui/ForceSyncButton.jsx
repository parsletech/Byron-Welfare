import { RefreshCw } from "lucide-react"

export default function ForceSyncButton({ onClick, isFetching }) {
  return (
    <button
      onClick={onClick}
      disabled={isFetching}
      className="btn-ghost gap-1.5 text-xs disabled:opacity-50"
      title="Force sync from Google Sheets"
    >
      <RefreshCw size={14} className={isFetching ? "animate-spin-slow text-accent" : "text-charcoal/50 dark:text-titanium/40"} />
      <span className="hidden sm:inline">{isFetching ? "Syncing..." : "Force Sync"}</span>
    </button>
  )
}