'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionLabel } from '@/components/experience/reveal'

const TOTAL = 5_000_000
const SPLITS = [
  { label: 'Robotics', share: 0.38 },
  { label: 'AI & Coding', share: 0.24 },
  { label: 'Space & Hardware', share: 0.2 },
  { label: 'Business & Design', share: 0.18 },
]

const inr = new Intl.NumberFormat('en-IN')

export function PrizePool() {
  const ref = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const state = { v: 0 }
      gsap.to(state, {
        v: TOTAL,
        ease: 'power1.out',
        onUpdate: () => {
          if (numberRef.current) numberRef.current.textContent = inr.format(Math.round(state.v / 1000) * 1000)
        },
        scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'center 50%', scrub: 0.5 },
      })
      gsap.fromTo(
        '[data-split-bar]',
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.1, ease: 'expo.out', duration: 1.4, scrollTrigger: { trigger: '[data-splits]', start: 'top 85%' } },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="prizes" aria-labelledby="prize-title" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 size-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(94,231,255,0.12),transparent,rgba(155,123,255,0.12),transparent)] blur-3xl animate-[spin_24s_linear_infinite]" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionLabel index="06">Prize pool</SectionLabel>
        <h2 id="prize-title" className="sr-only">
          Total prize pool: ₹{inr.format(TOTAL)}
        </h2>
        <p aria-hidden="true" className="mt-10 flex items-start text-[15vw] leading-[0.85] font-bold tracking-tighter tabular-nums md:text-[13vw]">
          <span className="mt-[0.12em] mr-2 text-[0.4em] font-light text-signal">₹</span>
          <span ref={numberRef}>0</span>
          <span className="text-signal">+</span>
        </p>
        <p className="mt-6 max-w-lg text-pretty text-muted-foreground">
          Up for grabs across fifty-plus competitions &mdash; plus internships, incubation and hardware grants for the boldest teams.
        </p>

        <ul data-splits className="mt-16 grid gap-6 md:grid-cols-4">
          {SPLITS.map((s) => (
            <li key={s.label} className="flex flex-col gap-3">
              <div className="flex justify-between font-mono text-[11px] tracking-[0.2em] uppercase">
                <span className="text-muted-foreground">{s.label}</span>
                <span>{Math.round(s.share * 100)}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-foreground/10">
                <div data-split-bar className="h-full origin-left rounded-full bg-gradient-to-r from-signal to-aether" style={{ width: `${s.share * 250}%`, maxWidth: '100%' }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
