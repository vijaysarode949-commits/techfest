const COLUMNS = [
  { title: 'Festival', links: ['Competitions', 'Workshops', 'Lectures', 'Exhibitions'] },
  { title: 'Get involved', links: ['Campus Ambassador', 'Sponsor us', 'Volunteer', 'Media'] },
  { title: 'Follow', links: ['Instagram', 'LinkedIn', 'YouTube', 'X'] },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 px-5 pt-20 pb-8 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-12">
          <address className="flex flex-col gap-2 text-sm text-muted-foreground not-italic md:col-span-4">
            <span className="font-mono text-[11px] tracking-[0.3em] text-foreground uppercase">Techfest Office</span>
            <span>Student Activity Centre, IIT Bombay</span>
            <span>Powai, Mumbai 400076, India</span>
            <a href="mailto:hello@techfest.org" className="mt-2 text-foreground underline-offset-4 hover:text-signal hover:underline">
              hello@techfest.org
            </a>
          </address>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-2">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-signal">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p aria-hidden="true" className="text-outline mt-20 text-center text-[22vw] leading-[0.8] font-bold tracking-tighter select-none">
          TECHFEST
        </p>

        <div className="mt-8 flex flex-col gap-2 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase md:flex-row md:justify-between">
          <span>&copy; 2026 Techfest, IIT Bombay</span>
          <span>Edition XXX &middot; Aetherial Renaissance</span>
        </div>
      </div>
    </footer>
  )
}
