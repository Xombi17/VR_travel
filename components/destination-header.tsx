"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

// Mock data for destinations
const destinations = {
  paris: {
    name: "Paris",
    country: "France",
    image: "/images/destinations/eiffel-tower.jpg",
  },
  "great-wall": {
    name: "Great Wall of China",
    country: "China",
    image: "/images/destinations/great-wall.jpg",
  },
  santorini: {
    name: "Santorini",
    country: "Greece",
    image: "/images/destinations/santorini.jpg",
  },
  "machu-picchu": {
    name: "Machu Picchu",
    country: "Peru",
    image: "/images/destinations/machu-picchu.jpg",
  },
  "northern-lights": {
    name: "Northern Lights",
    country: "Iceland",
    image: "/images/destinations/northern-lights.jpg",
  },
  "grand-canyon": {
    name: "Grand Canyon",
    country: "USA",
    image: "/images/destinations/grand-canyon.jpg",
  },
}

interface Destination {
  name: string;
  country: string;
  image: string;
  location?: string;
  rating?: number;
  reviews?: number;
}

export default function DestinationHeader({ id }: { id: string }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [destination, setDestination] = useState<Destination | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    setDestination(
      destinations[id as keyof typeof destinations] || {
        name: "Unknown Destination",
        country: "Unknown",
        image: "/placeholder.svg?height=1080&width=1920&text=Unknown",
      },
    )
  }, [id])

  if (!destination) return null

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16">
        <div className="flex items-center mb-4">
          <Link href="/destinations">
            <motion.button
              className="flex items-center gap-2 text-white/80 hover:text-white"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Destinations</span>
            </motion.button>
          </Link>
        </div>

        <div className="flex justify-between items-end">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{destination.name}</h1>
            <p className="text-white/80 text-xl">{destination.country}</p>
          </motion.div>

          <motion.button
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isFavorite ? "bg-red-500" : "bg-white/10 backdrop-blur-sm"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "text-white fill-current" : "text-white"}`} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

