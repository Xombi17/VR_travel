"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Share2, Heart, Bookmark, Copy, Facebook, Twitter } from "lucide-react"
import { toast } from "sonner"

interface SocialFeaturesProps {
  panoramaId: string
  title: string
  currentView: {
    yaw: number
    pitch: number
  }
}

export function SocialFeatures({
  panoramaId,
  title,
  currentView
}: SocialFeaturesProps) {
  const [showShare, setShowShare] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Generate shareable URL with view coordinates
  const getShareableUrl = () => {
    const baseUrl = window.location.origin
    const params = new URLSearchParams({
      id: panoramaId,
      yaw: currentView.yaw.toString(),
      pitch: currentView.pitch.toString()
    })
    return `${baseUrl}/vr-viewer?${params.toString()}`
  }

  // Handle share actions
  const handleCopyLink = async () => {
    const url = getShareableUrl()
    await navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard")
    setShowShare(false)
  }

  const handleSocialShare = (platform: string) => {
    const url = getShareableUrl()
    const text = `Check out this amazing view of ${title} in VR!`
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
      setShowShare(false)
    }
  }

  // Handle favorites and bookmarks
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (isFavorite) {
      const newFavorites = favorites.filter((f: string) => f !== panoramaId)
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      toast.success("Removed from favorites")
    } else {
      favorites.push(panoramaId)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      toast.success("Added to favorites")
    }
    setIsFavorite(!isFavorite)
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
    const bookmark = {
      id: panoramaId,
      title,
      yaw: currentView.yaw,
      pitch: currentView.pitch,
      timestamp: new Date().toISOString()
    }

    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((b: any) => b.id !== panoramaId)
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
      toast.success("Removed from bookmarks")
    } else {
      bookmarks.push(bookmark)
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
      toast.success("View bookmarked")
    }
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="fixed top-4 left-4 flex items-center gap-2">
      {/* Share Button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
          onClick={() => setShowShare(!showShare)}
        >
          <Share2 className="h-5 w-5" />
        </Button>

        <AnimatePresence>
          {showShare && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-xl rounded-lg p-2 w-40"
            >
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-white hover:bg-white/10"
                  onClick={handleCopyLink}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-white hover:bg-white/10"
                  onClick={() => handleSocialShare("facebook")}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-white hover:bg-white/10"
                  onClick={() => handleSocialShare("twitter")}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
        onClick={toggleFavorite}
      >
        <Heart
          className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
        />
      </Button>

      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
        onClick={toggleBookmark}
      >
        <Bookmark
          className={`h-5 w-5 ${isBookmarked ? "fill-yellow-500 text-yellow-500" : ""}`}
        />
      </Button>
    </div>
  )
}
