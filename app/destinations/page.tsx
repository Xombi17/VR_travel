"use client"

import { useState, useEffect, ChangeEvent } from "react"
import Image from "next/image"
import { motion, useScroll } from "framer-motion"
import { DestinationCard } from "@/components/destination-card"
import { destinations } from "@/data/destinations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoadingAnimation } from "@/components/loading-animation"

export default function DestinationsPage() {
  // Group destinations by category
  const destinationsByCategory = destinations.reduce((acc: Record<string, typeof destinations>, destination: typeof destinations[0]) => {
    const { category } = destination
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(destination)
    return acc
  }, {} as Record<string, typeof destinations>)

  // Get unique categories
  const categories = Object.keys(destinationsByCategory)
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter destinations based on category and search query
    setIsLoading(true)
    
    let filtered = destinations
    
    if (selectedCategory) {
      filtered = filtered.filter(dest => dest.category === selectedCategory)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(dest => 
        dest.title.toLowerCase().includes(query) || 
        dest.description.toLowerCase().includes(query)
      )
    }
    
    // Add a small delay to show loading animation
    const timer = setTimeout(() => {
      setFilteredDestinations(filtered)
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery])

  // Group filtered destinations by category
  const filteredDestinationsByCategory = filteredDestinations.reduce((acc, destination) => {
    const { category } = destination
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(destination)
    return acc
  }, {} as Record<string, typeof destinations>)

  // Get categories that have destinations after filtering
  const filteredCategories = Object.keys(filteredDestinationsByCategory)

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="relative h-[400px] rounded-lg overflow-hidden mb-12 glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/destinations-header.jpg"
            alt="Explore Destinations"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-slate-900/30 backdrop-filter backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <motion.h1 
                className="text-5xl font-bold mb-6 gradient-text neon-glow"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore Destinations
              </motion.h1>
              <motion.p 
                className="text-xl max-w-2xl mb-8 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Discover amazing virtual travel experiences around the world
              </motion.p>
              <motion.div 
                className="max-w-md mx-auto glass-effect rounded-full p-2 pl-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search destinations..."
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/50"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mb-8 flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className={`hover-scale ${selectedCategory === null ? 'bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900' : 'glass-effect border-white/20 hover:bg-white/10'}`}
          >
            All Destinations
          </Button>
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`hover-scale ${selectedCategory === category ? 'bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900' : 'glass-effect border-white/20 hover:bg-white/10'}`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {isLoading ? (
          <LoadingAnimation />
        ) : filteredDestinations.length === 0 ? (
          <motion.div 
            className="text-center py-12 glass-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 gradient-text">No destinations found</h2>
            <p className="text-white/70">Try adjusting your search or filter criteria</p>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6 gradient-text border-b border-white/10 pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDestinationsByCategory[category].map((destination, index) => (
                    <motion.div
                      key={destination.id}
                      className="h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileInView={{
                        y: [20, -20 * (index % 3), 0],
                        transition: {
                          duration: 0.8,
                          ease: "easeOut",
                        }
                      }}
                      viewport={{ once: false, margin: "-100px" }}
                    >
                      <DestinationCard
                        id={destination.id}
                        title={destination.title}
                        description={destination.description}
                        imagePath={destination.imagePath}
                        rating={destination.rating}
                        reviewCount={destination.reviewCount}
                        hasVRExperience={destination.hasVRExperience}
                        price={destination.price}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
