"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const devices = [
  {
    name: "Meta Quest",
    image: "/images/devices/meta-quest.jpg",
    description: "Fully immersive standalone VR headset with intuitive controllers."
  },
  {
    name: "HTC Vive",
    image: "/images/devices/htc-vive.jpg",
    description: "Premium PC-powered VR with precise tracking and high resolution."
  },
  {
    name: "Smartphone VR",
    image: "/images/devices/smartphone-vr.jpg",
    description: "Use your smartphone with a compatible headset for an accessible VR experience."
  }
]

export default function ExperienceDevices() {
  return (
    <section className="mb-20">
      <div className="glass-card p-8 neon-border">
        <h2 className="text-3xl font-bold mb-8 gradient-text">Compatible Devices</h2>
        <p className="text-white/70 mb-10 max-w-2xl">
          Our virtual travel experiences are optimized for a variety of VR devices. Choose the one that works best for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {devices.map((device, index) => (
            <motion.div
              key={device.name}
              className="glass-effect rounded-xl p-6 border border-white/10 hover:border-teal-400/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={device.image}
                  alt={device.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-3">{device.name}</h3>
              <p className="text-white/70 text-center">{device.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/guide">
            <motion.button
              className="bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 py-3 px-8 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Setup Guide
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
} 