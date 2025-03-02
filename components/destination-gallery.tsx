"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

// Gallery images
const galleryImages = {
  paris: [
    "/images/gallery/paris/paris-gallery-1.jpg",
    "/images/gallery/paris/paris-gallery-2.jpg",
    "/images/gallery/paris/paris-gallery-3.jpg",
    "/images/gallery/paris/paris-gallery-4.jpg",
    "/images/gallery/paris/paris-gallery-5.jpg",
    "/images/gallery/paris/paris-gallery-6.jpg",
  ],
  "great-wall": [
    "/images/gallery/great-wall/great-wall-gallery-1.jpg",
    "/images/gallery/great-wall/great-wall-gallery-2.jpg",
    "/images/gallery/great-wall/great-wall-gallery-3.jpg",
    "/images/gallery/great-wall/great-wall-gallery-4.jpg",
    "/images/gallery/great-wall/great-wall-gallery-5.jpg",
  ],
}

export default function DestinationGallery({ id }: { id: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Get images for this destination or use a default set
  const images = galleryImages[id as keyof typeof galleryImages] || [
    "/images/gallery/generic/gallery-1.jpg",
    "/images/gallery/generic/gallery-2.jpg",
    "/images/gallery/generic/gallery-3.jpg",
    "/images/gallery/generic/gallery-4.jpg",
  ]

  const nextImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % images.length)
  }

  const prevImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + images.length) % images.length)
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Gallery</h2>
        <button className="text-white/70 hover:text-white text-sm underline" onClick={() => setSelectedImage(0)}>
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.slice(0, 4).map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedImage(index)}
          >
            <Image src={image || "/placeholder.svg"} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence mode="sync">
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-white/10"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={selectedImage}
                className="relative w-full max-w-4xl h-[70vh]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`Gallery image ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-white/10"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${selectedImage === index ? "bg-white" : "bg-white/30"}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

