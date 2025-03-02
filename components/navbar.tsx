"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          <span className="text-white font-light text-xl tracking-wider">Virtual Voyage</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "Explore", "Destinations", "Experience in VR", "About"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Search className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm">Search</span>
          </motion.div>

          <motion.button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

