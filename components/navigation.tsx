"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, User, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "VR Experience", path: "/experience" },
  { name: "VR Viewer", path: "/vr-viewer" },
  { name: "Guide", path: "/guide" },
  { name: "About", path: "/about" },
  { name: "Help", path: "/help" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

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

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <motion.div
                  className="flex items-center gap-2 glass-effect px-3 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  {session.user?.image ? (
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                      <Image 
                        src={session.user.image} 
                        alt={session.user.name || "User"} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <User className="w-4 h-4 text-white/70" />
                  )}
                  <span className="text-white/70 text-sm">Profile</span>
                </motion.div>
              </Link>
            </div>
          ) : (
            <Link href="/auth/signin">
              <motion.button
                className="bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 px-5 py-2 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
          )}
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
                
                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <Link
                      href="/profile"
                      className={`text-xl uppercase tracking-wider transition-colors ${
                        pathname === "/profile" 
                          ? "gradient-text font-medium" 
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      Profile
                    </Link>
                  </motion.div>
                )}
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

                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link href="/profile" className="flex items-center justify-center gap-2 glass-effect px-4 py-3 rounded-full">
                      <User className="w-4 h-4 text-white/70" />
                      <span className="text-white/70 text-sm">My Profile</span>
                    </Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center justify-center gap-2 glass-effect px-4 py-3 rounded-full text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link href="/auth/signin">
                    <button className="w-full bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 py-3 rounded-full text-sm font-medium">
                      Sign In
                    </button>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
