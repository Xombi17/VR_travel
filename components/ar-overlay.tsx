"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Layers, X, Info, Clock, Sun, Cloud, Temperature } from "lucide-react"

interface ARPoint {
  id: string
  yaw: number
  pitch: number
  type: string
  title: string
  content: string
  icon?: string
}

interface AROverlayProps {
  points: ARPoint[]
  currentYaw: number
  currentPitch: number
  isEnabled: boolean
  onToggle: () => void
}

export function AROverlay({
  points,
  currentYaw,
  currentPitch,
  isEnabled,
  onToggle
}: AROverlayProps) {
  const [selectedPoint, setSelectedPoint] = useState<ARPoint | null>(null)
  const visiblePoints = useMemo(() => {
    // Filter points that are within the current view (with some margin)
    const viewRange = 40; // degrees
    return points.filter(point => {
      // Skip points with invalid coordinates
      if (isNaN(point.yaw) || isNaN(point.pitch)) {
        return false;
      }
      
      // Calculate angular distance between current view and point
      const yawDiff = Math.abs(((point.yaw - currentYaw + 180) % 360) - 180);
      const pitchDiff = Math.abs(point.pitch - currentPitch);
      
      // Return true if point is within view range
      return yawDiff < viewRange && pitchDiff < viewRange;
    });
  }, [points, currentYaw, currentPitch]);

  const getPointIcon = (type: string) => {
    switch (type) {
      case "info": return <Info className="h-4 w-4" />
      case "historical": return <Clock className="h-4 w-4" />
      case "weather": return <Cloud className="h-4 w-4" />
      case "time": return <Sun className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  // Convert spherical coordinates to screen coordinates
  const getScreenPosition = (yaw: number, pitch: number) => {
    const yawDiff = ((yaw - currentYaw + 540) % 360) - 180
    const pitchDiff = pitch - currentPitch

    // Convert to percentage of screen width/height
    const x = (yawDiff / 60) * 50 + 50 // 60° FOV
    const y = (pitchDiff / 40) * 50 + 50 // 40° FOV

    return { x, y }
  }

  return (
    <>
      {/* AR Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
        onClick={onToggle}
      >
        <Layers className="h-5 w-5" />
      </Button>

      {/* AR Points */}
      <AnimatePresence>
        {isEnabled && visiblePoints.map(point => {
          const { x, y } = getScreenPosition(point.yaw, point.pitch)
          return (
            <motion.button
              key={point.id}
              className="fixed transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setSelectedPoint(point)}
            >
              <div className="bg-black/80 backdrop-blur-sm text-white rounded-full p-2 shadow-lg
                           group-hover:bg-white/20 transition-colors">
                {getPointIcon(point.type)}
              </div>
            </motion.button>
          )
        })}
      </AnimatePresence>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-96 bg-black/80 backdrop-blur-xl
                     rounded-lg p-4 text-white shadow-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium">{selectedPoint.title}</h3>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  {getPointIcon(selectedPoint.type)}
                  <span>{selectedPoint.type.charAt(0).toUpperCase() + selectedPoint.type.slice(1)}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white"
                onClick={() => setSelectedPoint(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-white/90">{selectedPoint.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
