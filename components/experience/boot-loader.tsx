'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const BOOT_LINES = [
  'INIT  aetherial.core v30.0',
  'LINK  neural mesh ........ ok',
  'SYNC  powai.node/400076 .. ok',
  'LOAD  competitions[50+] .. ok',
  'CHARGE energy field ...... 100%',
  'READY renaissance protocol',
]

export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [lines, setLines] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = { p: 0 }
    const tl = gsap.timeline()

    tl.to(state, {
      p: 100,
      duration: reduced ? 0.2 : 2.3,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(state.p))
        setLines(Math.min(BOOT_LINES.length, Math.floor((state.p / 100) * (BOOT_LINES.length + 0.5))))
      },
    })
      .to('[data-boot-content]', { opacity: 0, y: -12, duration: 0.35, ease: 'power2.in' })
      .to(rootRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: reduced ? 0.1 : 0.9,
        ease: 'expo.inOut',
        onStart: onComplete,
        onComplete: () => setDone(true),
      })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  if (done) return null

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label={`Loading Techfest, ${progress} percent`}
      className="fixed inset-0 z-[100] flex items-end bg-background p-6 md:p-10"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div data-boot-content className="relative flex w-full flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <ul className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:text-xs">
          {BOOT_LINES.slice(0, lines).map((line, i) => (
            <li key={line} className={i === lines - 1 ? 'text-signal' : undefined}>
              <span className="mr-3 text-foreground/30">{String(i + 1).padStart(2, '0')}</span>
              {line}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Techfest &mdash; 30th Edition
          </p>
          <p className="text-[22vw] leading-[0.8] font-bold tracking-tighter tabular-nums md:text-[11rem]">
            {String(progress).padStart(3, '0')}
          </p>
          <div className="h-px w-full bg-border md:w-[28rem]">
            <div className="h-px bg-signal shadow-[0_0_12px_var(--signal)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
