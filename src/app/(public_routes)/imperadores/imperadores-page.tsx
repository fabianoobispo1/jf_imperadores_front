'use client'

import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { motion } from 'framer-motion'

import { ScrollArea } from '@/components/ui/scroll-area'

import { Timeline } from './components/timeline'
import { Benefits } from './components/benefits'
import { Plans } from './components/plans'
import { Header } from './components/header'
import { Objectives } from './components/objectives'
import { Contact } from './components/contact'
import { History } from './components/history'
import { Goals } from './components/goals'

export const ImperadoresPage = () => {
  return (
    <ParallaxProvider>
      <ScrollArea className="h-[calc(100vh)] w-full">
        <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-black via-imperial-gold to-black text-white">
          <div className="container mx-auto h-full px-4 py-8">
            <section className="min-h-screen p-4 flex items-center justify-center">
              <Parallax speed={-10}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ amount: 0.3 }}
                >
                  <Header />
                </motion.div>
              </Parallax>
            </section>

            <section className="min-h-screen flex items-center justify-center">
              <Parallax speed={-8}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ amount: 0.3 }}
                >
                  <History />
                </motion.div>
              </Parallax>
            </section>

            <section className="min-h-screen flex items-center justify-center">
              <Parallax speed={-5}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ amount: 0.3 }}
                >
                  <Timeline />
                </motion.div>
              </Parallax>
            </section>

            <section className="min-h-screen flex items-center justify-center">
              <Parallax speed={5}>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ amount: 0.3 }}
                >
                  <Objectives />
                </motion.div>
              </Parallax>
            </section>

            <section className="min-h-screen flex items-center justify-center">
              <Parallax speed={-8}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ amount: 0.3 }}
                >
                  <Benefits />
                </motion.div>
              </Parallax>
            </section>

            <section className="min-h-screen flex items-center justify-center">
              <Parallax speed={10}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ amount: 0.3 }}
                >
                  <Plans />
                </motion.div>
              </Parallax>
            </section>
            <section className="min-h-screen flex items-center justify-center">
              <Parallax speed={5}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ amount: 0.3 }}
                >
                  <Goals />
                </motion.div>
              </Parallax>
            </section>

            <section className="min-h-screen flex items-center justify-center">
              <Parallax speed={-15}>
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ amount: 0.3 }}
                >
                  <Contact />
                </motion.div>
              </Parallax>
            </section>
          </div>
        </div>
      </ScrollArea>
    </ParallaxProvider>
  )
}
