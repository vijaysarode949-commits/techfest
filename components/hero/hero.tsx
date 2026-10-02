'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useExperience } from '@/components/experience/experience-provider'
import { MagneticButton } from '@/components/experience/magnetic-button'
import { ParticleField } from './particle-field'
import { Countdown } from './countdown'
import { Skyline } from './skyline'

export function Hero() {
  const { ready } = useExperience()
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ready) return
      const tl = gsap.timeline({ delay: 2.4 })
      tl.from('[data-hero-tag] > *', { yPercent: 120, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08 })
        .from('[data-hero-fade]', { y: 24, opacity: 0, filter: 'blur(8px)', duration: 1, ease: 'expo.out', stagger: 0.1 }, '-=0.8')
        .from('[data-hero-skyline]', { yPercent: 40, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0)

      gsap.to('[data-hero-stage]', {
        scale: 0.86,
        opacity: 0,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: ref, dependencies: [ready] },
  )

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div data-hero-stage className="absolute inset-0 origin-center">
        <ParticleField start={ready} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,transparent_30%,var(--background)_85%)]" />
      </div>

      <h1 id="hero-title" className="sr-only">
        Techfest IIT Bombay — 30th Edition: Aetherial Renaissance
      </h1>

      <div data-hero-skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] opacity-80 md:h-[26vh]">
        <Skyline />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pt-28 pb-8 md:px-10 md:pb-12">
        <div className="flex items-start justify-between gap-6">
          <div data-hero-fade className="flex flex-col gap-1 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase md:text-[11px]">
            <span>IIT Bombay &middot; Powai, Mumbai</span>
            <span className="text-foreground">Edition XXX</span>
          </div>
          <div data-hero-fade className="hidden text-right font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase md:block">
            <span>19.1334&deg; N</span>
            <br />
            <span>72.9133&deg; E</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-xl flex-col gap-6">
            <p data-hero-tag className="overflow-hidden text-4xl leading-none font-medium tracking-tight md:text-6xl">
              <span className="inline-block">Where tomorrow</span>{' '}
              <span className="inline-block font-light text-signal italic">begins.</span>
            </p>
            <p data-hero-fade className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Aetherial Renaissance &mdash; three days where robotics, intelligence and human imagination collide on one campus.
            </p>
            <div data-hero-fade className="pointer-events-auto flex flex-wrap gap-3">
              <MagneticButton href="#cta" cursorLabel="Enter">
                Enter the future
              </MagneticButton>
              <MagneticButton href="#competitions" variant="ghost" icon={false} cursorLabel="Explore">
                Explore events
              </MagneticButton>
            </div>
          </div>
          <div data-hero-fade className="pointer-events-auto self-start md:self-end">
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  )
}
