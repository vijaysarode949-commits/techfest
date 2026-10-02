'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase', className)}>
      <span className="text-signal">[{index}]</span>
      <span className="h-px w-8 bg-foreground/20" aria-hidden="true" />
      {children}
    </p>
  )
}

type SplitHeadingProps = {
  text: string
  as?: 'h2' | 'h3' | 'p'
  className?: string
  accentWords?: string[]
}

export function SplitHeading({ text, as: Tag = 'h2', className, accentWords = [] }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-word]', {
        yPercent: 110,
        rotate: 4,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} aria-label={text} className={cn('text-balance', className)}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span
            data-word
            className={cn('inline-block', accentWords.includes(word) && 'font-light text-signal italic')}
          >
            {word}
            {'\u00A0'}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 40,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        delay,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
