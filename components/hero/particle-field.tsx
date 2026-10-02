'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  sx: number
  sy: number
  size: number
  hue: number
}

type Node = { x: number; y: number; vx: number; vy: number }

/**
 * Cinematic opening: a single spark → a neural burst → thousands of particles
 * converging into the TECHFEST wordmark. The pointer repels particles and lights
 * up the surrounding neural mesh.
 */
export function ParticleField({ start }: { start: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startRef = useRef(start)
  startRef.current = start

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d', { alpha: true })!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio, 2)

    let w = 0
    let h = 0
    let particles: Particle[] = []
    let nodes: Node[] = []
    let raf = 0
    let startedAt = 0
    let visible = true
    const pointer = { x: -9999, y: -9999, active: false }

    const buildTargets = () => {
      const off = document.createElement('canvas')
      const octx = off.getContext('2d', { willReadFrequently: true })!
      off.width = w
      off.height = h
      const family = getComputedStyle(document.body).fontFamily
      octx.font = `700 100px ${family}`
      const ratio = octx.measureText('TECHFEST').width / 100
      const fontSize = Math.min((w * 0.9) / ratio, h * 0.3)
      octx.font = `700 ${fontSize}px ${family}`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#fff'
      octx.fillText('TECHFEST', w / 2, h * 0.46)

      const data = octx.getImageData(0, 0, w, h).data
      const gap = w < 768 ? 3 : Math.max(4, Math.round(fontSize / 34))
      const targets: Array<[number, number]> = []
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (data[(y * w + x) * 4 + 3] > 128) targets.push([x, y])
        }
      }
      return { targets, gap }
    }

    const setup = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      if (w === 0 || h === 0) {
        particles = []
        nodes = []
        return
      }
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const { targets, gap } = buildTargets()
      const cx = w / 2
      const cy = h * 0.46
      particles = targets.map(([tx, ty]) => {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * Math.max(w, h) * 0.6
        return {
          x: cx,
          y: cy,
          vx: 0,
          vy: 0,
          tx,
          ty,
          sx: cx + Math.cos(angle) * radius,
          sy: cy + Math.sin(angle) * radius * 0.7,
          size: Math.random() * 0.9 + gap * 0.32,
          hue: Math.random(),
        }
      })

      const nodeCount = w < 768 ? 36 : 80
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    const drawMesh = (alpha: number) => {
      const linkDist = w < 768 ? 110 : 150
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      ctx.lineWidth = 0.6
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y)
        const boost = pointer.active ? Math.max(0, 1 - pd / 260) : 0
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < linkDist) {
            const o = (1 - d / linkDist) * (0.12 + boost * 0.5) * alpha
            ctx.strokeStyle = `rgba(94,231,255,${o})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(242,243,245,${(0.25 + boost * 0.7) * alpha})`
        ctx.fillRect(a.x - 1, a.y - 1, 2, 2)
      }
    }

    const render = (now: number) => {
      raf = requestAnimationFrame(render)
      if (!visible) return
      ctx.clearRect(0, 0, w, h)
      if (!startRef.current) return
      if (!startedAt) startedAt = now
      const t = reduced ? 10 : (now - startedAt) / 1000

      const cx = w / 2
      const cy = h * 0.46

      // Phase 0: a single spark breathes into existence
      if (t < 0.9) {
        const r = 2 + Math.sin(t * 9) * 1.2 + t * 4
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 10)
        g.addColorStop(0, 'rgba(94,231,255,0.9)')
        g.addColorStop(1, 'rgba(94,231,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, r * 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2)
        ctx.fill()
        return
      }

      drawMesh(Math.min(1, (t - 0.9) / 1.2))

      const phase = t < 1.8 ? 'burst' : 'form'
      const k = phase === 'burst' ? 0.03 : Math.min(0.06, 0.012 + (t - 1.8) * 0.03)
      const damping = phase === 'burst' ? 0.9 : 0.84

      for (const p of particles) {
        const hx = phase === 'burst' ? p.sx : p.tx
        const hy = phase === 'burst' ? p.sy : p.ty
        p.vx += (hx - p.x) * k
        p.vy += (hy - p.y) * k

        if (pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < 9000) {
            const f = (9000 - d2) / 9000
            p.vx += dx * f * 0.09
            p.vy += dy * f * 0.09
          }
        }

        p.vx *= damping
        p.vy *= damping
        p.x += p.vx
        p.y += p.vy

        const speed = Math.abs(p.vx) + Math.abs(p.vy)
        const glow = Math.min(1, speed / 6)
        ctx.fillStyle =
          p.hue > 0.92
            ? `rgba(155,123,255,${0.85})`
            : glow > 0.15
              ? `rgba(94,231,255,${0.6 + glow * 0.4})`
              : 'rgba(242,243,245,0.92)'
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const prevW = w
        setup()
        if (prevW && startedAt) {
          for (const p of particles) {
            p.x = p.tx
            p.y = p.ty
          }
        }
      }, 150)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    document.fonts.ready.then(() => {
      setup()
      raf = requestAnimationFrame(render)
    })

    const parent = canvas.parentElement!
    parent.addEventListener('pointermove', onPointerMove, { passive: true })
    parent.addEventListener('pointerleave', onPointerLeave)
    const ro = new ResizeObserver(() => {
      if (canvas.clientWidth !== w || canvas.clientHeight !== h) onResize()
    })
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      io.disconnect()
      ro.disconnect()
      parent.removeEventListener('pointermove', onPointerMove)
      parent.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
