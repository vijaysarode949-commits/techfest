'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionLabel, Reveal } from '@/components/experience/reveal'

const COUNTRIES = ['Japan', 'Germany', 'USA', 'Singapore', 'Brazil', 'Kenya', 'France', 'Korea', 'UAE', 'Canada', 'Israel', 'Australia']

const HIGHLIGHTS = [
  { k: 'Lectures', v: 'Nobel laureates, astronauts and founders on the main stage.' },
  { k: 'Intl. Zonals', v: 'Qualifier rounds hosted across continents before the finale.' },
  { k: 'Summit', v: 'A global youth summit on climate, AI policy and deep tech.' },
]

export function International() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '[data-intl-mask]',
        { clipPath: 'inset(30% 30% 30% 30% round 2rem)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
          ease: 'none',
          scrollTrigger: { trigger: '[data-intl-mask]', start: 'top 90%', end: 'center 55%', scrub: true },
        },
      )
      gsap.fromTo('[data-intl-img]', { scale: 1.35 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '[data-intl-mask]', start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-marquee-scrub]', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="international" aria-labelledby="intl-title" className="relative overflow-hidden py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionLabel index="04">International events</SectionLabel>
        <h2 id="intl-title" className="sr-only">International events</h2>
      </div>

      <div aria-hidden="true" className="mt-10 overflow-hidden">
        <div data-marquee-scrub className="flex w-max gap-10 text-[18vw] leading-none font-bold tracking-tighter whitespace-nowrap md:text-[12vw]">
          {COUNTRIES.map((c, i) => (
            <span key={c} className={i % 3 === 1 ? 'text-signal' : 'text-outline'}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1600px] gap-10 px-5 md:mt-16 md:grid-cols-12 md:px-10">
        <div data-intl-mask className="relative aspect-[4/5] overflow-hidden md:col-span-7 md:aspect-[16/11]">
          <Image
            data-intl-img
            src="/images/lecture.png"
            alt="A packed auditorium watching a speaker beneath a giant neural network visual"
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.3em] text-foreground/80 uppercase md:bottom-8 md:left-8">
            Convocation Hall &middot; Main Stage
          </p>
        </div>

        <div className="flex flex-col justify-end gap-10 md:col-span-5">
          <Reveal>
            <p className="text-3xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
              The world comes to Powai. <span className="text-muted-foreground">Every December.</span>
            </p>
          </Reveal>
          <dl className="flex flex-col">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.k} delay={i * 0.08}>
                <div className="group flex gap-6 border-t border-foreground/10 py-6 transition-colors hover:border-signal/50">
                  <dt className="w-32 shrink-0 font-mono text-[11px] tracking-[0.25em] text-signal uppercase">{h.k}</dt>
                  <dd className="text-pretty text-muted-foreground transition-colors group-hover:text-foreground">{h.v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
