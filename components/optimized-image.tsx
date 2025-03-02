"use client"

import { useState, useEffect } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
  lowQualitySrc?: string
  aspectRatio?: string
  wrapperClassName?: string
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/images/placeholder.svg",
  lowQualitySrc,
  aspectRatio = "aspect-[16/9]",
  wrapperClassName,
  className,
  fill,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(lowQualitySrc || src)
  const [error, setError] = useState(false)

  // When src changes, reset loading state and error
  useEffect(() => {
    setIsLoading(true)
    setError(false)
    setImgSrc(lowQualitySrc || src)
  }, [src, lowQualitySrc])

  return (
    <div className={cn(
      "overflow-hidden relative",
      !fill && aspectRatio,
      wrapperClassName
    )}>
      <Image
        src={error ? fallbackSrc : imgSrc}
        alt={alt}
        className={cn(
          "object-cover transition-all duration-500",
          isLoading ? "scale-110 blur-md" : "scale-100 blur-0",
          className
        )}
        fill={fill}
        width={!fill ? width || 1920 : undefined}
        height={!fill ? height || 1080 : undefined}
        quality={90}
        priority={props.priority}
        onLoadingComplete={() => {
          // If we're using a low quality placeholder, switch to the high quality image
          if (lowQualitySrc && imgSrc === lowQualitySrc) {
            setImgSrc(src)
          } else {
            setIsLoading(false)
          }
        }}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
        {...props}
      />
    </div>
  )
}
