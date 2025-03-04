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
  Info,
  MapPin,
  Clock,
  Sunrise,
  Sun,
  Sunset,
  Moon
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
  const [selectedViewpoint, setSelectedViewpoint] = useState<ViewpointType | null>(null)
  const [showViewpointsList, setShowViewpointsList] = useState(false)
  const [showTimeControls, setShowTimeControls] = useState(false)
  const [selectedTimeView, setSelectedTimeView] = useState<TimeViewType | null>(
    timeViews && timeViews.length > 0 ? timeViews[0] : null
  )
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

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
      plugins: [MarkersPlugin]
    };
    
    try {
      // Create the viewer instance
      const viewer = new Viewer(viewerConfig);
      
      // Store viewer reference
      panoViewerRef.current = viewer;
      
      // Initialize markers after viewer is ready
      viewer.addEventListener('ready', () => {
        console.log('Viewer ready, initializing markers')
        
        const markersPlugin = viewer.getPlugin(MarkersPlugin);
        if (!markersPlugin) {
          console.error('Markers plugin not initialized');
          return;
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
        markersPlugin.addEventListener('select-marker', (event: any) => {
          const marker = event.marker
          console.log('Marker clicked:', marker)
          const hotspot = hotspots.find(h => h.text === marker.id)
          if (hotspot?.url) {
            window.open(hotspot.url, '_blank')
          }
        })
      })

      viewer.addEventListener('position-updated', (e: any) => {
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
    } catch (error) {
      console.error('Error initializing viewer:', error)
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

  // Handle time view change
  const handleTimeViewChange = (timeView: TimeViewType) => {
    setSelectedTimeView(timeView)
    setIsLoading(true)
    setLoadingProgress(0)
    
    // We would normally load a different panorama image here
    // For demo purposes, we'll just simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
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

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center z-20">
          <div className="bg-black/60 backdrop-blur-sm rounded-full p-1 flex items-center">
            {/* Viewpoints Button */}
            <button
              className={`p-2 rounded-full ${showViewpointsList ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => {
                setShowViewpointsList(!showViewpointsList)
                setShowTimeControls(false)
              }}
              title="Viewpoints"
            >
              <MapPin className="w-5 h-5 text-white" />
            </button>
            
            {/* Time of Day Button (Only show if timeViews are available) */}
            {timeViews && timeViews.length > 0 && (
              <button
                className={`p-2 rounded-full ${showTimeControls ? 'bg-white/20' : 'hover:bg-white/10'}`}
                onClick={() => {
                  setShowTimeControls(!showTimeControls)
                  setShowViewpointsList(false)
                }}
                title="Time of Day"
              >
                <Clock className="w-5 h-5 text-white" />
              </button>
            )}
            
            {/* Audio Button */}
            <button
              className={`p-2 rounded-full ${isAudioPlaying ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => {
                setIsAudioPlaying(!isAudioPlaying)
                setIsMuted(!isMuted)
              }}
              title={isAudioPlaying ? "Mute Audio" : "Play Audio"}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-5 h-5 text-white" />
              ) : (
                <VolumeX className="w-5 h-5 text-white" />
              )}
            </button>
            
            {/* Fullscreen Button */}
            <button
              className={`p-2 rounded-full hover:bg-white/10`}
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-white" />
              ) : (
                <Maximize2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
        
        {/* Viewpoints Panel */}
        <AnimatePresence>
          {showViewpointsList && viewpoints && viewpoints.length > 0 && (
            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-lg p-4 w-72 max-h-60 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h3 className="text-white font-medium mb-2">Key Viewpoints</h3>
              <div className="space-y-2">
                {viewpoints.map((viewpoint) => (
                  <button
                    key={viewpoint.id}
                    className={`w-full text-left p-2 rounded-md transition-colors ${
                      selectedViewpoint?.id === viewpoint.id
                        ? "bg-gradient-to-r from-teal-500/30 to-fuchsia-500/30 border border-teal-500/50"
                        : "hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setSelectedViewpoint(viewpoint)
                      goToViewpoint(viewpoint)
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 flex items-center justify-center mr-2">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{viewpoint.name}</div>
                        <div className="text-white/60 text-xs">{viewpoint.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Time Controls Panel */}
        <AnimatePresence>
          {showTimeControls && timeViews && timeViews.length > 0 && (
            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-lg p-4 w-72"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h3 className="text-white font-medium mb-2">Time of Day</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeViews.map((timeView) => (
                  <button
                    key={timeView.id}
                    className={`text-left p-2 rounded-md transition-colors ${
                      selectedTimeView?.id === timeView.id
                        ? "bg-gradient-to-r from-teal-500/30 to-fuchsia-500/30 border border-teal-500/50"
                        : "hover:bg-white/10"
                    }`}
                    onClick={() => handleTimeViewChange(timeView)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 flex items-center justify-center mr-2">
                        {timeView.icon === 'sunrise' && <Sunrise className="w-4 h-4 text-white" />}
                        {timeView.icon === 'noon' && <Sun className="w-4 h-4 text-white" />}
                        {timeView.icon === 'sunset' && <Sunset className="w-4 h-4 text-white" />}
                        {timeView.icon === 'night' && <Moon className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <div className="text-white font-medium">{timeView.name}</div>
                        <div className="text-white/60 text-xs">{timeView.time}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
