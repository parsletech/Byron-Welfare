import { useQuery, useQueryClient } from "@tanstack/react-query"
import Papa from "papaparse"
import { SPREADSHEET_ID, csvUrl, SHEETS } from "../config/sheets"
import { parseSummary } from "../utils/parseSummary"
import { parseMembers, buildMockMembers } from "../utils/parseMembers"

const MOCK_SUMMARY = {
  sharesCapital:  1087904,
  welfareBalance: 158000,
  revenue:        37500,
  loansIssued:    556500,
  mmfSavings:     450000,
  totalValue:     1283404,
}

async function fetchSheet(sheetName) {
  const url = csvUrl(sheetName)
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch sheet: " + sheetName)
  const text = await res.text()
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      skipEmptyLines: false,
      complete: (result) => resolve(result.data),
      error: (err) => reject(err),
    })
  })
}

async function fetchAllSheets() {
  const [summaryRaw, groupRaw] = await Promise.all([
    fetchSheet(SHEETS.SUMMARY).catch(() => []),
    fetchSheet(SHEETS.GROUP),
  ])
  const summary = parseSummary(summaryRaw, groupRaw)
  const members = parseMembers(groupRaw)
  return { summary, members }
}

export function useSheetData() {
  const queryClient = useQueryClient()
  const isLive = Boolean(SPREADSHEET_ID)

  const query = useQuery({
    queryKey: ["sheetData"],
    queryFn: isLive ? fetchAllSheets : () => ({ summary: MOCK_SUMMARY, members: buildMockMembers() }),
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 2,
  })

  const forceSync = () => queryClient.invalidateQueries({ queryKey: ["sheetData"] })

  return {
    summary:    query.data?.summary || MOCK_SUMMARY,
    members:    query.data?.members || buildMockMembers(),
    isLoading:  query.isLoading,
    isFetching: query.isFetching,
    isError:    query.isError,
    lastSync:   query.dataUpdatedAt ? new Date(query.dataUpdatedAt) : null,
    isLive,
    forceSync,
  }
}