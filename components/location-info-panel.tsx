"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock, Cloud, MapPin, Calendar, Info, X } from "lucide-react"
import Image from "next/image"

interface LocationInfo {
  title: string
  description: string
  bestTimeToVisit: string
  weather: {
    current: string
    temp: string
    conditions: string
  }
  facts: string[]
  nearbyPlaces: Array<{
    name: string
    distance: string
    image?: string
  }>
}

interface LocationInfoPanelProps {
  info?: LocationInfo
  isOpen: boolean
  onClose: () => void
}

export function LocationInfoPanel({ info, isOpen, onClose }: LocationInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'nearby'>('info')

  if (!info) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 20 }}
          className="absolute top-0 right-0 h-full w-[400px] bg-black/80 backdrop-blur-xl text-white p-6 shadow-2xl z-50"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{info.title}</h2>
              <p className="text-sm text-gray-300 mt-1">{info.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === 'info' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('info')}
              className="flex-1"
            >
              <Info className="h-4 w-4 mr-2" />
              Information
            </Button>
            <Button
              variant={activeTab === 'nearby' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('nearby')}
              className="flex-1"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Nearby Places
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'info' ? (
              <>
                {/* Weather */}
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">Current Weather</p>
                      <p className="text-2xl font-bold">{info.weather.temp}</p>
                      <p className="text-sm">{info.weather.conditions}</p>
                    </div>
                    <Cloud className="h-10 w-10 text-blue-400" />
                  </div>
                </div>

                {/* Best Time to Visit */}
                <div>
                  <div className="flex items-center gap-2 mb-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <h3 className="font-medium">Best Time to Visit</h3>
                  </div>
                  <p className="text-sm">{info.bestTimeToVisit}</p>
                </div>

                {/* Interesting Facts */}
                <div>
                  <h3 className="font-medium text-gray-300 mb-3">Interesting Facts</h3>
                  <ul className="space-y-2">
                    {info.facts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                {info.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4 last:mb-0">
                    {place.image && (
                      <Image
                        src={place.image}
                        alt={place.name}
                        width={80}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-white">{place.name}</h4>
                      <p className="text-sm text-white/60">{place.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
