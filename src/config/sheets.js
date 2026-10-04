// ============================================================
//  WELFARE CAPITAL OS — Google Sheets Configuration
//  Connected to live spreadsheet:
//  https://docs.google.com/spreadsheets/d/12zbV25zyB8wSPYYNIShkKbfFfRTDFXYn
// ============================================================

export const SPREADSHEET_ID = "12zbV25zyB8wSPYYNIShkKbfFfRTDFXYn"

// Sheet / tab names (must match exactly as they appear in Google Sheets)
export const SHEETS = {
  SUMMARY:  "Summary",
  GROUP:    "Group Report Aug-Dec 2026",
  WELFARE:  "Welfare - July 2026",
}

// CSV feed URL builder using Google Visualization API
export const csvUrl = (sheetName) =>
  `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`

// Fixed KES → USD exchange rate (1 USD = 130 KES)
export const KES_TO_USD = 1 / 130