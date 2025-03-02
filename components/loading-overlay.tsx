"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  progress?: number
  message?: string
}

export function LoadingOverlay({ progress, message = "Loading..." }: LoadingOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-white/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {progress ? `${Math.round(progress)}%` : ""}
            </span>
          </div>
        </div>
        <div className="mt-4 text-white/80 text-sm">{message}</div>
        {progress && (
          <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
