'use client'

import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 10

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine) return

    document.documentElement.classList.add('has-cursor')
    const dot = dotRef.current!
    const ring = ringRef.current!
    const label = labelRef.current!
    const canvas = trailRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const mouse = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    const trail = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
    let hovering = false
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor]')
      const nextHover = Boolean(target)
      if (nextHover !== hovering) {
        hovering = nextHover
        ring.dataset.active = String(hovering)
      }
      label.textContent = target?.dataset.cursor ?? ''
    }

    const onDown = () => {
      ring.animate(
        [
          { boxShadow: '0 0 0 0 rgba(94,231,255,0.6)' },
          { boxShadow: '0 0 0 28px rgba(94,231,255,0)' },
        ],
        { duration: 500, easing: 'ease-out' },
      )
    }

    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`

      if (!reduced) {
        trail.unshift({ x: mouse.x, y: mouse.y })
        trail.length = TRAIL_LENGTH
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        for (let i = 1; i < trail.length; i++) {
          const a = 1 - i / TRAIL_LENGTH
          ctx.fillStyle = `rgba(94,231,255,${a * 0.35})`
          ctx.beginPath()
          ctx.arc(trail[i].x, trail[i].y, 2.2 * a, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('resize', resize)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <canvas ref={trailRef} className="absolute inset-0 h-full w-full" />
      <div ref={dotRef} className="absolute top-0 left-0 -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-signal" />
      <div
        ref={ringRef}
        data-active="false"
        className="group absolute top-0 left-0"
      >
        <div className="-mt-5 -ml-5 flex size-10 items-center justify-center rounded-full border border-foreground/30 transition-all duration-300 ease-out group-data-[active=true]:-mt-9 group-data-[active=true]:-ml-9 group-data-[active=true]:size-18 group-data-[active=true]:border-signal/60 group-data-[active=true]:bg-signal/10 group-data-[active=true]:backdrop-blur-[2px]">
          <span ref={labelRef} className="font-mono text-[9px] tracking-widest text-signal uppercase" />
        </div>
      </div>
    </div>
  )
}
