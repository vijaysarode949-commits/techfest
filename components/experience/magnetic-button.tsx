'use client'

import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useExperience } from './experience-provider'

type MagneticButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  cursorLabel?: string
  icon?: boolean
}

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className,
  cursorLabel,
  icon = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const { scrollTo } = useExperience()

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.transform = `translate3d(${(x - rect.width / 2) * 0.25}px, ${(y - rect.height / 2) * 0.35}px, 0)`
    fillRef.current!.style.setProperty('--x', `${x}px`)
    fillRef.current!.style.setProperty('--y', `${y}px`)
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)'
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      scrollTo(href)
    }
  }

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={handleClick}
      data-cursor={cursorLabel}
      className={cn(
        'group/mag relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-7 font-mono text-xs font-medium tracking-[0.2em] uppercase transition-[transform,color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
        variant === 'primary'
          ? 'animate-breathe bg-foreground text-background hover:text-background'
          : 'border border-foreground/20 text-foreground hover:border-signal/60 hover:text-background',
        className,
      )}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-signal transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mag:scale-[2.5]"
        style={{ transformOrigin: 'var(--x, 50%) var(--y, 50%)' }}
      />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative size-4 transition-transform duration-500 group-hover/mag:rotate-45"
        />
      )}
    </a>
  )
}
