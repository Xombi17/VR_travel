"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Expand, Minimize, RotateCcw, Headset } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PanoramaViewerProps {
  imageUrl: string
  title?: string
  autoRotate?: boolean
  initialYaw?: number
  initialPitch?: number
  initialHfov?: number
}

export default function PanoramaViewer({
  imageUrl,
  title,
  autoRotate = true,
  initialYaw = 0,
  initialPitch = 0,
  initialHfov = 100,
}: PanoramaViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isVRMode, setIsVRMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isRotating, setIsRotating] = useState(autoRotate)
  const viewerRef = useRef<HTMLDivElement>(null)
  const pannellumRef = useRef<any>(null)

  useEffect(() => {
    // Dynamic import of Pannellum library
    import('pannellum').then((pannellum) => {
      pannellumRef.current = pannellum.default || pannellum;
      
      if (viewerRef.current && pannellumRef.current) {
        // Initialize the panorama viewer
        pannellumRef.current.viewer(viewerRef.current, {
          type: 'equirectangular',
          panorama: imageUrl,
          autoLoad: true,
          autoRotate: isRotating ? 2 : 0, // Rotation speed in degrees per second
          autoRotateInactivityDelay: 3000,
          showControls: false,
          yaw: initialYaw,
          pitch: initialPitch,
          hfov: initialHfov,
          compass: true,
          northOffset: 247.5,
          onLoad: () => {
            setIsLoaded(true);
          }
        });
      }
    }).catch(err => {
      console.error("Failed to load Pannellum:", err);
    });

    // Cleanup function
    return () => {
      if (pannellumRef.current && pannellumRef.current.viewer) {
        pannellumRef.current.viewer.destroy?.();
      }
    };
  }, [imageUrl, initialYaw, initialPitch, initialHfov, isRotating]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!viewerRef.current) return;
    
    if (!isFullscreen) {
      if (viewerRef.current.requestFullscreen) {
        viewerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };

  // Toggle VR mode
  const toggleVRMode = () => {
    setIsVRMode(!isVRMode);
    
    if (pannellumRef.current && pannellumRef.current.viewer) {
      // In a real implementation, this would enable WebVR
      // For now, we'll just adjust the field of view to simulate a VR-like experience
      const newHfov = isVRMode ? initialHfov : 120;
      pannellumRef.current.viewer.setHfov(newHfov);
    }
  };

  // Toggle auto-rotation
  const toggleRotation = () => {
    setIsRotating(!isRotating);
    
    if (pannellumRef.current && pannellumRef.current.viewer) {
      if (!isRotating) {
        pannellumRef.current.viewer.startAutoRotate(2);
      } else {
        pannellumRef.current.viewer.stopAutoRotate();
      }
    }
  };

  return (
    <div className="relative w-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white">Loading panorama...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={viewerRef} 
        className="w-full aspect-[16/9] rounded-lg overflow-hidden"
        style={{ 
          backgroundColor: '#000000',
          touchAction: 'none' // Prevents default touch actions on mobile
        }}
      ></div>
      
      {title && (
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
          <h3 className="text-white font-medium">{title}</h3>
        </div>
      )}
      
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          onClick={toggleRotation}
          title={isRotating ? "Stop rotation" : "Start rotation"}
        >
          <RotateCcw size={20} className={isRotating ? "text-cyan-400" : "text-white"} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          onClick={toggleVRMode}
          title={isVRMode ? "Exit VR mode" : "Enter VR mode"}
        >
          <Headset size={20} className={isVRMode ? "text-cyan-400" : "text-white"} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize size={20} />
          ) : (
            <Expand size={20} />
          )}
        </motion.button>
      </div>
    </div>
  )
} 