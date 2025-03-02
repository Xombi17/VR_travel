"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function DestinationsHeader() {
  return (
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/vr-experiences-header.jpg"
          alt="Destinations around the world"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Virtual Destinations
        </motion.h1>

        <motion.p
          className="text-white/80 max-w-2xl text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover hundreds of immersive virtual destinations from around the world. From ancient wonders to modern
          marvels, experience it all in stunning VR.
        </motion.p>
      </div>
    </section>
  )
}

