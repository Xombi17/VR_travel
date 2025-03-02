"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 text-white/70 py-12 border-t border-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="gradient-text text-lg font-medium mb-4">VirtualVoyage</h3>
            <p className="mb-4">
              Experience the world&apos;s most breathtaking destinations from the comfort of your home with our cutting-edge
              VR technology.
            </p>
            <div className="flex gap-4">
              {["twitter", "facebook", "instagram", "youtube"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full glass-effect flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { name: "Destinations", path: "/destinations" },
                { name: "VR Experiences", path: "/experience" },
                { name: "Featured Tours", path: "/destinations?featured=true" },
                { name: "New Additions", path: "/destinations?sort=newest" },
                { name: "Popular Places", path: "/destinations?sort=popular" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="hover:text-teal-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: "Help Center", path: "/help" },
                { name: "VR Setup Guide", path: "/guide" },
                { name: "About Us", path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="hover:text-teal-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates on new destinations and features.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="glass-effect rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
              <button type="submit" className="bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 px-4 rounded-r-md font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} VirtualVoyage. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-teal-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm hover:text-teal-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

