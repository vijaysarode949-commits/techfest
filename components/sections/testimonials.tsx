'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { SectionLabel } from '@/components/experience/reveal'

const QUOTES = [
  { quote: 'I came for Robowars. I left with a co-founder, a job offer and a robot missing one wheel.', name: 'Aarav M.', role: 'Robowars finalist, 2024' },
  { quote: 'Nowhere else do you see a quantum computer, a fighter jet and ten thousand students in the same afternoon.', name: 'Dr. Leena K.', role: 'Visiting researcher' },
  { quote: 'The hackathon felt less like a competition and more like a preview of the next decade.', name: 'Sofia R.', role: 'International delegate, Brazil' },
]

const DURATION = 7000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const quoteRef = useRef<HTMLQuoteElement>(null)

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % QUOTES.length), DURATION)
    return () => clearTimeout(id)
  }, [index, paused])

  useEffect(() => {
    if (!quoteRef.current) return
    gsap.fromTo(
      quoteRef.current.querySelectorAll('[data-q-word]'),
      { opacity: 0, filter: 'blur(12px)', y: 12 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.025 },
    )
  }, [index])

  const current = QUOTES[index]

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="relative px-5 py-24 md:px-10 md:py-40"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="09">Voices</SectionLabel>
        <h2 id="testimonials-title" className="sr-only">Testimonials</h2>

        <figure className="mt-12 min-h-[20rem] md:min-h-[24rem]" aria-live="polite">
          <blockquote ref={quoteRef} key={index} className="max-w-6xl text-3xl leading-[1.1] font-medium tracking-tight text-balance md:text-6xl">
            <span aria-hidden="true" className="text-signal">&ldquo;</span>
            {current.quote.split(' ').map((w, i) => (
              <span key={i} data-q-word className="inline-block">
                {w}&nbsp;
              </span>
            ))}
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] uppercase">
            <span className="text-foreground">{current.name}</span>
            <span className="h-px w-8 bg-foreground/20" aria-hidden="true" />
            <span className="text-muted-foreground">{current.role}</span>
          </figcaption>
        </figure>

        <div className="mt-12 flex gap-3" role="tablist" aria-label="Choose testimonial">
          {QUOTES.map((q, i) => (
            <button
              key={q.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial from ${q.name}`}
              onClick={() => setIndex(i)}
              className="group relative h-8 flex-1 md:max-w-48"
            >
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden bg-foreground/15">
                <span
                  key={`${index}-${paused}`}
                  className={cn('block h-full origin-left bg-signal', i < index ? 'scale-x-100' : 'scale-x-0')}
                  style={
                    i === index
                      ? { animation: paused ? 'none' : `progress ${DURATION}ms linear forwards`, transform: paused ? 'scaleX(1)' : undefined }
                      : undefined
                  }
                />
              </span>
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  )
}
