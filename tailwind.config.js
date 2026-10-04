/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter","system-ui","sans-serif"],
        mono: ['"JetBrains Mono"',"ui-monospace","monospace"],
      },
      colors: {
        porcelain: "#F9FAFB",
        chalk:     "#FFFFFF",
        slategray: "#F3F4F6",
        charcoal:  "#111827",
        hairline:  "#E5E7EB",
        obsidian:  "#0A0C0E",
        graphite:  "#14181E",
        titanium:  "#F8FAFC",
        accent:    "#10B981",
      },
      animation: {
        "pulse-dot": "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 1.5s linear infinite",
        "fade-in":   "fadeIn 0.4s ease-out",
        "slide-up":  "slideUp 0.35s ease-out",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
}