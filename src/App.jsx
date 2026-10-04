import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { useTheme } from "./hooks/useTheme"
import { useSheetData } from "./hooks/useSheetData"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import HeroMetrics from "./components/dashboard/HeroMetrics"
import LiquidityPanel from "./components/dashboard/LiquidityPanel"
import MemberDirectory from "./components/members/MemberDirectory"

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const [currency, setCurrency] = useState("KES")
  const { summary, members, isLoading, isFetching, isError, lastSync, isLive, forceSync } = useSheetData()

  const handleForceSync = async () => {
    forceSync()
    toast.promise(
      new Promise((res) => setTimeout(res, 1500)),
      {
        loading: "Syncing with Google Sheets...",
        success: "Synced with Google Sheets just now",
        error: "Sync failed — check your connection",
      },
      {
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          borderRadius: "10px",
          border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E5E7EB",
          background: theme === "dark" ? "#14181E" : "#FFFFFF",
          color: theme === "dark" ? "#F8FAFC" : "#111827",
        },
        success: { icon: "✦" },
        loading: { icon: "⟳" },
      }
    )
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="min-h-screen flex flex-col">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          currency={currency}
          onChangeCurrency={setCurrency}
          syncProps={{ isLive, isFetching, isError, lastSync, forceSync: handleForceSync }}
        />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <HeroMetrics summary={summary} currency={currency} isLoading={isLoading} />
          <LiquidityPanel summary={summary} currency={currency} />
          <MemberDirectory members={members} currency={currency} isLoading={isLoading} />
        </main>
        <Footer />
      </div>
    </>
  )
}