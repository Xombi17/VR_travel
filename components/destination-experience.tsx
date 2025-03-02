"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function DestinationExperience({ id }: { id: string }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-6">VR Experience</h2>

      <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 flex flex-col justify-center">
            <motion.h3
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Experience in Virtual Reality
            </motion.h3>

            <motion.p
              className="text-white/80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Immerse yourself in a fully interactive 360° experience of this destination. Explore every detail,
              interact with the environment, and learn fascinating facts with our expert audio guide.
            </motion.p>

            <motion.div
              className="space-y-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500" />
                <span className="text-white">Full 360° panoramic views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500" />
                <span className="text-white">Interactive hotspots with information</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500" />
                <span className="text-white">Professional narration and ambient sounds</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href={`/experience?destination=${id}`}>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-8 rounded-full font-medium">
                  Start VR Experience
                </button>
              </Link>
            </motion.div>
          </div>

          <div className="relative min-h-[300px] md:min-h-0">
            <Image
              src="/placeholder.svg?height=600&width=800&text=VRExperience"
              alt="VR Experience"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

