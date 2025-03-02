"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: "adventure",
    name: "Adventure",
    image: "/images/categories/adventure.jpg",
    count: 12
  },
  {
    id: "cultural",
    name: "Cultural Experiences",
    image: "/images/categories/cultural.jpg",
    count: 18
  },
  {
    id: "urban",
    name: "Urban Escapes",
    image: "/images/categories/urban.jpg",
    count: 15
  },
  {
    id: "natural",
    name: "Natural Wonders",
    image: "/images/categories/natural.jpg",
    count: 20
  }
]

export default function ExperienceCategories() {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-8">Explore by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="relative rounded-xl overflow-hidden group"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-square relative">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
              <p className="text-white/70 text-sm">{category.count} experiences</p>
              <Link href={`/experience/${category.id}`}>
                <button className="mt-4 bg-white/10 backdrop-blur-sm text-white text-sm py-2 px-4 rounded-full border border-white/20 w-full hover:bg-white/20 transition-colors">
                  Explore
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 