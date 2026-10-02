'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Bot, BrainCircuit, Cpu, Orbit, Plane, ShieldCheck, Atom } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionLabel, SplitHeading } from '@/components/experience/reveal'

const WORKSHOPS: Array<{
  title: string
  icon: LucideIcon
  duration: string
  level: 1 | 2 | 3
  seats: number
  total: number
  description: string
}> = [
  { title: 'Generative AI Systems', icon: BrainCircuit, duration: '2 days', level: 2, seats: 18, total: 120, description: 'Ship an agent with retrieval, tools and evals from a blank repo.' },
  { title: 'Humanoid Robotics', icon: Bot, duration: '3 days', level: 3, seats: 7, total: 60, description: 'Kinematics, servo control and balance on a bipedal kit you keep.' },
  { title: 'Drone Engineering', icon: Plane, duration: '2 days', level: 2, seats: 24, total: 80, description: 'Assemble, tune and fly a quadcopter with autonomous waypoints.' },
  { title: 'Quantum Computing', icon: Atom, duration: '1 day', level: 3, seats: 31, total: 100, description: 'Qubits, gates and your first algorithm on real quantum hardware.' },
  { title: 'Ethical Hacking', icon: ShieldCheck, duration: '2 days', level: 2, seats: 12, total: 90, description: 'Capture-the-flag drills across web, network and hardware.' },
  { title: 'Chip Design 101', icon: Cpu, duration: '2 days', level: 1, seats: 42, total: 120, description: 'From Verilog to a tape-out-ready block, explained from first principles.' },
  { title: 'Astrophysics Lab', icon: Orbit, duration: '1 day', level: 1, seats: 55, total: 150, description: 'Process real telescope data and find an exoplanet transit.' },
]

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export function Workshops() {
  const trackRef = useRef<HTMLUListElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.8, 420), behavior: 'smooth' })
  }

  return (
    <section id="workshops" aria-labelledby="workshops-title" className="relative py-24 md:py-40">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <SectionLabel index="03">Workshops</SectionLabel>
          <div id="workshops-title">
            <SplitHeading
              text="Learn it from the people who invented it."
              accentWords={['invented']}
              className="mt-6 max-w-3xl text-4xl leading-[0.95] font-bold tracking-tighter md:text-7xl"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous workshops" className="flex size-12 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:border-signal hover:text-signal">
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Next workshops" className="flex size-12 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:border-signal hover:text-signal">
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="mt-14 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto scroll-smooth px-5 md:scroll-px-10 pb-6 [scrollbar-width:none] md:mt-20 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {WORKSHOPS.map((w, i) => {
          const Icon = w.icon
          const fill = 1 - w.seats / w.total
          return (
            <li
              key={w.title}
              tabIndex={0}
              className="group relative flex h-[30rem] w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-surface/70 p-6 transition-[width,border-color,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:border-signal/40 focus-visible:border-signal sm:w-[340px] md:hover:w-[460px] md:focus-visible:w-[460px]"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-14 items-center justify-center rounded-2xl border border-foreground/10 bg-background transition-transform duration-700 group-hover:rotate-[360deg]">
                  <Icon className="size-6 text-signal" aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">W-{String(i + 1).padStart(2, '0')}</span>
              </div>

              <div>
                <h3 className="text-3xl leading-none font-bold tracking-tight text-balance">{w.title}</h3>
                <p className="mt-4 max-w-xs text-sm text-pretty text-muted-foreground transition-all duration-700 md:max-h-0 md:opacity-0 md:group-hover:max-h-24 md:group-hover:opacity-100 md:group-focus-visible:max-h-24 md:group-focus-visible:opacity-100">
                  {w.description}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-foreground/10 pt-5 font-mono text-[10px] tracking-[0.2em] uppercase">
                  <div>
                    <dt className="text-muted-foreground">Duration</dt>
                    <dd className="mt-1 text-sm tracking-normal text-foreground">{w.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Level</dt>
                    <dd className="mt-2 flex items-center gap-1" aria-label={LEVELS[w.level - 1]}>
                      {[1, 2, 3].map((n) => (
                        <span key={n} className={n <= w.level ? 'h-2.5 w-5 rounded-sm bg-signal' : 'h-2.5 w-5 rounded-sm bg-foreground/10'} />
                      ))}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="flex justify-between text-muted-foreground">
                      <span>Seats left</span>
                      <span className={w.seats < 15 ? 'text-aether' : 'text-foreground'}>
                        {w.seats}/{w.total}
                      </span>
                    </dt>
                    <dd className="mt-2 h-1 overflow-hidden rounded-full bg-foreground/10">
                      <span className="block h-full rounded-full bg-gradient-to-r from-signal to-aether" style={{ width: `${fill * 100}%` }} />
                    </dd>
                  </div>
                </dl>

                <a
                  href="#cta"
                  data-cursor="Book"
                  className="mt-6 flex h-12 items-center justify-between rounded-full border border-foreground/15 px-5 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:border-signal hover:bg-signal hover:text-background"
                >
                  Register
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
