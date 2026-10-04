import { TrendingUp } from "lucide-react"
import ThemeToggle from "../ui/ThemeToggle"
import CurrencyToggle from "../ui/CurrencyToggle"
import ForceSyncButton from "../ui/ForceSyncButton"
import SyncBadge from "../dashboard/SyncBadge"

export default function Header({ theme, onToggleTheme, currency, onChangeCurrency, syncProps }) {
  return (
    <header className="sticky top-0 z-40 bg-chalk/90 dark:bg-obsidian/90 backdrop-blur-md hairline-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-obsidian dark:bg-accent/20 rounded-lg">
              <TrendingUp size={15} className="text-accent" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-sm tracking-widest uppercase text-charcoal dark:text-titanium">Welfare Capital</span>
              <span className="font-mono text-xs font-semibold text-accent tracking-widest">// OS</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <SyncBadge {...syncProps} />
          </div>
          <div className="flex items-center gap-1">
            <ForceSyncButton onClick={syncProps.forceSync} isFetching={syncProps.isFetching} />
            <div className="w-px h-5 bg-hairline dark:bg-white/10 mx-1" />
            <CurrencyToggle currency={currency} onChange={onChangeCurrency} />
            <ThemeToggle isDark={theme === "dark"} onToggle={onToggleTheme} />
          </div>
        </div>
        <div className="sm:hidden pb-2">
          <SyncBadge {...syncProps} />
        </div>
      </div>
    </header>
  )
}