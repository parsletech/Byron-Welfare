import Avatar from "../ui/Avatar"
import { formatCurrency } from "../../utils/currency"
import { ChevronRight } from "lucide-react"

const statusColors = {
  "Active":          "pill-active",
  "Loan Obligation": "pill bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
}

export default function MemberTable({ members, currency, onView }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="hairline-bottom bg-slategray dark:bg-white/5">
              {["Member","Status","Carry Forward","Last Contribution","Total Equity","Loan Balance",""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-widest uppercase text-charcoal/40 dark:text-titanium/30 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member, i) => (
              <tr
                key={member.id}
                className={`hairline-bottom last:border-0 hover:bg-slategray dark:hover:bg-white/5 transition-colors duration-100 cursor-pointer group ${i % 2 === 0 ? "" : "bg-slategray/40 dark:bg-white/[0.02]"}`}
                onClick={() => onView(member)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} initials={member.initials} size="sm" />
                    <span className="font-medium text-charcoal dark:text-titanium">{member.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`${statusColors[member.status] || statusColors["Active"]} text-xs`}>{member.status}</span>
                </td>
                <td className="px-4 py-3"><span className="font-mono tabular text-charcoal/70 dark:text-titanium/60">{formatCurrency(member.carryForward, currency)}</span></td>
                <td className="px-4 py-3"><span className="font-mono tabular text-charcoal/70 dark:text-titanium/60">{formatCurrency(member.lastContribution, currency)}</span></td>
                <td className="px-4 py-3"><span className="font-mono font-bold tabular text-accent">{formatCurrency(member.equity, currency)}</span></td>
                <td className="px-4 py-3">
                  <span className={`font-mono tabular text-sm ${member.loans > 0 ? "text-amber-500 font-semibold" : "text-charcoal/30 dark:text-titanium/20"}`}>
                    {member.loans > 0 ? formatCurrency(member.loans, currency) : "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ChevronRight size={15} className="text-charcoal/20 dark:text-titanium/20 group-hover:text-accent transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="hairline-top bg-slategray dark:bg-white/5">
              <td colSpan={4} className="px-4 py-3 text-xs font-semibold text-charcoal/50 dark:text-titanium/40 uppercase tracking-widest">Totals</td>
              <td className="px-4 py-3"><span className="font-mono font-black tabular text-accent">{formatCurrency(members.reduce((s,m) => s+m.equity,0), currency)}</span></td>
              <td className="px-4 py-3"><span className="font-mono font-bold tabular text-amber-500">{formatCurrency(members.reduce((s,m) => s+m.loans,0), currency)}</span></td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}