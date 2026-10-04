const AVATAR_COLORS = [
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400",
  "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-400",
]

function hashName(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0
  return Math.abs(h)
}

export default function Avatar({ name, initials, size = "md" }) {
  const colorClass = AVATAR_COLORS[hashName(name) % AVATAR_COLORS.length]
  const sizeClass = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" }[size]
  return (
    <div className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center font-bold font-mono shrink-0`}>
      {initials}
    </div>
  )
}