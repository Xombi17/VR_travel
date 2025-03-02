"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Clock, Users, Info } from "lucide-react"

// Mock data for destinations
const destinationsData = {
  paris: {
    description:
      'Paris, the capital of France, is known as the "City of Light" and is one of the world\'s most visited destinations. Famous for its iconic Eiffel Tower, world-class museums like the Louvre, and charming neighborhoods like Montmartre, Paris offers a perfect blend of history, culture, and romance. Stroll along the Seine River, explore the Gothic masterpiece of Notre-Dame Cathedral, and indulge in exquisite French cuisine at local bistros.',
    bestTimeToVisit: "April to June, September to October",
    duration: "2-3 hours",
    languages: ["English", "French", "Spanish", "German"],
    accessibility: "Wheelchair accessible",
    facts: [
      "The Eiffel Tower was built for the 1889 World's Fair",
      "Paris has over 100 museums",
      "The Louvre is the world's largest art museum",
      "Paris has 37 bridges crossing the Seine River",
    ],
  },
  "great-wall": {
    description:
      "The Great Wall of China is one of the most impressive architectural feats in human history, stretching over 13,000 miles across northern China. Built over centuries by various dynasties to protect against invasions, this UNESCO World Heritage site offers breathtaking views of the surrounding mountains and landscapes. Visitors can explore restored sections like Badaling and Mutianyu, or venture to less-crowded areas for a more authentic experience.",
    bestTimeToVisit: "April to May, September to October",
    duration: "2-3 hours",
    languages: ["English", "Chinese", "Japanese"],
    accessibility: "Some sections not wheelchair accessible",
    facts: [
      "Construction began over 2,300 years ago",
      "It's not visible from space with the naked eye, contrary to popular belief",
      "The wall is not a single continuous structure",
      "Over 1 million workers died during its construction",
    ],
  },
}

interface Destination {
  description: string;
  bestTimeToVisit: string;
  duration: string;
  languages: string[];
  accessibility: string;
  facts: string[];
  // Optional properties that might be in the destinationsData
  id?: string;
  name?: string;
  location?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  tabs?: {
    overview?: {
      content?: string;
      facts?: Array<{ label: string; value: string }>;
    };
    history?: {
      content?: string;
      timeline?: Array<{ year: string; event: string }>;
    };
    tips?: {
      content?: string;
      items?: string[];
    };
  };
}

export default function DestinationDetails({ id }: { id: string }) {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // In a real app, this would be an API call
    setDestination(
      destinationsData[id as keyof typeof destinationsData] || {
        description: "No description available for this destination.",
        bestTimeToVisit: "Year-round",
        duration: "1-2 hours",
        languages: ["English"],
        accessibility: "Information not available",
        facts: ["No facts available for this destination."],
      },
    )
  }, [id])

  if (!destination) return null

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "facts", label: "Quick Facts", icon: Info },
  ]

  return (
    <section className="mb-16">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex overflow-x-auto mb-6 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap mr-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "bg-white/10 text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[200px]">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <p className="text-white/80 mb-6 leading-relaxed">{destination.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Best Time to Visit</h3>
                    <p className="text-white/70">{destination.bestTimeToVisit}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Experience Duration</h3>
                    <p className="text-white/70">{destination.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Available Languages</h3>
                    <p className="text-white/70">{destination.languages.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Accessibility</h3>
                    <p className="text-white/70">{destination.accessibility}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "facts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <ul className="space-y-4">
                {destination.facts.map((fact: string, index: number) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-white/80">{fact}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

