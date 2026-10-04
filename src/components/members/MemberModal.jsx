import { useEffect, useRef } from "react"
import { X, TrendingUp, CreditCard, Calendar } from "lucide-react"
import Avatar from "../ui/Avatar"
import { formatCurrency } from "../../utils/currency"

export default function MemberModal({ member, currency, onClose }) {
  const overlayRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    closeRef.current?.focus()
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose])

  if (!member) return null

  const statusColors = {
    "Active":          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
    "Loan Obligation": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog" aria-modal="true" aria-label={`${member.name} Statement`}
    >
      <div className="card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl rounded-b-none sm:rounded-b-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between p-5 hairline-bottom">
          <div className="flex items-center gap-3">
            <Avatar name={member.name} initials={member.initials} size="lg" />
            <div>
              <h2 className="font-bold text-charcoal dark:text-titanium">{member.name}</h2>
              <span className={`pill text-xs mt-1 ${statusColors[member.status] || statusColors["Active"]}`}>{member.status}</span>
            </div>
          </div>
          <button ref={closeRef} onClick={onClose} className="btn-ghost p-1.5 rounded-lg" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 bg-accent/5 hairline-bottom">
          <p className="text-xs font-medium tracking-widest uppercase text-charcoal/40 dark:text-titanium/30 mb-1">Total Individual Equity</p>
          <p className="font-mono font-black text-3xl tabular text-accent">{formatCurrency(member.equity, currency)}</p>
        </div>

        <div className="grid grid-cols-3 hairline-bottom">
          {[
            { icon: TrendingUp, label: "Carry Forward",     value: member.carryForward },
            { icon: CreditCard, label: "Loan Balance",      value: member.loans },
            { icon: Calendar,   label: "Last Contribution", value: member.lastContribution },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-4 flex flex-col gap-1 border-r border-hairline dark:border-white/10 last:border-r-0">
              <div className="flex items-center gap-1 text-charcoal/40 dark:text-titanium/30">
                <Icon size={12} />
                <span className="text-xs">{label}</span>
              </div>
              <p className={`font-mono font-bold text-sm tabular ${label === "Loan Balance" && value > 0 ? "text-amber-500" : "text-charcoal dark:text-titanium"}`}>
                {formatCurrency(value, currency)}
              </p>
            </div>
          ))}
        </div>

        <div className="p-5">
          <p className="text-xs font-medium tracking-widest uppercase text-charcoal/40 dark:text-titanium/30 mb-3">Monthly Contributions · Aug–Dec 2026</p>
          <div className="space-y-2">
            {member.monthlyContribs.map((m) => (
              <div key={m.month} className="flex items-center justify-between py-2 hairline-bottom last:border-0">
                <span className="text-sm font-medium text-charcoal/70 dark:text-titanium/60 w-10">{m.month}</span>
                <div className="flex items-center gap-4 text-right">
                  {[["Shares", m.shares], ["Welfare", m.welfare], ["Total", m.shares + m.welfare]].map(([lbl, val]) => (
                    <div key={lbl}>
                      <p className="text-xs text-charcoal/40 dark:text-titanium/30">{lbl}</p>
                      <p className={`font-mono text-sm font-${lbl === "Total" ? "bold" : "semibold"} tabular ${lbl === "Total" ? "text-accent" : "text-charcoal dark:text-titanium"}`}>
                        {formatCurrency(val, currency)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 hairline-top flex justify-between">
            <span className="text-xs font-medium text-charcoal/50 dark:text-titanium/40">Period Total</span>
            <span className="font-mono font-bold text-sm tabular text-charcoal dark:text-titanium">{formatCurrency(member.totalContributed, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}