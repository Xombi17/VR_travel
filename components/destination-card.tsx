import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"

export interface DestinationCardProps {
  id: string
  title: string
  description: string
  imagePath?: string
  rating?: number
  reviewCount?: number
  hasVRExperience?: boolean
  price: number
}

export function DestinationCard({
  id,
  title,
  description,
  imagePath,
  rating,
  reviewCount,
  hasVRExperience
}: DestinationCardProps) {
  // Map destination IDs to their respective image paths
  const destinationImages: Record<string, string> = {
    paris: "/images/destinations/eiffel-tower.jpg",
    "great-wall": "/images/destinations/great-wall.jpg",
    "taj-mahal": "/images/destinations/taj-mahal.jpg",
    "machu-picchu": "/images/destinations/machu-picchu.jpg",
    pyramids: "/images/destinations/pyramids.jpg",
    "grand-canyon": "/images/destinations/grand-canyon.jpg",
    santorini: "/images/destinations/santorini.jpg",
    venice: "/images/destinations/venice.jpg",
    kyoto: "/images/destinations/kyoto.jpg",
    "northern-lights": "/images/destinations/northern-lights.jpg",
    "angkor-wat": "/images/destinations/angkor-wat.jpg",
    rio: "/images/destinations/rio.jpg",
    serengeti: "/images/destinations/serengeti.jpg",
    "bora-bora": "/images/destinations/bora-bora.jpg",
    sydney: "/images/destinations/sydney.jpg",
    petra: "/images/destinations/petra.jpg"
  };

  // Get the image for this destination or use default
  const imageUrl = imagePath || destinationImages[id] || "/images/destinations/default.jpg";

  return (
    <div className="h-full flex">
      <Link href={`/destinations/${id}`} className="w-full">
        <div className="h-full relative overflow-hidden rounded-2xl bg-[#0a1128]/40 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-lg hover:shadow-fuchsia-500/10 flex flex-col">
          {/* Image Container - Fixed Height */}
          <div className="relative h-[200px] w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {hasVRExperience && (
              <span className="absolute top-4 right-4 px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-teal-400 to-fuchsia-400 rounded-full">
                VR Available
              </span>
            )}
          </div>

          {/* Content - Flex Grow */}
          <div className="flex flex-col flex-grow p-6">
            <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-fuchsia-400">
              {title}
            </h3>
            <p className="text-slate-300 text-sm mt-2 flex-grow">
              {description}
            </p>
            
            {/* Rating and Button - Fixed at Bottom */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              {rating && (
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating)
                            ? 'text-teal-400'
                            : 'text-slate-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {reviewCount && (
                    <span className="ml-2 text-sm text-slate-400">
                      ({reviewCount} reviews)
                    </span>
                  )}
                </div>
              )}
              <motion.button
                className="text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-teal-400 hover:to-fuchsia-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}