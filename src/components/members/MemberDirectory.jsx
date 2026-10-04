import { useState, useMemo } from "react"
import { Search, Users } from "lucide-react"
import MemberCard from "./MemberCard"
import MemberTable from "./MemberTable"
import MemberModal from "./MemberModal"

const FILTERS = ["All", "Active", "Loan Obligation"]

export default function MemberDirectory({ members, currency, isLoading }) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    let list = members || []
    if (filter !== "All") list = list.filter((m) => m.status === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((m) => m.name.toLowerCase().includes(q))
    }
    return list
  }, [members, filter, search])

  return (
    <section className="mb-10 animate-slide-up">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-charcoal dark:text-titanium tracking-tight flex items-center gap-2">
            <Users size={16} className="text-accent" />
            Member Directory & Contribution Ledger
          </h2>
          <p className="text-xs text-charcoal/40 dark:text-titanium/30 mt-0.5">{members?.length || 0} members · Click any member to view full statement</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30 dark:text-titanium/30" />
          <input
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-chalk dark:bg-graphite border border-hairline dark:border-white/10 rounded-lg text-charcoal dark:text-titanium placeholder:text-charcoal/30 dark:placeholder:text-titanium/30 focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                filter === f
                  ? "bg-accent/10 text-accent border-accent/30"
                  : "bg-slategray dark:bg-white/5 text-charcoal/60 dark:text-titanium/50 border-hairline dark:border-white/10 hover:border-accent/30"
              }`}
            >
              {f}
              {f !== "All" && <span className="ml-1 font-mono text-[10px] opacity-60">{(members||[]).filter((m) => m.status === f).length}</span>}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="shimmer w-10 h-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="shimmer h-3 w-28 rounded" />
                  <div className="shimmer h-3 w-16 rounded" />
                </div>
              </div>
              <div className="shimmer h-px w-full rounded" />
              <div className="grid grid-cols-2 gap-3">
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="card-subtle p-10 text-center">
          <p className="text-charcoal/40 dark:text-titanium/30 text-sm">No members match your search.</p>
        </div>
      )}

      {!isLoading && filtered.length > 0 && (
        <>
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((m) => <MemberCard key={m.id} member={m} currency={currency} onView={setSelected} />)}
          </div>
          <div className="hidden md:block">
            <MemberTable members={filtered} currency={currency} onView={setSelected} />
          </div>
        </>
      )}

      {selected && <MemberModal member={selected} currency={currency} onClose={() => setSelected(null)} />}
    </section>
  )
}