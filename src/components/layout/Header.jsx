import { TrendingUp } from "lucide-react"
import ThemeToggle from "../ui/ThemeToggle"
import CurrencyToggle from "../ui/CurrencyToggle"
import ForceSyncButton from "../ui/ForceSyncButton"
import SyncBadge from "../dashboard/SyncBadge"

export default function Header({ theme, onToggleTheme, currency, onChangeCurrency, syncProps }) {
  return (
    <header className="sticky top-0 z-40 bg-chalk/95 dark:bg-obsidian/95 backdrop-blur-md hairline-bottom">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-obsidian dark:bg-accent/20 rounded-lg">
              <TrendingUp size={14} className="text-accent" />
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-charcoal dark:text-titanium">Welfare Capital</span>
              <span className="font-mono text-[10px] sm:text-xs font-semibold text-accent tracking-widest">// OS</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <SyncBadge {...syncProps} />
          </div>
          <div className="flex items-center gap-1">
            <ForceSyncButton onClick={syncProps.forceSync} isFetching={syncProps.isFetching} />
            <div className="w-px h-4 sm:h-5 bg-hairline dark:bg-white/10 mx-0.5 sm:mx-1" />
            <CurrencyToggle currency={currency} onChange={onChangeCurrency} />
            <ThemeToggle isDark={theme === "dark"} onToggle={onToggleTheme} />
          </div>
        </div>
        <div className="md:hidden pb-2 pt-0.5 flex items-center justify-between text-xs border-t border-hairline/40 dark:border-white/5">
          <SyncBadge {...syncProps} />
        </div>
      </div>
    </header>
  )
}