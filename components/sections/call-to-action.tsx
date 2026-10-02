'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MagneticButton } from '@/components/experience/magnetic-button'
import { SectionLabel } from '@/components/experience/reveal'

export function CallToAction() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '[data-cta-line]',
        { letterSpacing: '0.2em', opacity: 0.1 },
        {
          letterSpacing: '-0.05em',
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'center 55%', scrub: true },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="cta" aria-labelledby="cta-title" className="relative overflow-hidden px-5 py-32 md:px-10 md:py-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-aurora absolute top-1/2 left-1/2 h-[50vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-signal/25 via-aether/25 to-signal/25 blur-[100px]" />
      </div>
      <div className="relative mx-auto flex max-w-[1600px] flex-col items-center text-center">
        <SectionLabel index="12">Registrations open</SectionLabel>
        <h2 id="cta-title" className="mt-10 text-[16vw] leading-[0.82] font-bold md:text-[11vw]">
          <span data-cta-line className="block">
            Enter the
          </span>
          <span data-cta-line className="block font-light text-signal italic">
            future.
          </span>
        </h2>
        <p className="mt-10 max-w-md text-pretty text-muted-foreground">
          Register your team, book a workshop seat, or just show up in December. The renaissance needs you.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <MagneticButton href="#cta" cursorLabel="Go">
            Register now
          </MagneticButton>
          <MagneticButton href="#competitions" variant="ghost" icon={false} cursorLabel="Browse">
            Browse events
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
