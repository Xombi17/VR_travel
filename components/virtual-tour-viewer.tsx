"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Glasses, 
  Info 
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Viewer } from '@photo-sphere-viewer/core'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import type { Marker } from '@photo-sphere-viewer/markers-plugin'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/markers-plugin/index.css'
import { LocationInfoPanel } from "@/components/location-info-panel"
import { PanoramaMiniMap } from "@/components/panorama-minimap"
import { AROverlay } from "@/components/ar-overlay"
import { SocialFeatures } from "@/components/social-features"
import { TimeSelector } from "@/components/time-selector"
import { LoadingOverlay } from "@/components/loading-overlay"
import { PanoramaPreloader } from "@/components/panorama-preloader"
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

interface MarkerData extends Marker {
  id: string;
  longitude: number;
  latitude: number;
  html: string;
  anchor: string;
  scale: [number, number];
  className: string;
  style: {
    cursor: string;
    zIndex: number;
  };
}

type ViewerConfig = {
  element: HTMLDivElement;
  panorama: string;
  defaultZoomLvl: number;
  minFov: number;
  maxFov: number;
  moveInertia: boolean;
  mousewheel: boolean;
  mousemove: boolean;
  moveSpeed: number;
  zoomSpeed: number;
  navbar: boolean;
  defaultYaw: number;
  fisheye: boolean;
  loadingImg?: string;
  loadingTxt?: string;
  plugins?: any[];
  sphereCorrection?: {
    pan: number;
    tilt: number;
    roll: number;
  };
  panoData?: {
    fullWidth: number;
    fullHeight: number;
    croppedWidth: number;
    croppedHeight: number;
    croppedX: number;
    croppedY: number;
  };
  transition?: {
    duration: number;
    timingFunction: string;
  };
};

interface AbstractPlugin<T> {
  clearMarkers?: () => void;
  addMarker?: (marker: MarkerData) => void;
  // ... other properties ...
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
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [showLocationInfo, setShowLocationInfo] = useState(false)
  const [showAR, setShowAR] = useState(false)
  const [currentTimeView, setCurrentTimeView] = useState(timeViews[0]?.id)
  const [currentYaw, setCurrentYaw] = useState(0)
  const [currentPitch, setCurrentPitch] = useState(0)

  // Preload all panorama images
  useEffect(() => {
    const imagesToPreload = [
      panoramaUrl,
      ...timeViews.map(view => view.imageUrl)
    ]
    setLoadingProgress(0)
  }, [panoramaUrl, timeViews])

  // Initialize panorama viewer
  useEffect(() => {
    if (!viewerRef.current || panoViewerRef.current) return

    console.log('Initializing viewer with hotspots:', hotspots)

    // Create the viewer with smooth movement
    const viewerConfig = {
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
      defaultYaw: 0,
      fisheye: true,
      loadingImg: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      loadingTxt: 'Loading...',
      plugins: [[MarkersPlugin, {
        markers: [] // Initialize with empty markers array
      }]],
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
      transition: {
        duration: 1000,
        timingFunction: 'ease-out'
      }
    };
    
    // Use type assertion to bypass TypeScript checking
    const viewer = new Viewer(viewerConfig as any);

    // Store viewer reference
    panoViewerRef.current = viewer

    // Initialize markers after viewer is ready
    (viewer as any).addEventListener('ready', () => {
      console.log('Viewer ready, initializing markers')
      
      const markersPlugin = (viewer as any).getPlugin(MarkersPlugin)
      if (!markersPlugin) {
        console.error('Markers plugin not initialized')
        return
      }

      // Clear any existing markers
      markersPlugin.clearMarkers()
      
      // Add markers one by one with delay to ensure proper initialization
      hotspots.forEach((hotspot, index) => {
        setTimeout(() => {
          try {
            // Convert degrees to radians
            const longitude = hotspot.yaw * Math.PI / 180
            const latitude = hotspot.pitch * Math.PI / 180
            
            console.log(`Adding marker for ${hotspot.text}:`, {
              original: { yaw: hotspot.yaw, pitch: hotspot.pitch },
              converted: { longitude, latitude }
            })

            const markerData: MarkerData = {
              id: hotspot.text,
              longitude,
              latitude,
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
            }

            markersPlugin.addMarker(markerData)
          } catch (error) {
            console.error(`Error adding marker for ${hotspot.text}:`, error)
          }
        }, index * 100) // Add 100ms delay between each marker
      })

      // Add click handler for markers
      (markersPlugin as any).addEventListener('select-marker', (event: any) => {
        const marker = event.marker
        console.log('Marker clicked:', marker)
        const hotspot = hotspots.find(h => h.text === marker.id)
        if (hotspot?.url) {
          window.open(hotspot.url, '_blank')
        }
      })
    })

    (viewer as any).addEventListener('position-updated', (e: any) => {
      setCurrentYaw(e.longitude * 180 / Math.PI)
      setCurrentPitch(e.latitude * 180 / Math.PI)
    })

    // Cleanup
    return () => {
      console.log('Cleaning up viewer')
      if (panoViewerRef.current) {
        panoViewerRef.current.destroy()
        panoViewerRef.current = null
      }
    }
  }, [panoramaUrl, hotspots])

  // Handle viewpoint navigation
  const goToViewpoint = (viewpoint: typeof viewpoints[0]) => {
    if (!panoViewerRef.current) return

    panoViewerRef.current.animate({
      longitude: viewpoint.yaw * Math.PI / 180,
      latitude: viewpoint.pitch * Math.PI / 180,
      zoom: 50,
      speed: '2rpm',
    })
  }

  return (
    <>
      <PanoramaPreloader
        urls={[panoramaUrl, ...timeViews.map(view => view.imageUrl)]}
        onProgress={setLoadingProgress}
        onComplete={() => setIsLoading(false)}
      />

      <AnimatePresence>
        {isLoading && (
          <LoadingOverlay progress={loadingProgress} message="Loading panorama..." />
        )}
      </AnimatePresence>

      <div className={cn("relative w-full aspect-video bg-black", className)}>
        <div ref={viewerRef} className="w-full h-full" />

        {/* Controls */}
        <motion.div
          initial={false}
          animate={{ opacity: showControls ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent pointer-events-none"
        >
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Audio controls */}
            {audioUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            )}

            {/* Location info */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setShowLocationInfo(!showLocationInfo)}
            >
              <Info className="w-5 h-5" />
            </Button>

            {/* AR toggle */}
            {arPoints.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setShowAR(!showAR)}
              >
                <Glasses className="w-5 h-5" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Reset view */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => {
                if (panoViewerRef.current) {
                  panoViewerRef.current.animate({
                    longitude: 0,
                    latitude: 0,
                    zoom: 50,
                    speed: '2rpm',
                  })
                }
              }}
            >
              <RotateCcw className="w-5 h-5" />
            </Button>

            {/* Fullscreen toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </Button>
          </div>
        </motion.div>

        {/* Location info panel */}
        <AnimatePresence>
          {showLocationInfo && (
            <LocationInfoPanel
              title={locationInfo.title}
              description={locationInfo.description}
              bestTimeToVisit={locationInfo.bestTimeToVisit}
              weather={locationInfo.weather}
              facts={locationInfo.facts}
              nearbyPlaces={locationInfo.nearbyPlaces}
              onClose={() => setShowLocationInfo(false)}
            />
          )}
        </AnimatePresence>

        {/* AR overlay */}
        <AnimatePresence>
          {showAR && (
            <AROverlay
              points={arPoints}
              currentYaw={currentYaw}
              currentPitch={currentPitch}
              onToggle={() => setShowAR(!showAR)}
            />
          )}
        </AnimatePresence>

        {/* Time selector */}
        {timeViews.length > 0 && (
          <TimeSelector
            views={timeViews}
            currentView={currentTimeView}
            onSelect={setCurrentTimeView}
          />
        )}

        {/* Mini map */}
        <PanoramaMiniMap
          viewpoints={viewpoints}
          currentYaw={currentYaw}
          currentPitch={currentPitch}
          onSelect={goToViewpoint}
        />

        {/* Social features */}
        <SocialFeatures panoramaId={panoramaId} />

        {/* Audio */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            loop
            muted={isMuted}
            className="hidden"
          />
        )}
      </div>
    </>
  )
}
