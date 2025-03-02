"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface AudioTrack {
  id: string
  url: string
  volume: number
  loop?: boolean
}

interface AmbientAudioSystemProps {
  tracks: AudioTrack[]
  isEnabled: boolean
  onToggle: () => void
}

export function AmbientAudioSystem({
  tracks,
  isEnabled,
  onToggle
}: AmbientAudioSystemProps) {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map())
  const [volumes, setVolumes] = useState<Map<string, number>>(new Map())

  useEffect(() => {
    // Initialize audio elements
    tracks.forEach(track => {
      if (!audioRefs.current.has(track.id)) {
        const audio = new Audio(track.url)
        audio.loop = track.loop ?? true
        audio.volume = track.volume
        audioRefs.current.set(track.id, audio)
        setVolumes(prev => new Map(prev).set(track.id, track.volume))
      }
    })

    // Cleanup
    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause()
        audio.src = ""
      })
      audioRefs.current.clear()
    }
  }, [tracks])

  // Handle enable/disable
  useEffect(() => {
    audioRefs.current.forEach(audio => {
      if (isEnabled) {
        audio.play().catch(() => {
          // Handle autoplay restrictions
          console.log("Autoplay prevented. User interaction required.")
        })
      } else {
        audio.pause()
      }
    })
  }, [isEnabled])

  const handleVolumeChange = (trackId: string, value: number) => {
    const audio = audioRefs.current.get(trackId)
    if (audio) {
      audio.volume = value
      setVolumes(prev => new Map(prev).set(trackId, value))
    }
  }

  return (
    <div className="fixed bottom-24 left-4 bg-black/80 backdrop-blur-xl rounded-lg p-4 shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-white hover:text-white/70"
        >
          {isEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
        <div className="text-sm text-white">
          <div className="font-medium">Ambient Audio</div>
          <div className="text-white/70 text-xs">{isEnabled ? "Playing" : "Muted"}</div>
        </div>
      </div>

      {isEnabled && (
        <div className="space-y-3">
          {tracks.map(track => (
            <div key={track.id} className="flex items-center gap-3">
              <div className="text-xs text-white/70 w-20">{track.id}</div>
              <Slider
                value={[volumes.get(track.id) ?? track.volume]}
                max={1}
                step={0.1}
                onValueChange={([value]) => handleVolumeChange(track.id, value)}
                className="w-32"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
