"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, ArrowRight, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"

const destinations = [
  {
    id: 1,
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "/images/destinations/eiffel-tower.jpg"
  },
  {
    id: 2,
    name: "Great Wall of China",
    location: "China",
    image: "/images/destinations/great-wall.jpg"
  },
  {
    id: 3,
    name: "Taj Mahal",
    location: "Agra, India",
    image: "/images/destinations/taj-mahal.jpg"
  }
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentDestination, setCurrentDestination] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background image carousel */}
      {destinations.map((destination, index) => (
        <motion.div
          key={destination.id}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentDestination === index ? 1 : 0,
            scale: currentDestination === index ? 1 : 1.1
          }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </motion.div>
      ))}

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience the World in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Virtual Reality</span>
        </motion.h1>

        <motion.p
          className="text-white/80 text-center max-w-2xl mb-8 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explore the world&apos;s most iconic destinations from the comfort of your home. Immersive virtual reality
          experiences that transport you anywhere.
        </motion.p>

        <motion.div
          className="flex gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            Start Exploring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Experience in VR
            <Headset className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          className="relative w-full max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full py-4 px-6 pr-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-full">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Destination indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentDestination === index ? "bg-white w-6" : "bg-white/50"
              }`}
              onClick={() => setCurrentDestination(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

