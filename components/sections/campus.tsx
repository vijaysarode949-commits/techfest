'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionLabel } from '@/components/experience/reveal'

const NOTES = [
  { text: '550 acres between a lake and the hills of Powai.', pos: 'md:left-10 md:top-[22%]' },
  { text: 'Three nights where the whole campus becomes the venue.', pos: 'md:right-10 md:top-[48%]' },
]

export function Campus() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=160%', scrub: 0.8, pin: '[data-campus-pin]' },
      })
      tl.fromTo('[data-campus-img]', { scale: 1.3, filter: 'brightness(0.15) saturate(0.2)' }, { scale: 1, filter: 'brightness(1) saturate(1.1)', ease: 'none' })
        .fromTo('[data-campus-title]', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo('[data-campus-note]', { opacity: 0, y: 40, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.25 }, 0.3)
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="campus" aria-labelledby="campus-title" className="relative">
      <div data-campus-pin className="relative h-[100svh] overflow-hidden">
        <div data-campus-img className="absolute inset-0 will-change-transform">
          <Image
            src="/images/campus-night.png"
            alt="IIT Bombay campus at blue hour beside Powai lake, buildings lit up"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end gap-6 px-5 pb-12 md:px-10 md:pb-16">
          {NOTES.map((n) => (
            <p
              key={n.text}
              data-campus-note
              className={`max-w-xs rounded-2xl border border-foreground/15 bg-background/30 p-5 text-sm text-pretty backdrop-blur-xl md:absolute md:text-base ${n.pos}`}
            >
              {n.text}
            </p>
          ))}
          <div data-campus-title>
            <SectionLabel index="10" className="text-foreground/80">
              Campus experience
            </SectionLabel>
            <h2 id="campus-title" className="mt-4 text-[13vw] leading-[0.85] font-bold tracking-tighter md:text-[9vw]">
              The lights come on.
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
