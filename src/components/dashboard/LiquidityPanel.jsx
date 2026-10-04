import { formatCurrency } from "../../utils/currency"

export default function LiquidityPanel({ summary, currency }) {
  if (!summary) return null
  const total = summary.welfareBalance + summary.mmfSavings + summary.loansIssued
  const segments = [
    { label: "Welfare / Bank Cash", value: summary.welfareBalance, pct: Math.round((summary.welfareBalance / total) * 100), color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400", desc: "Liquid emergency reserve" },
    { label: "MMF Yield Fund",      value: summary.mmfSavings,     pct: Math.round((summary.mmfSavings     / total) * 100), color: "bg-blue-500",    textColor: "text-blue-600 dark:text-blue-400",    desc: "Money Market Fund" },
    { label: "Member Loan Pool",    value: summary.loansIssued,    pct: Math.round((summary.loansIssued    / total) * 100), color: "bg-violet-500",  textColor: "text-violet-600 dark:text-violet-400",desc: "Active loans deployed" },
  ]

  return (
    <section className="mb-10 animate-slide-up">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-charcoal dark:text-titanium tracking-tight">Liquidity & Capital Allocation</h2>
          <p className="text-xs text-charcoal/40 dark:text-titanium/30 mt-0.5">Total managed capital: {formatCurrency(total, currency)}</p>
        </div>
      </div>
      <div className="card p-5 mb-4">
        <div className="flex rounded-lg overflow-hidden h-5 mb-5">
          {segments.map((seg) => (
            <div key={seg.label} className={`${seg.color} opacity-90 transition-all duration-700`} style={{ width: `${seg.pct}%` }} title={`${seg.label}: ${seg.pct}%`} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-start gap-3">
              <div className={`w-2.5 h-2.5 rounded-sm ${seg.color} mt-1 shrink-0`} />
              <div>
                <p className={`text-xs font-semibold ${seg.textColor}`}>{seg.label}</p>
                <p className="font-mono font-bold text-charcoal dark:text-titanium text-sm tabular mt-0.5">{formatCurrency(seg.value, currency)}</p>
                <p className="text-xs text-charcoal/40 dark:text-titanium/30 mt-0.5">{seg.pct}% · {seg.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}