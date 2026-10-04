import { useState, useEffect } from "react"

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light"
    return localStorage.getItem("wcos-theme") || "light"
  })

  useEffect(() => {
    const root = document.documentElement
    const metaThemeColor = document.getElementById("theme-color-meta")

    if (theme === "dark") {
      root.classList.add("dark")
      document.body.style.backgroundColor = "#0A0C0E"
      document.body.style.color = "#F8FAFC"
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#0A0C0E")
    } else {
      root.classList.remove("dark")
      document.body.style.backgroundColor = "#F9FAFB"
      document.body.style.color = "#111827"
      if (metaThemeColor) metaThemeColor.setAttribute("content", "#F9FAFB")
    }
    localStorage.setItem("wcos-theme", theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"))
  return { theme, toggle, isDark: theme === "dark" }
}