'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { SectionLabel, SplitHeading } from '@/components/experience/reveal'

const CATEGORIES = ['All', 'Robotics', 'AI', 'Coding', 'Business', 'Design', 'Hardware', 'Space'] as const
type Category = (typeof CATEGORIES)[number]

const COMPETITIONS: Array<{ name: string; category: Exclude<Category, 'All'>; prize: string; blurb: string; size: 'lg' | 'md' | 'sm' }> = [
  { name: 'Robowars', category: 'Robotics', prize: '₹8,00,000', blurb: 'Combat robots. One arena. No mercy.', size: 'lg' },
  { name: 'Neural Nexus', category: 'AI', prize: '₹5,00,000', blurb: '36-hour applied AI hackathon on real-world datasets.', size: 'md' },
  { name: 'Meshmerize', category: 'Robotics', prize: '₹3,00,000', blurb: 'Autonomous maze-solving line followers.', size: 'sm' },
  { name: 'Codecode', category: 'Coding', prize: '₹2,50,000', blurb: 'Competitive programming, international rounds.', size: 'sm' },
  { name: 'Orbit Lab', category: 'Space', prize: '₹4,00,000', blurb: 'Design, build and launch a CanSat payload.', size: 'md' },
  { name: 'Venture Vault', category: 'Business', prize: '₹3,50,000', blurb: 'Pitch deep-tech ventures to real investors.', size: 'sm' },
  { name: 'Pixel Forge', category: 'Design', prize: '₹1,50,000', blurb: 'Interface design for the year 2050.', size: 'sm' },
  { name: 'Circuit Siege', category: 'Hardware', prize: '₹2,00,000', blurb: 'Embedded systems under impossible constraints.', size: 'md' },
  { name: 'Aerial Ascent', category: 'Robotics', prize: '₹3,00,000', blurb: 'Autonomous drones through a live obstacle course.', size: 'sm' },
]

function HoloTile({ item, index }: { item: (typeof COMPETITIONS)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current!
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--px', `${px * 100}%`)
    el.style.setProperty('--py', `${py * 100}%`)
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg) translateZ(0)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      href="#cta"
      data-tile
      data-cursor="Enter"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-surface/60 p-6 backdrop-blur-sm transition-[transform,border-color] duration-300 ease-out hover:border-signal/40 focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none md:p-8',
        item.size === 'lg' && 'min-h-[22rem] md:col-span-2 md:row-span-2 md:min-h-[32rem]',
        item.size === 'md' && 'min-h-[16rem] md:col-span-2',
        item.size === 'sm' && 'min-h-[16rem]',
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(500px circle at var(--px,50%) var(--py,50%), rgba(94,231,255,0.16), transparent 40%), linear-gradient(115deg, transparent 30%, rgba(155,123,255,0.12) 45%, rgba(94,231,255,0.12) 55%, transparent 70%)',
        }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-0 transition-opacity duration-500 group-hover:opacity-60" />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {String(index + 1).padStart(2, '0')} / {item.category}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-signal"
        />
      </div>

      <div className="relative" style={{ transform: 'translateZ(40px)' }}>
        <h3 className={cn('font-bold tracking-tighter', item.size === 'lg' ? 'text-5xl md:text-8xl' : 'text-3xl md:text-4xl')}>
          {item.name}
        </h3>
        <p className="mt-3 max-w-sm text-sm text-pretty text-muted-foreground">{item.blurb}</p>
        <p className="mt-6 flex items-center gap-3 font-mono text-xs tracking-widest uppercase">
          <span className="text-muted-foreground">Prize</span>
          <span className="text-signal">
            <span className="font-sans">₹</span>
            {item.prize.replace('₹', '')}
          </span>
        </p>
      </div>
    </a>
  )
}

export function Competitions() {
  const [active, setActive] = useState<Category>('All')
  const gridRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLElement>(null)

  const items = useMemo(
    () => (active === 'All' ? COMPETITIONS : COMPETITIONS.filter((c) => c.category === active)),
    [active],
  )

  useGSAP(
    () => {
      gsap.fromTo(
        '[data-tile]',
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out', stagger: 0.05 },
      )
    },
    { scope: gridRef, dependencies: [active] },
  )

  return (
    <section ref={ref} id="competitions" aria-labelledby="competitions-title" className="relative px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="02">Featured competitions</SectionLabel>
            <div id="competitions-title">
              <SplitHeading
                text="Fifty arenas. One question: what can you build?"
                accentWords={['build?']}
                className="mt-6 max-w-4xl text-4xl leading-[0.95] font-bold tracking-tighter md:text-7xl"
              />
            </div>
          </div>

          <div role="group" aria-label="Filter competitions by category" className="flex flex-wrap gap-2 md:max-w-md md:justify-end">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={active === c}
                onClick={() => setActive(c)}
                className={cn(
                  'h-9 rounded-full border px-4 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300',
                  active === c
                    ? 'border-signal bg-signal text-background'
                    : 'border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="mt-14 grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
          {items.map((item, i) => (
            <HoloTile key={item.name} item={item} index={COMPETITIONS.indexOf(item) ?? i} />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {`Showing ${items.length} competitions`}
        </p>
      </div>
    </section>
  )
}
