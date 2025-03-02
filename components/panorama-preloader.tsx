"use client"

import { useEffect } from "react"

interface PanoramaPreloaderProps {
  urls: string[]
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export function PanoramaPreloader({
  urls,
  onProgress,
  onComplete
}: PanoramaPreloaderProps) {
  useEffect(() => {
    let loadedImages = 0
    const images = urls.map(url => {
      const img = new Image()
      img.src = url
      return new Promise<void>((resolve, reject) => {
        img.onload = () => {
          loadedImages++
          const progress = (loadedImages / urls.length) * 100
          onProgress?.(progress)
          if (loadedImages === urls.length) {
            onComplete?.()
          }
          resolve()
        }
        img.onerror = reject
      })
    })

    Promise.all(images).catch(error => {
      console.error('Error preloading images:', error)
    })
  }, [urls, onProgress, onComplete])

  return null
}
