'use client'

import { Timeline } from './components/timeline'
import { Benefits } from './components/benefits'
import { Plans } from './components/plans'
import { Header } from './components/header'
import { Objectives } from './components/objectives'
import { Contact } from './components/contact'

export const ImperadoresPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000428] to-[#004e92] text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Timeline />
        <Objectives />
        <Benefits />
        <Plans />
        <Contact />
      </div>
    </div>
  )
}
