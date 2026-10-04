export default function CurrencyToggle({ currency, onChange }) {
  return (
    <div className="flex items-center gap-0.5 bg-slategray dark:bg-white/5 border border-hairline dark:border-white/10 rounded-lg p-0.5">
      {["KES", "USD"].map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all duration-150 ${
            currency === c
              ? "bg-chalk dark:bg-graphite text-charcoal dark:text-titanium shadow-sm"
              : "text-charcoal/50 dark:text-titanium/40 hover:text-charcoal dark:hover:text-titanium"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}