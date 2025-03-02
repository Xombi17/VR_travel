"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "VR Experience", path: "/experience" },
  { name: "VR Viewer", path: "/vr-viewer" },
  { name: "Guide", path: "/guide" },
  { name: "About", path: "/about" },
  { name: "Help", path: "/help" },
  { name: "Profile", path: "/profile" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-effect" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center">
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          <span className="text-white font-light text-xl tracking-wider">VirtualVoyage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-sm uppercase tracking-wider transition-colors ${
                pathname === item.path 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400 font-medium" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <motion.div
            className="flex items-center gap-2 glass-effect px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Search className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm">Search</span>
          </motion.div>

          <motion.button
            className="bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 px-5 py-2 rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 glass-effect flex flex-col items-center justify-center z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col items-center space-y-8 mb-12">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className={`text-xl uppercase tracking-wider transition-colors ${
                        pathname === item.path 
                          ? "gradient-text font-medium" 
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="flex flex-col gap-4 w-64"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 glass-effect px-4 py-3 rounded-full">
                  <Search className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-sm">Search</span>
                </div>

                <button className="bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 py-3 rounded-full text-sm font-medium">
                  Sign In
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

