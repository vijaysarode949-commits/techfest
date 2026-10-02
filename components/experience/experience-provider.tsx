'use client'

import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { BootLoader } from './boot-loader'
import { CustomCursor } from './custom-cursor'

type ExperienceContextValue = {
  ready: boolean
  scrollTo: (target: string | number) => void
}

const ExperienceContext = createContext<ExperienceContextValue>({
  ready: false,
  scrollTo: () => {},
})

export function useExperience() {
  return useContext(ExperienceContext)
}

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: reduced ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis
    lenis.stop()

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    lenisRef.current?.start()
    ScrollTrigger.refresh()
  }, [ready])

  const scrollTo = useCallback((target: string | number) => {
    lenisRef.current?.scrollTo(target, { offset: 0, duration: 1.6 })
  }, [])

  const handleComplete = useCallback(() => setReady(true), [])

  return (
    <ExperienceContext.Provider value={{ ready, scrollTo }}>
      <BootLoader onComplete={handleComplete} />
      <CustomCursor />
      {children}
    </ExperienceContext.Provider>
  )
}
