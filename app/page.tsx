import { ExperienceProvider } from '@/components/experience/experience-provider'
import { AmbientBackground } from '@/components/experience/ambient-background'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero/hero'
import { About } from '@/components/sections/about'
import { Competitions } from '@/components/sections/competitions'
import { Workshops } from '@/components/sections/workshops'
import { International } from '@/components/sections/international'
import { Innovation } from '@/components/sections/innovation'
import { PrizePool } from '@/components/sections/prize-pool'
import { Timeline } from '@/components/sections/timeline'
import { Sponsors } from '@/components/sections/sponsors'
import { Testimonials } from '@/components/sections/testimonials'
import { Campus } from '@/components/sections/campus'
import { Stats } from '@/components/sections/stats'
import { CallToAction } from '@/components/sections/call-to-action'

export default function Page() {
  return (
    <ExperienceProvider>
      <AmbientBackground />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Competitions />
        <Workshops />
        <International />
        <Innovation />
        <PrizePool />
        <Timeline />
        <Sponsors />
        <Testimonials />
        <Campus />
        <Stats />
        <CallToAction />
      </main>
      <SiteFooter />
    </ExperienceProvider>
  )
}
