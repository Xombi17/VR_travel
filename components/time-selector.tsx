"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Clock, Sun, Moon, CloudSun, CloudMoon } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface TimeView {
  id: string
  name: string
  time: string
  icon: string
  imageUrl: string
}

interface TimeSelectorProps {
  views: TimeView[]
  currentView: string
  onViewChange: (viewId: string) => void
}

export function TimeSelector({
  views,
  currentView,
  onViewChange
}: TimeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState(12) // 24-hour format

  const getTimeIcon = (icon: string) => {
    switch (icon) {
      case "sunrise": return <CloudSun className="h-5 w-5" />
      case "morning": return <Sun className="h-5 w-5" />
      case "noon": return <Sun className="h-5 w-5" />
      case "afternoon": return <Sun className="h-5 w-5" />
      case "sunset": return <CloudSun className="h-5 w-5" />
      case "night": return <Moon className="h-5 w-5" />
      default: return <Sun className="h-5 w-5" />
    }
  }

  // Convert 24-hour time to nearest view
  const handleTimeChange = (value: number) => {
    setTimeOfDay(value)
    
    // Find the closest time view
    const timeMap: { [key: string]: number } = {
      sunrise: 6,
      morning: 9,
      noon: 12,
      afternoon: 15,
      sunset: 18,
      night: 21
    }

    let closestView = views[0]
    let smallestDiff = 24

    views.forEach(view => {
      const viewTime = timeMap[view.icon] || 12
      const diff = Math.abs(value - viewTime)
      if (diff < smallestDiff) {
        smallestDiff = diff
        closestView = view
      }
    })

    onViewChange(closestView.id)
  }

  return (
    <motion.div
      className="fixed bottom-24 right-24 bg-black/80 backdrop-blur-xl rounded-lg shadow-xl"
      animate={{
        width: isExpanded ? 300 : 48,
        height: isExpanded ? "auto" : 48
      }}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 left-2 text-white hover:text-white/70"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Clock className="h-5 w-5" />
      </Button>

      {/* Time Selection Interface */}
      {isExpanded && (
        <div className="p-4 pt-14">
          <div className="space-y-6">
            {/* Time Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">Time of Day</span>
                <span className="text-sm text-white">
                  {timeOfDay.toString().padStart(2, "0")}:00
                </span>
              </div>
              <Slider
                value={[timeOfDay]}
                min={0}
                max={24}
                step={1}
                onValueChange={([value]) => handleTimeChange(value)}
              />
            </div>

            {/* Quick Select Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {views.map(view => (
                <Button
                  key={view.id}
                  variant={currentView === view.id ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2"
                  onClick={() => onViewChange(view.id)}
                >
                  {getTimeIcon(view.icon)}
                  <span className="text-xs">{view.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
