"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, User, Heart, Calendar, LogOut, Menu, X } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { toast } from "sonner"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const isAuthenticated = status === "authenticated"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    toast.success("Signed out successfully")
    setProfileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen)
  }

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
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <span className="text-white font-light text-xl tracking-wider">Virtual Voyage</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Home
          </Link>
          <Link
            href="/destinations"
            className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Destinations
          </Link>
          <Link
            href="/experiences"
            className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Experiences
          </Link>
          <Link
            href="/about"
            className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-white p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Auth/Profile */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Search className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm">Search</span>
          </motion.div>

          {!isAuthenticated ? (
            <Link href="/auth/signin">
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
          ) : (
            <div className="relative">
              <motion.button
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={session?.user?.image || "https://ui-avatars.com/api/?name=User&background=random"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white text-sm">{session?.user?.name?.split(' ')[0] || 'User'}</span>
              </motion.button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 py-1 z-50">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                    Favorites
                  </Link>
                  <Link
                    href="/bookings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-800"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <Calendar className="w-4 h-4" />
                    Bookings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-800 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/destinations"
              className="text-white py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="/experiences"
              className="text-white py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Experiences
            </Link>
            <Link
              href="/about"
              className="text-white py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-white py-2 border-b border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center gap-2 text-white py-2 border-b border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  Favorites
                </Link>
                <Link
                  href="/bookings"
                  className="flex items-center gap-2 text-white py-2 border-b border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4" />
                  Bookings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-400 py-2 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
