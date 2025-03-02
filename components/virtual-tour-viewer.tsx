"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Maximize2, Minimize2, VolumeX, Volume2, Compass, Glasses, RotateCcw, ZoomIn, ZoomOut, Info, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Viewer } from '@photo-sphere-viewer/core'
import '@photo-sphere-viewer/core/index.css'
import { LocationInfoPanel } from "@/components/location-info-panel"
import { PanoramaMiniMap } from "@/components/panorama-minimap"
import { AmbientAudioSystem } from "@/components/ambient-audio-system"
import { AROverlay } from "@/components/ar-overlay"
import { SocialFeatures } from "@/components/social-features"
import { TimeSelector } from "@/components/time-selector"
import { cn } from "@/lib/utils"

interface VirtualTourViewerProps {
  panoramaId: string
  panoramaUrl: string
  title: string
  audioUrl?: string
  locationInfo: {
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
  viewpoints: Array<{
    id: string
    name: string
    yaw: number
    pitch: number
    description?: string
  }>
  arPoints: Array<{
    id: string
    yaw: number
    pitch: number
    type: string
    title: string
    content: string
  }>
  timeViews: Array<{
    id: string
    name: string
    time: string
    icon: string
    imageUrl: string
  }>
  ambientSounds: Array<{
    id: string
    url: string
    volume: number
    loop?: boolean
  }>
  hotspots?: Array<{
    pitch: number
    yaw: number
    text: string
    description?: string
    image?: string
    url?: string
  }>
  className?: string
}

export function VirtualTourViewer({
  panoramaId,
  panoramaUrl,
  title,
  audioUrl,
  locationInfo,
  viewpoints = [],
  arPoints = [],
  timeViews = [],
  ambientSounds = [],
  hotspots = [],
  className = "",
}: VirtualTourViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const panoViewerRef = useRef<Viewer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [showLocationInfo, setShowLocationInfo] = useState(false)
  const [showAR, setShowAR] = useState(false)
  const [currentTimeView, setCurrentTimeView] = useState(timeViews[0]?.id)
  const [currentYaw, setCurrentYaw] = useState(0)
  const [currentPitch, setCurrentPitch] = useState(0)

  // Initialize panorama viewer
  useEffect(() => {
    if (!viewerRef.current || panoViewerRef.current) return

    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: panoramaUrl,
      defaultZoomLvl: 0,
      minFov: 30,
      maxFov: 90,
      moveInertia: true,
      mousewheel: true,
      mousemove: true,
      moveSpeed: 1.5,
      zoomSpeed: 1,
      navbar: false,
      defaultLat: 0,
      defaultLong: 0,
      fisheye: true,
      sphereCorrection: {
        pan: 0,
        tilt: 0,
        roll: 0
      },
      panoData: {
        fullWidth: 8192,
        fullHeight: 4096,
        croppedWidth: 8192,
        croppedHeight: 4096,
        croppedX: 0,
        croppedY: 0
      },
      markers: hotspots.map(hotspot => ({
        id: hotspot.text,
        longitude: hotspot.yaw * Math.PI / 180,
        latitude: hotspot.pitch * Math.PI / 180,
        html: `
          <div class="group relative">
            <div class="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              <div class="w-2 h-2 bg-white rounded-full animate-ping absolute"></div>
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:translate-y-0 translate-y-2">
              <div class="bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
                <div class="text-sm font-medium text-white whitespace-nowrap">${hotspot.text}</div>
                ${hotspot.description ? `
                  <div class="text-xs text-gray-300 mt-1 max-w-[200px]">${hotspot.description}</div>
                ` : ''}
                ${hotspot.image ? `
                  <div class="mt-2 rounded-md overflow-hidden">
                    <img src="${hotspot.image}" alt="${hotspot.text}" class="w-full h-24 object-cover" />
                  </div>
                ` : ''}
                ${hotspot.url ? `
                  <button class="mt-2 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors">
                    Learn More
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `,
        anchor: 'center center',
        scale: [1, 1],
        className: 'hotspot-marker',
        style: {
          cursor: hotspot.url ? 'pointer' : 'default',
          zIndex: 10,
        }
      }))
    })

    viewer.addEventListener('ready', () => {
      setIsLoading(false)
    })

    viewer.addEventListener('click-marker', ({ marker }) => {
      const hotspot = hotspots.find(h => h.text === marker.id)
      if (hotspot?.url) {
        window.open(hotspot.url, '_blank')
      }
    })

    panoViewerRef.current = viewer

    return () => {
      viewer.destroy()
      panoViewerRef.current = null
    }
  }, [panoramaUrl, hotspots])

  // Update position tracking
  useEffect(() => {
    if (!panoViewerRef.current) return

    const updatePosition = () => {
      const position = panoViewerRef.current?.getPosition()
      if (position) {
        setCurrentYaw(position.yaw)
        setCurrentPitch(position.pitch)
      }
    }

    const interval = setInterval(updatePosition, 100)
    return () => clearInterval(interval)
  }, [panoViewerRef.current])

  // Handle viewpoint selection
  const handleViewpointSelect = (yaw: number, pitch: number) => {
    panoViewerRef.current?.animate({
      yaw: yaw,
      pitch: pitch,
      speed: '10rpm'
    })
  }

  // Handle time view changes
  const handleTimeViewChange = (viewId: string) => {
    const view = timeViews.find(v => v.id === viewId)
    if (view) {
      setCurrentTimeView(viewId)
      // Update panorama image
      panoViewerRef.current?.setPanorama(view.imageUrl)
    }
  }

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!viewerRef.current) return

    if (!isFullscreen) {
      if (viewerRef.current.requestFullscreen) {
        viewerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle audio toggle
  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.volume = 0.5
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }

    setIsMuted(!isMuted)
  }

  // Reset view
  const resetView = () => {
    if (panoViewerRef.current) {
      panoViewerRef.current.animate({
        zoom: 0,
        latitude: 0,
        longitude: 0,
        speed: '2rpm',
        easing: 'easeInOutCubic'
      }).then(() => {
        if (panoViewerRef.current) {
          panoViewerRef.current.zoom(0);
        }
      });
    }
  };

  // Call reset on initial load
  useEffect(() => {
    if (panoViewerRef.current && !isLoading) {
      resetView();
    }
  }, [isLoading]);

  // Zoom controls
  const zoomIn = () => {
    if (panoViewerRef.current) {
      const currentZoom = panoViewerRef.current.getZoomLevel()
      panoViewerRef.current.zoom(currentZoom + 20)
    }
  }

  const zoomOut = () => {
    if (panoViewerRef.current) {
      const currentZoom = panoViewerRef.current.getZoomLevel()
      panoViewerRef.current.zoom(currentZoom - 20)
    }
  }

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMovement = () => {
      setShowControls(true)
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    window.addEventListener("mousemove", handleMovement)
    window.addEventListener("touchstart", handleMovement)

    // Initial timeout
    timeout = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener("mousemove", handleMovement)
      window.removeEventListener("touchstart", handleMovement)
    }
  }, [])

  return (
    <TooltipProvider>
      <div
        ref={viewerRef}
        className={cn(
          "relative overflow-hidden rounded-xl",
          className
        )}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Panorama Viewer */}
        <div 
          className="w-full h-full aspect-[2/1] bg-gray-900 [&_.psv-container]:!h-full [&_.psv-container]:!w-full [&_.psv-container]:!overflow-hidden"
          style={{ 
            minHeight: '400px',
            position: 'relative'
          }}
        />

        {/* Audio Element (if provided) */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            loop
            muted={isMuted}
            className="hidden"
          />
        )}

        {/* Loading Overlay */}
        <AnimatePresence mode="sync">
          {isLoading && (
            <motion.div
              key="loading-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium">Loading panorama...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Features */}
        <SocialFeatures
          panoramaId={panoramaId}
          title={title}
          currentView={{ yaw: currentYaw, pitch: currentPitch }}
        />

        {/* AR Overlay */}
        <AROverlay
          points={arPoints}
          currentYaw={currentYaw}
          currentPitch={currentPitch}
          isEnabled={showAR}
          onToggle={() => setShowAR(!showAR)}
        />

        {/* Ambient Audio */}
        <AmbientAudioSystem
          tracks={ambientSounds}
          isEnabled={!isMuted}
          onToggle={() => setIsMuted(!isMuted)}
        />

        {/* Time Selector */}
        <TimeSelector
          views={timeViews}
          currentView={currentTimeView}
          onViewChange={handleTimeViewChange}
        />

        {/* Controls */}
        <AnimatePresence mode="sync">
          {showControls && (
            <motion.div
              key="controls-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              {audioUrl && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                      onClick={toggleAudio}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isMuted ? "Unmute" : "Mute"} audio</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    onClick={zoomIn}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom in</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    onClick={zoomOut}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom out</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    onClick={resetView}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset view</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFullscreen ? "Exit" : "Enter"} fullscreen</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    onClick={() => setShowLocationInfo(true)}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Location Information</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini Map */}
        <PanoramaMiniMap
          viewpoints={viewpoints}
          currentYaw={currentYaw}
          currentPitch={currentPitch}
          onViewpointSelect={handleViewpointSelect}
        />

        {/* Location Info Panel */}
        <LocationInfoPanel
          info={locationInfo}
          isOpen={showLocationInfo}
          onClose={() => setShowLocationInfo(false)}
        />
      </div>
    </TooltipProvider>
  )
}
