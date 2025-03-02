"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MapPin, Star } from "lucide-react"

const destinations = [
  { 
    id: 1,
    name: "Eiffel Tower", 
    location: "Paris, France",
    image: "/images/destinations/eiffel-tower.jpg",
    rating: 4.8,
    description: "Experience the iconic symbol of Paris in virtual reality. Climb to the top and enjoy panoramic views of the city."
  },
  { 
    id: 2,
    name: "Great Wall of China", 
    location: "China",
    image: "/images/destinations/great-wall.jpg",
    rating: 4.9,
    description: "Walk along one of the world's most impressive architectural feats spanning thousands of miles."
  },
  { 
    id: 3,
    name: "Taj Mahal", 
    location: "Agra, India",
    image: "/images/destinations/taj-mahal.jpg",
    rating: 4.7,
    description: "Explore this magnificent marble mausoleum and learn about its fascinating history and architecture."
  },
  { 
    id: 4,
    name: "Santorini", 
    location: "Greece",
    image: "/images/destinations/santorini.jpg",
    rating: 4.8,
    description: "Wander through the stunning white-washed buildings and blue domes overlooking the Aegean Sea."
  },
  { 
    id: 5,
    name: "Machu Picchu", 
    location: "Peru",
    image: "/images/destinations/machu-picchu.jpg",
    rating: 4.9,
    description: "Discover the ancient Incan citadel set high in the Andes Mountains with breathtaking views."
  },
  { 
    id: 6,
    name: "Northern Lights", 
    location: "Iceland",
    image: "/images/destinations/northern-lights.jpg",
    rating: 4.9,
    description: "Witness the magical aurora borealis dancing across the night sky in stunning virtual reality."
  }
]

export default function FeaturedDestinations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Destinations</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover our most popular virtual destinations. Immerse yourself in breathtaking locations from around the
            world without leaving your home.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {destinations.slice(0, 3).map((destination) => (
            <motion.div
              key={destination.id}
              className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-xl">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1 text-cyan-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{destination.name}</h3>
                
                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-medium">{destination.rating}</span>
                  </div>
                  
                  <span className="text-white/60 text-sm">1,200+ visitors</span>
                </div>

                <Link href={`/destinations/${destination.id}`}>
                  <motion.button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore in VR
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/destinations">
            <motion.button 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 px-8 rounded-full font-medium hover:bg-white/20 transition-colors flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

