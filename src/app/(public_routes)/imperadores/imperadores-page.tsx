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

import { ScrollArea } from '@/components/ui/scroll-area'

import { HeroSection } from './components/hero'
import { StatsSection } from './components/stats'
import { HistorySection } from './components/history'
import { MissionVisionValues } from './components/mission-vision-values'
/* import { SocialImpact } from './components/social-impact' */
import { Benefits } from './components/benefits'
import { Plans } from './components/plans'
import { Contact } from './components/contact'
import { ConquistasSection } from './components/conquistas'

export const ImperadoresPage = () => {
  return (
    <ParallaxProvider>
      <ScrollArea className="h-screen overflow-y-auto snap-y md:snap-mandatory">
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

        <section className="snap-start h-fulll">
          <ConquistasSection />
        </section>
        {/*   <section className="snap-start  h-fulll">
          <SocialImpact />
        </section> */}
        <section className="snap-start  h-fulll">
          <Benefits />
        </section>
        <section className="snap-start  h-fulll">
          <Plans />
        </section>

        <section className="snap-start  h-fulll">
          <Contact />
        </section>

        {/* <TeamSection />
        <NewsSection />
        <PartnersSection />
        <InvestSection />
        <ContactSection /> */}
      </ScrollArea>
    </ParallaxProvider>
  )
}
