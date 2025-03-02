"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

// Mock related destinations
const relatedDestinations = {
  paris: [
    { id: "venice", name: "Venice", image: "/images/destinations/venice.jpg" },
    { id: "santorini", name: "Santorini", image: "/images/destinations/santorini.jpg" },
    { id: "kyoto", name: "Kyoto", image: "/images/destinations/kyoto.jpg" },
  ],
  "great-wall": [
    { id: "machu-picchu", name: "Machu Picchu", image: "/images/destinations/machu-picchu.jpg" },
    { id: "grand-canyon", name: "Grand Canyon", image: "/images/destinations/grand-canyon.jpg" },
    {
      id: "northern-lights",
      name: "Northern Lights",
      image: "/images/destinations/northern-lights.jpg",
    },
  ],
}

export default function RelatedDestinations({ id }: { id: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Get related destinations for this destination or use a default set
  const destinations = relatedDestinations[id as keyof typeof relatedDestinations] || [
    { id: "paris", name: "Paris", image: "/images/destinations/eiffel-tower.jpg" },
    { id: "great-wall", name: "Great Wall of China", image: "/images/destinations/great-wall.jpg" },
    { id: "santorini", name: "Santorini", image: "/images/destinations/santorini.jpg" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>

      <motion.div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {destinations.map((destination) => (
          <motion.div
            key={destination.id}
            className="group relative overflow-hidden rounded-xl"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <Link href={`/destinations/${destination.id}`} className="block">
              <div className="aspect-video relative overflow-hidden rounded-xl">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

