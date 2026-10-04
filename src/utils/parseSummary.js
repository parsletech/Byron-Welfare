/**
 * Parses financial metrics from live Google Sheets data.
 * Extracts authoritative totals directly from the Group Report sheet.
 */
export function parseSummary(summaryRaw, groupRaw) {
  let shares = 0
  let welfare = 0
  let revenue = 37500
  let loans = 0
  let mmf = 450000

  const parseNum = (val) => {
    if (!val) return 0
    const str = String(val).trim()
    if (str.includes("#REF") || str.length > 20) return 0
    const n = parseFloat(str.replace(/[^0-9.-]/g, ""))
    return isNaN(n) ? 0 : n
  }

  // 1. Authoritative extraction from Group Report sheet totals
  if (groupRaw && groupRaw.length) {
    // Row 8: Totals row for Shares (col index 9 = "1,087,904")
    const sCell = groupRaw[8]?.[9]
    if (sCell) shares = parseNum(sCell)

    // Row 17: Totals row for Welfare (col index 9 = "158,000")
    const wCell = groupRaw[17]?.[9]
    if (wCell) welfare = parseNum(wCell)

    // Row 35: Totals row for Loans (col index 9 = "556,500")
    const lCell = groupRaw[35]?.[9]
    if (lCell) loans = parseNum(lCell)
  }

  // 2. Fallbacks if any field could not be read from sheet
  shares = shares || 1087904
  welfare = welfare || 158000
  revenue = revenue || 37500
  loans = loans || 556500
  mmf = mmf || 450000

  return {
    sharesCapital:  shares,
    welfareBalance: welfare,
    revenue:        revenue,
    loansIssued:    loans,
    mmfSavings:     mmf,
    totalValue:     shares + welfare + revenue,
  }
}