export default function Footer() {
  return (
    <footer className="mt-16 hairline-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal/40 dark:text-titanium/30 font-mono">
            &copy; Parsletech Solutions. All rights reserved.
          </p>
          <nav className="flex items-center gap-4">
            {["Privacy", "System Status", "Connected Sheet Logs"].map((link) => (
              <button key={link} className="text-xs text-charcoal/40 dark:text-titanium/30 hover:text-accent dark:hover:text-accent transition-colors duration-150">
                {link}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}