'use client'

import { useEffect, useState } from 'react'

const FEST_START = new Date('2026-12-18T09:00:00+05:30').getTime()

function getParts(now: number) {
  const diff = Math.max(0, FEST_START - now)
  return [
    { label: 'Days', value: Math.floor(diff / 86_400_000) },
    { label: 'Hrs', value: Math.floor(diff / 3_600_000) % 24 },
    { label: 'Min', value: Math.floor(diff / 60_000) % 60 },
    { label: 'Sec', value: Math.floor(diff / 1000) % 60 },
  ]
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = now === null ? null : getParts(now)

  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4 backdrop-blur-xl md:p-5">
      <p className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
        </span>
        T-minus &middot; Dec 18&ndash;20, 2026
      </p>
      <dl className="flex gap-4 md:gap-5">
        {(parts ?? getParts(FEST_START)).map((p) => (
          <div key={p.label} className="flex flex-col">
            <dt className="order-2 font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">{p.label}</dt>
            <dd className="order-1 text-2xl font-medium tabular-nums md:text-3xl">
              {parts ? String(p.value).padStart(2, '0') : '--'}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
