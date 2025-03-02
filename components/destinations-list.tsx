"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { DestinationCard } from "./destination-card"

// Mock data for destinations
const destinations = [
  {
    id: "paris",
    title: "Paris",
    country: "France",
    region: "Europe",
    categories: ["Urban Landscapes", "Historical", "Landmarks"],
    rating: 4.8,
    reviewCount: 1240,
    price: 1299,
    description:
      "Experience the romance of the City of Light with stunning views of the Eiffel Tower, Louvre Museum, and charming Parisian streets.",
  },
  {
    id: "great-wall",
    title: "Great Wall of China",
    country: "China",
    region: "Asia",
    categories: ["Historical", "Landmarks"],
    rating: 4.9,
    reviewCount: 890,
    price: 1599,
    description:
      "Walk along one of the world's most impressive architectural feats and take in breathtaking views of the surrounding mountains.",
  },
  {
    id: "santorini",
    title: "Santorini",
    country: "Greece",
    region: "Europe",
    categories: ["Beaches", "Cultural Sites"],
    rating: 4.7,
    reviewCount: 1120,
    price: 1199,
    description:
      "Explore the stunning white-washed buildings with blue domes overlooking the crystal-clear Aegean Sea.",
  },
  {
    id: "machu-picchu",
    title: "Machu Picchu",
    country: "Peru",
    region: "South America",
    categories: ["Historical", "Mountains", "Landmarks"],
    rating: 4.9,
    reviewCount: 950,
    price: 1499,
    description:
      "Discover the ancient Incan citadel set high in the Andes Mountains, surrounded by breathtaking cloud forests.",
  },
  {
    id: "northern-lights",
    title: "Northern Lights",
    country: "Iceland",
    region: "Europe",
    categories: ["Natural Wonders"],
    rating: 4.6,
    reviewCount: 780,
    price: 1399,
    description:
      "Witness the magical aurora borealis dancing across the night sky in one of the best locations to view this natural phenomenon.",
  },
  {
    id: "grand-canyon",
    title: "Grand Canyon",
    country: "USA",
    region: "North America",
    categories: ["Natural Wonders"],
    rating: 4.7,
    reviewCount: 1050,
    price: 999,
    description: "Marvel at the vast, colorful landscape of one of the world's most spectacular natural wonders.",
  },
  {
    id: "kyoto",
    title: "Kyoto",
    country: "Japan",
    region: "Asia",
    categories: ["Cultural Sites", "Historical"],
    rating: 4.8,
    reviewCount: 1180,
    price: 1699,
    description:
      "Step back in time as you explore ancient temples, traditional gardens, and historic geisha districts.",
  },
  {
    id: "venice",
    title: "Venice",
    country: "Italy",
    region: "Europe",
    categories: ["Urban Landscapes", "Cultural Sites"],
    rating: 4.6,
    reviewCount: 920,
    price: 1299,
    description:
      "Glide through the romantic canals of this unique floating city and admire its stunning architecture and bridges.",
  },
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "a-z", label: "A-Z" },
]

export default function DestinationsList() {
  const [sortBy, setSortBy] = useState("popular")
  const [showSortDropdown, setShowSortDropdown] = useState(false)

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

  // Sort destinations based on selected option
  const sortedDestinations = [...destinations].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "a-z":
        return a.title.localeCompare(b.title)
      default:
        return 0 // "popular" - keep original order
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white hidden lg:block">Destinations</h2>

        <div className="relative ml-auto">
          <button
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span>Sort by: {sortOptions.find((option) => option.value === sortBy)?.label}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg z-10 overflow-hidden">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortBy === option.value ? "bg-cyan-500/20 text-white" : "text-white/80 hover:bg-white/10"
                  }`}
                  onClick={() => {
                    setSortBy(option.value)
                    setShowSortDropdown(false)
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedDestinations.map((destination) => (
          <motion.div
            key={destination.id}
            variants={itemVariants}
          >
            <DestinationCard
              id={destination.id}
              title={destination.title}
              description={destination.description}
              price={destination.price}
              rating={destination.rating}
              reviewCount={destination.reviewCount}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

