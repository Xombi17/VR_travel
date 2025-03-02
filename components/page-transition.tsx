"use client"

import { motion } from "framer-motion"
import { usePageTransition } from "./page-transition-provider"
import type { ReactNode } from "react"

export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = usePageTransition()

  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ 
        type: "tween", 
        ease: "easeInOut", 
        duration: 0.4,
        staggerChildren: 0.1
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

