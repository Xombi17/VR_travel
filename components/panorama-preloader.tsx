"use client"

import { useEffect, useState } from "react"

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
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    const images = urls.map(url => {
      const img = new Image()
      img.src = url
      return new Promise<void>((resolve, reject) => {
        img.onload = () => {
          setLoadedCount(prev => {
            const newCount = prev + 1
            const progress = (newCount / urls.length) * 100
            onProgress?.(progress)
            if (newCount === urls.length) {
              onComplete?.()
            }
            return newCount
          })
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
