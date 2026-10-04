# Welfare Capital OS

A production-ready financial tracking dashboard — built with React + Vite + Tailwind CSS.



## Quick Start

### Prerequisites
Install **Node.js v18+** from https://nodejs.org (LTS version recommended).

After installing, restart your terminal/PowerShell, then:



## Connect Your Google Sheet


**Important:** Make sure your Google Sheet is shared with:
- "Anyone with the link" → Viewer access

The app fetches 3 tabs via public CSV:
| Tab | Purpose |
|-----|---------|
| `Summary` | Key financial metrics |
| `Group Report Aug-Dec 2026` | Monthly member contributions |
| `Welfare - June / July 2026` | Historical balances |

Without a Spreadsheet ID, the app runs fully with accurate mock data.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 (dark mode via `class`) |
| Data Fetching | TanStack Query (auto-polls every 60s) |
| CSV Parsing | Papa Parse |
| Toasts | react-hot-toast |
| Icons | lucide-react |
| Fonts | Inter + JetBrains Mono |

---

## Features

- **Live Google Sheets sync** — auto-refresh every 60s with manual Force Sync
- **Dark / Light theme** — persisted in localStorage
- **KES / USD currency toggle** — fixed 1 USD = 130 KES
- **Animated portfolio hero counter** — count-up on load
- **7-member directory** — search, filter, and full statement modal
- **Liquidity allocation panel** — stacked bar: Bank / MMF / Loans
- **Fully responsive** — mobile card grid + desktop data table
- **Accessible** — keyboard nav, ARIA labels, focus trapping on modals

---

&copy; Parsletech Solutions. All rights reserved.
