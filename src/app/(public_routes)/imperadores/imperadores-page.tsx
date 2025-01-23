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

export const ImperadoresPage = () => {
  return (
    <ParallaxProvider>
      <main className="h-screen overflow-y-auto snap-y snap-mandatory">
        <section className="snap-start h-screen">
          <HeroSection />
        </section>

        <section className="snap-start h-screen">
          <StatsSection />
        </section>
        {/* <HistorySection />
        <TeamSection />
        <NewsSection />
        <PartnersSection />
        <InvestSection />
        <ContactSection /> */}
      </main>
    </ParallaxProvider>
  )
}
