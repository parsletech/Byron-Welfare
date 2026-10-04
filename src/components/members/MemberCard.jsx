import Avatar from "../ui/Avatar"
import { formatCurrency } from "../../utils/currency"
import { ChevronRight } from "lucide-react"

const statusColors = {
  "Active":           "pill-active",
  "Loan Obligation":  "pill bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
}

export default function MemberCard({ member, currency, onView }) {
  return (
    <button
      onClick={() => onView(member)}
      className="card w-full text-left p-4 hover:shadow-md dark:hover:shadow-black/30 transition-all duration-200 active:scale-[0.99] group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar name={member.name} initials={member.initials} />
          <div>
            <p className="font-semibold text-sm text-charcoal dark:text-titanium">{member.name}</p>
            <span className={`${statusColors[member.status] || statusColors["Active"]} mt-1 text-xs`}>
              {member.status}
            </span>
          </div>
        </div>
        <ChevronRight size={16} className="text-charcoal/20 dark:text-titanium/20 group-hover:text-accent transition-colors mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 hairline-top">
        <div>
          <p className="text-xs text-charcoal/40 dark:text-titanium/30 mb-0.5">Carry Forward</p>
          <p className="font-mono font-semibold text-sm tabular text-charcoal dark:text-titanium">{formatCurrency(member.carryForward, currency)}</p>
        </div>
        <div>
          <p className="text-xs text-charcoal/40 dark:text-titanium/30 mb-0.5">Total Equity</p>
          <p className="font-mono font-bold text-sm tabular text-accent">{formatCurrency(member.equity, currency)}</p>
        </div>
        {member.loans > 0 && (
          <div className="col-span-2">
            <p className="text-xs text-charcoal/40 dark:text-titanium/30 mb-0.5">Outstanding Loan</p>
            <p className="font-mono font-semibold text-sm tabular text-amber-500">{formatCurrency(member.loans, currency)}</p>
          </div>
        )}
      </div>
    </button>
  )
}