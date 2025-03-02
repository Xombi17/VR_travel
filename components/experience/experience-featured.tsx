"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const featuredExperiences = [
  {
    id: "paris-vr",
    title: "Paris: City of Lights",
    description: "Experience the magic of Paris with stunning views from the Eiffel Tower, a walk along the Seine, and a visit to the Louvre.",
    image: "/images/experiences/paris-vr.jpg",
    rating: 4.9,
    reviews: 128,
    price: 29.99,
    vrLink: "/vr-viewer?destination=paris"
  },
  {
    id: "kyoto-vr",
    title: "Kyoto: Ancient Japan",
    description: "Explore traditional temples, serene gardens, and historic districts in this immersive tour of Kyoto.",
    image: "/images/experiences/kyoto-vr.jpg",
    rating: 4.8,
    reviews: 96,
    price: 34.99,
    vrLink: "/vr-viewer?destination=kyoto"
  },
  {
    id: "grand-canyon-vr",
    title: "Grand Canyon Adventure",
    description: "Witness the breathtaking scale and beauty of the Grand Canyon from impossible vantage points.",
    image: "/images/experiences/grand-canyon-vr.jpg",
    rating: 4.7,
    reviews: 112,
    price: 24.99,
    vrLink: "/vr-viewer?destination=grand-canyon"
  }
]

export default function ExperienceFeatured() {
  return (
    <section className="mb-20">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Featured Experiences</h2>
        <Link 
          href="/vr-viewer" 
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Try VR Viewer →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredExperiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-48 w-full">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
              <p className="text-white/70 mb-4">{experience.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-medium">{experience.rating}</span>
                  <span className="text-white/50 ml-1">({experience.reviews})</span>
                </div>
                <div className="text-cyan-400 font-bold">${experience.price}</div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Link 
                  href={`/experience/${experience.id}`}
                  className="block flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 text-center rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Explore
                </Link>
                <Link 
                  href={experience.vrLink}
                  className="block px-4 bg-white/10 backdrop-blur-sm text-white py-2 text-center rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  VR View
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 