"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ExperienceHero() {
  return (
    <section className="relative h-[70vh] mb-20 overflow-hidden rounded-2xl">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/vr-experience-bg.jpg"
          alt="VR Travel Experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore the World <br />
          <span className="text-cyan-400">Without Leaving Home</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover immersive virtual reality travel experiences that transport you to breathtaking destinations around the globe.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-8 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-shadow">
            Browse Experiences
          </button>
          <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-full font-medium border border-white/20 hover:bg-white/20 transition-colors">
            How It Works
          </button>
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          className="flex flex-wrap gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div>
            <div className="text-3xl font-bold text-cyan-400">50+</div>
            <div className="text-white/70">Destinations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400">10k+</div>
            <div className="text-white/70">Happy Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400">4.8/5</div>
            <div className="text-white/70">User Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 