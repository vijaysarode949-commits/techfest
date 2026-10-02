'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionLabel } from '@/components/experience/reveal'

const STATS = [
  { value: 175000, suffix: '+', label: 'Visitors' },
  { value: 65000, suffix: '+', label: 'Participants' },
  { value: 30, suffix: '+', label: 'Countries' },
  { value: 50, suffix: '+', label: 'Events' },
  { value: 40, suffix: '+', label: 'Workshops' },
  { value: 3000, suffix: '+', label: 'Campus ambassadors' },
]

const fmt = new Intl.NumberFormat('en-IN')

export function Stats() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('[data-stat]').forEach((el) => {
        const target = Number(el.dataset.value)
        const state = { v: 0 }
        gsap.to(state, {
          v: target,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = fmt.format(Math.round(state.v))
          },
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
      gsap.from('[data-stat-row]', {
        xPercent: (i) => (i % 2 ? 8 : -8),
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="stats" aria-labelledby="stats-title" className="relative px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="11">By the numbers</SectionLabel>
        <h2 id="stats-title" className="sr-only">Techfest by the numbers</h2>
        <dl className="mt-12 flex flex-col">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-stat-row
              className="group flex flex-col gap-2 border-t border-foreground/10 py-6 transition-colors duration-500 last:border-b hover:border-signal/40 md:flex-row md:items-baseline md:justify-between md:py-8"
            >
              <dt className="order-2 flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase transition-colors group-hover:text-signal md:order-1">
                <span className="text-foreground/30">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </dt>
              <dd className="order-1 text-6xl leading-none font-bold tracking-tighter tabular-nums transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-4 md:order-2 md:text-8xl">
                <span data-stat data-value={s.value}>
                  {fmt.format(s.value)}
                </span>
                <span className="text-signal">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
