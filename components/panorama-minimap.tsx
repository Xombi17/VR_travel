"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Compass, MapPin } from "lucide-react"

interface Viewpoint {
  id: string
  name: string
  yaw: number
  pitch: number
  icon?: string
  description?: string
}

interface PanoramaMiniMapProps {
  viewpoints: Viewpoint[]
  currentYaw: number
  currentPitch: number
  onViewpointSelect: (yaw: number, pitch: number) => void
  className?: string
}

export function PanoramaMiniMap({
  viewpoints,
  currentYaw,
  currentPitch,
  onViewpointSelect,
  className = ""
}: PanoramaMiniMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Convert spherical coordinates to 2D map coordinates
  const getMapCoordinates = (yaw: number, pitch: number) => {
    // Map yaw (-180 to 180) to x (0 to 100%)
    const x = ((yaw + 180) / 360) * 100
    // Map pitch (-90 to 90) to y (0 to 100%)
    const y = ((pitch + 90) / 180) * 100
    return { x, y }
  }

  return (
    <motion.div
      className={`fixed bottom-24 right-4 bg-black/80 backdrop-blur-xl rounded-lg shadow-xl ${className}`}
      animate={{
        width: isExpanded ? 300 : 48,
        height: isExpanded ? 200 : 48
      }}
      transition={{ type: "spring", damping: 20 }}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 left-2 z-10"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Compass className="h-5 w-5" />
      </Button>

      {/* Map Content */}
      <motion.div
        className="relative w-full h-full p-2"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ delay: isExpanded ? 0.2 : 0 }}
      >
        {isExpanded && (
          <>
            <div className="absolute top-2 left-12">
              <h3 className="text-sm font-medium text-white">Navigation Map</h3>
              <p className="text-xs text-gray-400">Click points to navigate</p>
            </div>

            {/* Map Area */}
            <div
              ref={mapRef}
              className="absolute inset-12 border border-white/20 rounded bg-white/5"
            >
              {/* Current Position Indicator */}
              <motion.div
                className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-lg"
                style={{
                  left: `${getMapCoordinates(currentYaw, currentPitch).x}%`,
                  top: `${getMapCoordinates(currentYaw, currentPitch).y}%`,
                  transform: "translate(-50%, -50%)"
                }}
              />

              {/* Viewpoints */}
              {viewpoints.map((point) => {
                const { x, y } = getMapCoordinates(point.yaw, point.pitch)
                return (
                  <motion.button
                    key={point.id}
                    className="absolute w-6 h-6 group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                    onClick={() => onViewpointSelect(point.yaw, point.pitch)}
                    whileHover={{ scale: 1.2 }}
                  >
                    <MapPin className="w-full h-full text-white/70 group-hover:text-white" />
                    <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {point.name}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
