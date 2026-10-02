import { SectionLabel } from '@/components/experience/reveal'

const ROW_A = ['Novaline', 'Quantix', 'Helio Systems', 'Arcbyte', 'Vertex Labs', 'Orbital Nine', 'Synthex', 'Lumen AI']
const ROW_B = ['Kinetica', 'Polaris Grid', 'Monolith', 'Fluxcore', 'Aperture Bio', 'Strata', 'Zenith Motors', 'Cobalt']

function MarqueeRow({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: string }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <ul
        className="animate-marquee flex w-max shrink-0 items-center group-hover:[animation-play-state:paused]"
        style={{ ['--marquee-duration' as string]: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {[...items, ...items].map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 px-5 text-3xl font-bold tracking-tighter text-foreground/25 transition-colors duration-300 hover:text-foreground md:px-8 md:text-5xl"
          >
            {name}
            <span className="size-1.5 rounded-full bg-signal/60" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Sponsors() {
  return (
    <section id="sponsors" aria-labelledby="sponsors-title" className="relative py-24 md:py-32">
      <div className="mx-auto mb-14 flex max-w-[1600px] flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <SectionLabel index="08">Partners</SectionLabel>
        <h2 id="sponsors-title" className="max-w-md text-pretty text-muted-foreground md:text-right">
          Powered by the companies building what comes next.
        </h2>
      </div>
      <div className="flex flex-col gap-6 border-y border-foreground/10 py-10">
        <MarqueeRow items={ROW_A} duration="45s" />
        <MarqueeRow items={ROW_B} duration="55s" reverse />
      </div>
    </section>
  )
}
