import { useEffect, useState } from "react"
import { Coins, Shield, TrendingUp, CreditCard } from "lucide-react"
import StatCard from "./StatCard"
import { formatCurrency } from "../../utils/currency"

function useCountUp(target, duration, enabled) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!enabled || !target) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, enabled])
  return count
}

export default function HeroMetrics({ summary, currency, isLoading }) {
  const animated = useCountUp(summary?.totalValue, 1400, !isLoading)

  const cards = [
    { label: "Total Shares Capital",     value: formatCurrency(summary?.sharesCapital  || 0, currency), sublabel: "Opening share contributions", icon: Coins },
    { label: "Welfare Emergency Fund",   value: formatCurrency(summary?.welfareBalance || 0, currency), sublabel: "Ring-fenced welfare reserve",  icon: Shield },
    { label: "MMF / Treasury Allocation",value: formatCurrency(summary?.mmfSavings     || 0, currency), sublabel: "Money Market Fund savings",    icon: TrendingUp },
    { label: "Active Loans Outstanding", value: formatCurrency(summary?.loansIssued    || 0, currency), sublabel: "Member loan pool deployed",    icon: CreditCard },
  ]

  return (
    <section className="mb-10 animate-slide-up">
      <div className="mb-2">
        <p className="text-xs font-medium tracking-widest uppercase text-charcoal/40 dark:text-titanium/30 mb-2">
          Total Portfolio Value
        </p>
        {isLoading ? (
          <div className="shimmer h-14 w-64 rounded-xl" />
        ) : (
          <h1 className="font-mono font-black text-5xl sm:text-6xl lg:text-7xl tabular text-charcoal dark:text-titanium tracking-tight leading-none">
            {formatCurrency(animated, currency)}
          </h1>
        )}
        <p className="mt-2 text-sm text-charcoal/40 dark:text-titanium/30 font-mono">
          {currency === "KES" ? "Kenyan Shillings" : "US Dollars · 1 USD = 130 KES"} · As of Oct 2026
        </p>
      </div>
      <div className="my-6 hairline-bottom" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} isLoading={isLoading} />
        ))}
      </div>
    </section>
  )
}