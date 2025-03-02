"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ExperienceHeader() {
  return (
    <div className="relative h-[50vh] w-full">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/vr-experiences-header.jpg"
          alt="VR Experiences"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end container mx-auto px-4 pb-16">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          VR Experiences
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/80 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover our collection of immersive virtual reality travel experiences that will transport you to amazing destinations around the world.
        </motion.p>
      </div>
    </div>
  )
}

