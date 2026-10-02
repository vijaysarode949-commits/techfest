'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SectionLabel } from '@/components/experience/reveal'

const STATEMENT =
  'Since 1998, a student-run festival at IIT Bombay has grown into the largest gathering of science and technology in Asia. Thirty editions later, we are not hosting the future. We are building it.'

const KEYWORDS = [
  { word: 'Robotics', x: '8%', y: '12%', depth: 0.6 },
  { word: 'AI', x: '78%', y: '8%', depth: 1.2 },
  { word: 'Space', x: '84%', y: '62%', depth: 0.8 },
  { word: 'Engineering', x: '4%', y: '74%', depth: 1 },
  { word: 'Innovation', x: '56%', y: '86%', depth: 0.5 },
  { word: 'Future', x: '36%', y: '2%', depth: 1.4 },
]

const MILESTONES = [
  { year: '1998', text: 'First edition, a handful of student organisers' },
  { year: '2008', text: 'International competitions go global' },
  { year: '2017', text: 'A humanoid robot takes the main stage' },
  { year: '2026', text: 'Edition XXX: Aetherial Renaissance' },
]

export function About() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.timeline({
          scrollTrigger: { trigger: '[data-about-pin]', start: 'top top', end: '+=140%', scrub: 0.6, pin: true },
        })
          .fromTo('[data-statement-word]', { opacity: 0.12 }, { opacity: 1, stagger: 0.05, ease: 'none' })
          .fromTo('[data-milestone]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.2, ease: 'power2.out' }, '-=0.6')
      })
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          '[data-statement-word]',
          { opacity: 0.12 },
          { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 50%', scrub: true } },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-keyword]').forEach((el) => {
        const depth = Number(el.dataset.depth)
        gsap.to(el, {
          yPercent: -120 * depth,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="relative">
      <div data-about-pin className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 py-24 md:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {KEYWORDS.map((k) => (
            <span
              key={k.word}
              data-keyword
              data-depth={k.depth}
              className="text-outline absolute text-5xl font-bold tracking-tighter md:text-8xl"
              style={{ left: k.x, top: k.y }}
            >
              {k.word}
            </span>
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-[1600px]">
          <SectionLabel index="01">About Techfest</SectionLabel>
          <h2 id="about-title" className="sr-only">
            About Techfest
          </h2>
          <p data-statement className="mt-8 max-w-6xl text-3xl leading-[1.08] font-medium tracking-tight text-balance md:text-6xl lg:text-7xl">
            {STATEMENT.split(' ').map((word, i) => (
              <span key={i} data-statement-word className="inline-block">
                {word}&nbsp;
              </span>
            ))}
          </p>

          <ol className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 md:mt-20 md:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <li key={m.year} data-milestone className="flex flex-col gap-6 bg-background p-5 md:p-6">
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">0{i + 1}</span>
                <span className={i === MILESTONES.length - 1 ? 'text-4xl font-bold text-signal md:text-5xl' : 'text-4xl font-bold md:text-5xl'}>
                  {m.year}
                </span>
                <span className="text-sm text-pretty text-muted-foreground">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
