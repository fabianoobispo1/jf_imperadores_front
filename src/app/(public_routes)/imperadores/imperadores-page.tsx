'use client'

import { ParallaxProvider /* Parallax */ } from 'react-scroll-parallax'
/* import { motion } from 'framer-motion'

import { ScrollArea } from '@/components/ui/scroll-area'

import { Timeline } from './components/timeline'
import { Benefits } from './components/benefits'
import { Plans } from './components/plans'
import { Header } from './components/header'
import { Objectives } from './components/objectives'
import { Contact } from './components/contact'
import { History } from './components/history'
import { Goals } from './components/goals' */
import { HeroSection } from './components/hero'
import { StatsSection } from './components/stats'
import { HistorySection } from './components/history'
import { MissionVisionValues } from './components/mission-vision-values'
import { SocialImpact } from './components/social-impact'

export const ImperadoresPage = () => {
  return (
    <ParallaxProvider>
      <main className="h-screen overflow-y-auto snap-y md:snap-mandatory">
        <section className="snap-start h-screen">
          <HeroSection />
        </section>

        <section className=" snap-start h-fulll">
          <StatsSection />
        </section>
        <section className=" snap-start h-fulll">
          <HistorySection />
        </section>
        <section className="snap-start  h-fulll">
          <MissionVisionValues />
        </section>
        <section className="snap-start  h-fulll">
          <SocialImpact />
        </section>
        {/* <TeamSection />
        <NewsSection />
        <PartnersSection />
        <InvestSection />
        <ContactSection /> */}
      </main>
    </ParallaxProvider>
  )
}
