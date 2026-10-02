'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionLabel } from '@/components/experience/reveal'

const EXHIBITS = ['Humanoids', 'Defence tech', 'Space hardware', 'Bio-interfaces', 'Clean energy', 'Autonomous mobility']

export function Innovation() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=180%', scrub: 0.8, pin: '[data-inno-pin]' },
      })
      tl.fromTo('[data-inno-circle]', { clipPath: 'circle(8% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', ease: 'power2.inOut' })
        .fromTo('[data-inno-img]', { scale: 1.6 }, { scale: 1, ease: 'power2.out' }, 0)
        .to('[data-inno-title]', { scale: 0.6, opacity: 0, ease: 'power2.in' }, 0)
        .fromTo('[data-inno-exhibit]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08 }, 0.55)
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="innovation" aria-labelledby="inno-title" className="relative">
      <div data-inno-pin className="relative h-[100svh] overflow-hidden">
        <div data-inno-title className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-5 text-center">
          <SectionLabel index="05">Innovation showcase</SectionLabel>
          <h2 id="inno-title" className="text-[14vw] leading-[0.85] font-bold tracking-tighter md:text-[10vw]">
            See the
            <br />
            <span className="font-light text-signal italic">unbuilt.</span>
          </h2>
        </div>

        <div data-inno-circle className="absolute inset-0" style={{ clipPath: 'circle(8% at 50% 50%)' }}>
          <Image
            data-inno-img
            src="/images/exhibition.png"
            alt="Visitors in a dark exhibition hall looking at a humanoid robot and holographic displays"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />

          <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1600px] flex-col gap-6 px-5 pb-12 md:flex-row md:items-end md:justify-between md:px-10 md:pb-16">
            <p data-inno-exhibit className="max-w-md text-2xl leading-tight font-medium tracking-tight text-balance md:text-4xl">
              100+ exhibits from labs, startups and space agencies.
            </p>
            <ul className="flex max-w-xl flex-wrap gap-2">
              {EXHIBITS.map((e) => (
                <li
                  key={e}
                  data-inno-exhibit
                  className="rounded-full border border-foreground/20 bg-background/40 px-4 py-2 font-mono text-[10px] tracking-[0.2em] uppercase backdrop-blur-md"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
