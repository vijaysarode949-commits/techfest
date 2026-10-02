'use client'

import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { SectionLabel } from '@/components/experience/reveal'

const MILESTONES = [
  { date: 'Jul 2026', title: 'Registrations open', detail: 'Team sign-ups for all competitions and early-bird workshop seats go live.' },
  { date: 'Sep 2026', title: 'National Zonals', detail: 'Qualifier rounds in 12 Indian cities. Top teams earn direct finale entries.' },
  { date: 'Oct 2026', title: 'International Zonals', detail: 'Overseas qualifiers across Asia, Africa and the Middle East.' },
  { date: 'Nov 2026', title: 'Ambassador summit', detail: 'Campus ambassadors from 2,500+ colleges converge for the pre-fest summit.' },
  { date: 'Dec 18', title: 'Day 01 — Ignition', detail: 'Opening keynote, Robowars group stage, exhibitions open to the public.' },
  { date: 'Dec 19', title: 'Day 02 — Resonance', detail: 'Hackathon finale, international lectures, drone night show over the lake.' },
  { date: 'Dec 20', title: 'Day 03 — Renaissance', detail: 'Robowars grand finale, prize ceremony and the closing technoholix night.' },
]

export function Timeline() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const [open, setOpen] = useState<number | null>(4)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current!
        const distance = () => track.scrollWidth - window.innerWidth + 80
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-timeline-pin]',
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        gsap.fromTo('[data-timeline-progress]', { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline-pin]', start: 'top top', end: () => `+=${distance()}`, scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="timeline" aria-labelledby="timeline-title" className="relative">
      <div data-timeline-pin className="flex min-h-[100svh] flex-col justify-center overflow-hidden py-24">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <SectionLabel index="07">Timeline</SectionLabel>
          <h2 id="timeline-title" className="mt-6 text-4xl leading-[0.95] font-bold tracking-tighter md:text-7xl">
            The road to <span className="font-light text-signal italic">December.</span>
          </h2>
        </div>

        <div className="relative mt-14 md:mt-20">
          <div aria-hidden="true" className="absolute top-[7px] right-0 left-0 h-px bg-foreground/10">
            <div data-timeline-progress className="h-full origin-left bg-signal shadow-[0_0_10px_var(--signal)]" />
          </div>
          <ol
            ref={trackRef}
            className="flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:w-max md:overflow-visible md:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {MILESTONES.map((m, i) => {
              const isOpen = open === i
              const isFest = i >= 4
              return (
                <li key={m.title} className="relative w-[78vw] shrink-0 snap-start pt-10 sm:w-[340px]">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-0 left-0 size-[15px] rounded-full border-2 border-background transition-colors',
                      isOpen ? 'bg-signal shadow-[0_0_16px_var(--signal)]' : isFest ? 'bg-aether' : 'bg-foreground/30',
                    )}
                  />
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`milestone-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={cn(
                      'w-full rounded-3xl border p-6 text-left transition-[background-color,border-color] duration-500',
                      isOpen ? 'border-signal/40 bg-signal/[0.06]' : 'border-foreground/10 bg-surface/50 hover:border-foreground/30',
                    )}
                  >
                    <span className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase">
                      <span className={isFest ? 'text-aether' : 'text-muted-foreground'}>{m.date}</span>
                      <Plus aria-hidden="true" className={cn('size-4 transition-transform duration-500', isOpen && 'rotate-45 text-signal')} />
                    </span>
                    <span className="mt-6 block text-2xl font-bold tracking-tight md:text-3xl">{m.title}</span>
                    <span
                      id={`milestone-${i}`}
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-4 text-sm text-pretty text-muted-foreground">{m.detail}</span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
