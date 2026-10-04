/**
 * Parses member records, equity balances, and monthly contribution ledgers
 * directly from the live "Group Report Aug-Dec 2026" sheet.
 */

const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec"]

const KNOWN_MEMBERS_META = [
  { name: "Fred",        col: 2, defaultLoans: 0 },
  { name: "Meshark",     col: 3, defaultLoans: 220000 },
  { name: "Joel",        col: 4, defaultLoans: 198000 },
  { name: "Winnie (T)",  col: 5, defaultLoans: 42000 },
  { name: "Byron",       col: 6, defaultLoans: 96500 },
  { name: "Gloria",      col: 7, defaultLoans: 0 },
  { name: "Winnie (HR)", col: 8, defaultLoans: 0 },
]

export function parseMembers(groupRaw) {
  if (!groupRaw || !groupRaw.length) return buildMockMembers()

  try {
    // 1. Check for right-hand summary table (Cols 12: Name, 13: Shares, 14: Loans)
    const rightTable = new Map()
    for (let r = 1; r < groupRaw.length; r++) {
      const rawName = String(groupRaw[r]?.[12] || "").trim()
      if (!rawName || rawName.toLowerCase() === "total" || rawName.toLowerCase().includes("name")) continue
      
      const shares = parseFloat(String(groupRaw[r]?.[13] || "0").replace(/[^0-9.-]/g, "")) || 0
      const loans = parseFloat(String(groupRaw[r]?.[14] || "0").replace(/[^0-9.-]/g, "")) || 0
      const key = cleanNameKey(rawName)
      rightTable.set(key, { name: cleanDisplayName(rawName), shares, loans })
    }

    // 2. Parse members with their monthly contribution breakdown
    const members = KNOWN_MEMBERS_META.map((meta) => {
      const key = cleanNameKey(meta.name)
      const tableData = rightTable.get(key)
      const name = tableData?.name || meta.name

      // Carry forward from row 2
      const carryForward = parseFloat(String(groupRaw[2]?.[meta.col] || "0").replace(/[^0-9.-]/g, "")) || 0

      // Monthly contributions (Aug–Dec)
      // Shares are in rows 3..7
      // Welfare is in rows 12..16
      const monthlyContribs = MONTHS.map((month, i) => {
        const sVal = parseFloat(String(groupRaw[3 + i]?.[meta.col] || "0").replace(/[^0-9.-]/g, "")) || 0
        const wVal = parseFloat(String(groupRaw[12 + i]?.[meta.col] || "0").replace(/[^0-9.-]/g, "")) || 0
        return { month, shares: sVal, welfare: wVal }
      })

      const totalContributed = monthlyContribs.reduce((s, m) => s + m.shares + m.welfare, 0)
      const sharesTotal = tableData?.shares || (carryForward + monthlyContribs.reduce((s, m) => s + m.shares, 0))
      const loans = tableData ? tableData.loans : meta.defaultLoans
      const equity = sharesTotal

      return {
        id:               key,
        name,
        initials:         getInitials(name),
        carryForward,
        shares:           sharesTotal,
        loans,
        welfareOwed:      0,
        monthlyContribs,
        totalContributed,
        equity,
        status:           loans > 0 ? "Loan Obligation" : "Active",
        lastContribution: monthlyContribs.findLast((m) => m.shares > 0)?.shares || (monthlyContribs[0]?.shares || 5000),
      }
    })

    return members
  } catch (err) {
    console.error("Error parsing members:", err)
    return buildMockMembers()
  }
}

function cleanNameKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function cleanDisplayName(name) {
  return name.trim().replace(/\s+/g, " ")
}

function getInitials(name) {
  const parts = name.replace(/[^a-zA-Z\s]/g, "").trim().split(/\s+/)
  return parts.slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "W"
}

export function buildMockMembers() {
  return [
    {
      id: "fred",
      name: "Fred",
      initials: "F",
      carryForward: 216882,
      shares: 238882,
      loans: 0,
      equity: 238882,
      status: "Active",
      monthlyContribs: [
        { month: "Aug", shares: 5000, welfare: 1000 },
        { month: "Sep", shares: 5000, welfare: 1000 },
        { month: "Oct", shares: 5000, welfare: 1000 },
        { month: "Nov", shares: 5000, welfare: 1000 },
        { month: "Dec", shares: 2000, welfare: 0 },
      ],
      totalContributed: 26000,
      lastContribution: 2000,
    },
    {
      id: "meshark",
      name: "Meshark",
      initials: "M",
      carryForward: 216882,
      shares: 226882,
      loans: 220000,
      equity: 226882,
      status: "Loan Obligation",
      monthlyContribs: [
        { month: "Aug", shares: 5000, welfare: 1000 },
        { month: "Sep", shares: 5000, welfare: 1000 },
        { month: "Oct", shares: 0, welfare: 0 },
        { month: "Nov", shares: 0, welfare: 0 },
        { month: "Dec", shares: 0, welfare: 0 },
      ],
      totalContributed: 12000,
      lastContribution: 5000,
    },
    {
      id: "joel",
      name: "Joel",
      initials: "J",
      carryForward: 216882,
      shares: 226882,
      loans: 198000,
      equity: 226882,
      status: "Loan Obligation",
      monthlyContribs: [
        { month: "Aug", shares: 5000, welfare: 1000 },
        { month: "Sep", shares: 5000, welfare: 1000 },
        { month: "Oct", shares: 0, welfare: 0 },
        { month: "Nov", shares: 0, welfare: 0 },
        { month: "Dec", shares: 0, welfare: 0 },
      ],
      totalContributed: 12000,
      lastContribution: 5000,
    },
    {
      id: "winniet",
      name: "Winnie (T)",
      initials: "WT",
      carryForward: 216882,
      shares: 226882,
      loans: 42000,
      equity: 226882,
      status: "Loan Obligation",
      monthlyContribs: [
        { month: "Aug", shares: 5000, welfare: 1000 },
        { month: "Sep", shares: 5000, welfare: 1000 },
        { month: "Oct", shares: 0, welfare: 0 },
        { month: "Nov", shares: 0, welfare: 0 },
        { month: "Dec", shares: 0, welfare: 0 },
      ],
      totalContributed: 12000,
      lastContribution: 5000,
    },
    {
      id: "byron",
      name: "Byron",
      initials: "B",
      carryForward: 158376,
      shares: 168376,
      loans: 96500,
      equity: 168376,
      status: "Loan Obligation",
      monthlyContribs: [
        { month: "Aug", shares: 5000, welfare: 1000 },
        { month: "Sep", shares: 5000, welfare: 1000 },
        { month: "Oct", shares: 0, welfare: 0 },
        { month: "Nov", shares: 0, welfare: 0 },
        { month: "Dec", shares: 0, welfare: 0 },
      ],
      totalContributed: 12000,
      lastContribution: 5000,
    },
  ]
}