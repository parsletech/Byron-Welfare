import React from "react"
import { AlertTriangle, RefreshCw, Trash2, ChevronDown, ChevronUp, Copy, Check } from "lucide-react"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      copied: false,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Welfare Capital OS — Uncaught Error Boundary:", error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch {
      // ignore
    }
    window.location.reload()
  }

  handleCopy = () => {
    const text = `Error: ${this.state.error?.toString()}\n\nStack:\n${this.state.error?.stack || ""}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack || ""}`
    navigator.clipboard.writeText(text).then(() => {
      this.setState({ copied: true })
      setTimeout(() => this.setState({ copied: false }), 2000)
    })
  }

  render() {
    if (this.state.hasError) {
      const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark")

      return (
        <div className="min-h-screen bg-chalk dark:bg-obsidian text-charcoal dark:text-titanium flex items-center justify-center p-4 sm:p-6 transition-colors duration-200">
          <div className="card w-full max-w-2xl p-6 sm:p-8 border border-hairline dark:border-white/10 shadow-xl dark:shadow-black/60 rounded-2xl animate-fade-in">
            {/* Header Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-rose-500 font-semibold">
                System // Runtime Interrupted
              </span>
            </div>

            {/* Error Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} className="text-rose-500" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-charcoal dark:text-titanium">
                  An unexpected error occurred
                </h1>
                <p className="text-xs sm:text-sm text-charcoal/60 dark:text-titanium/50 mt-1 leading-relaxed">
                  The dashboard caught an unhandled interface exception. Your connected Google Sheet and cloud ledger remain safe and unmodified.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 my-6 pt-6 hairline-top">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary flex items-center gap-2 text-xs py-2.5 px-4 shadow-sm"
              >
                <RefreshCw size={14} />
                Reload Application
              </button>
              <button
                onClick={this.handleReset}
                className="btn-ghost flex items-center gap-2 text-xs py-2.5 px-4 text-charcoal/70 dark:text-titanium/60 hover:text-rose-500 dark:hover:text-rose-400"
              >
                <Trash2 size={14} />
                Clear Cache & Reload
              </button>
              <button
                onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                className="btn-ghost flex items-center gap-1.5 text-xs py-2.5 px-3 ml-auto text-charcoal/50 dark:text-titanium/40"
              >
                <span>Diagnostics</span>
                {this.state.showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {/* Collapsible Diagnostics */}
            {this.state.showDetails && (
              <div className="mt-4 pt-4 hairline-top animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-charcoal/40 dark:text-titanium/30">
                    Exception Stack Trace
                  </p>
                  <button
                    onClick={this.handleCopy}
                    className="flex items-center gap-1 text-[11px] font-mono text-accent hover:underline"
                  >
                    {this.state.copied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{this.state.copied ? "Copied" : "Copy Log"}</span>
                  </button>
                </div>
                <pre className="p-3.5 rounded-lg bg-slategray dark:bg-black/50 border border-hairline dark:border-white/5 font-mono text-[11px] text-charcoal/80 dark:text-titanium/70 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-52">
                  {this.state.error?.toString()}
                  {"\n\n"}
                  {this.state.errorInfo?.componentStack || this.state.error?.stack || "No additional stack trace available."}
                </pre>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}