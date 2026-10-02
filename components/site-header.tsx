'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useExperience } from '@/components/experience/experience-provider'

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#competitions', label: 'Competitions' },
  { href: '#workshops', label: 'Workshops' },
  { href: '#international', label: 'Lectures' },
  { href: '#timeline', label: 'Timeline' },
]

export function SiteHeader() {
  const { scrollTo, ready } = useExperience()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(href)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]',
        ready ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" onClick={go('#top')} className="flex items-center gap-3" aria-label="Techfest home">
          <span className="flex size-9 items-center justify-center rounded-full border border-foreground/15 font-mono text-[10px] font-semibold tracking-widest">
            TF
          </span>
          <span className="hidden font-mono text-[11px] tracking-[0.3em] uppercase sm:inline">
            Techfest<span className="text-signal">/30</span>
          </span>
        </a>

        <nav
          aria-label="Primary"
          className={cn(
            'hidden items-center gap-1 rounded-full border px-2 py-1.5 transition-colors duration-500 md:flex',
            scrolled ? 'border-foreground/10 bg-background/60 backdrop-blur-xl' : 'border-transparent',
          )}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={go(item.href)}
              className="rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            onClick={go('#cta')}
            className="hidden h-10 items-center rounded-full bg-foreground px-5 font-mono text-[11px] font-medium tracking-[0.2em] text-background uppercase transition-colors hover:bg-signal sm:inline-flex"
          >
            Register
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-10 flex-col items-center justify-center gap-1.5 rounded-full border border-foreground/15 bg-background/40 backdrop-blur md:hidden"
          >
            <span className={cn('h-px w-4 bg-foreground transition-transform duration-300', open && 'translate-y-[3.5px] rotate-45')} />
            <span className={cn('h-px w-4 bg-foreground transition-transform duration-300', open && '-translate-y-[3.5px] -rotate-45')} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 -z-10 flex flex-col justify-end bg-background/95 px-5 pb-12 backdrop-blur-2xl transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden',
          open ? '[clip-path:circle(150%_at_100%_0%)]' : 'pointer-events-none [clip-path:circle(0%_at_100%_0%)]',
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {[...NAV, { href: '#cta', label: 'Register' }].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={go(item.href)}
              tabIndex={open ? 0 : -1}
              className="flex items-baseline gap-4 border-b border-foreground/10 py-3 text-4xl font-medium tracking-tight"
            >
              <span className="font-mono text-xs text-signal">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
