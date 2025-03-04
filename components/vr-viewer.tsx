"use client"

import { useEffect, useRef, useState } from "react"
import { Viewer } from "@photo-sphere-viewer/core"
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin"
import { Button } from "@/components/ui/button"
import { Loader2, Maximize, Minimize, Info, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface VRViewerProps {
  imageUrl: string
  title: string
  markers?: Array<{
    id: string
    position: [number, number]
    tooltip: string
    content?: string
  }>
}

export function VRViewer({ imageUrl, title, markers = [] }: VRViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Viewer | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeMarker, setActiveMarker] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize the viewer
    const markersPlugin = [[MarkersPlugin, {
      markers: markers.map(marker => ({
        id: marker.id,
        longitude: marker.position[0],
        latitude: marker.position[1],
        tooltip: marker.tooltip,
        content: marker.content,
        className: 'custom-marker',
      }))
    }]]

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: imageUrl,
      caption: title,
      loadingImg: '/images/loading-spinner.svg',
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,
      plugins: markersPlugin,
      navbar: [
        'autorotate',
        'zoom',
        'fullscreen',
        'caption',
      ]
    })

    viewerRef.current = viewer

    viewer.addEventListener('ready', () => {
      setIsLoading(false)
    })

    if (markers.length > 0) {
      const markersPluginInstance = viewer.getPlugin(MarkersPlugin) as MarkersPlugin
      
      markersPluginInstance.addEventListener('select-marker', (e) => {
        setActiveMarker(e.marker.id)
      })
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
      }
    }
  }, [imageUrl, title, markers])

  const toggleFullscreen = () => {
    if (!viewerRef.current) return
    
    if (!isFullscreen) {
      viewerRef.current.enterFullscreen()
    } else {
      viewerRef.current.exitFullscreen()
    }
    
    setIsFullscreen(!isFullscreen)
  }

  const closeMarkerInfo = () => {
    setActiveMarker(null)
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-10">
          <Loader2 className="w-10 h-10 text-teal-400 animate-spin" />
          <span className="ml-2 text-white text-lg">Loading VR Experience...</span>
        </div>
      )}
      
      <div ref={containerRef} className="w-full h-full" />
      
      <div className="absolute bottom-4 right-4 z-10 flex space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-slate-900/60 backdrop-blur-sm border-white/20 hover:bg-white/10"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {activeMarker && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-20 z-10 bg-slate-900/80 backdrop-blur-sm p-4 rounded-lg border border-white/10"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Info className="w-5 h-5 text-teal-400 mr-2" />
                <h4 className="text-white font-medium">
                  {markers.find(m => m.id === activeMarker)?.tooltip || 'Information'}
                </h4>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white/70 hover:text-white"
                onClick={closeMarkerInfo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-white/80 text-sm">
              {markers.find(m => m.id === activeMarker)?.content || 'No additional information available.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
