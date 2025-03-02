"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center h-40">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-4 h-4 bg-primary rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: 0,
          }}
        />
        <motion.div
          className="w-4 h-4 bg-primary rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: 0.15,
          }}
        />
        <motion.div
          className="w-4 h-4 bg-primary rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: 0.3,
          }}
        />
      </motion.div>
    </div>
  )
} 