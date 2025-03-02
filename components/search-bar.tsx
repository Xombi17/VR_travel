"use client"

import { useState, useEffect, useRef } from "react"
import { Search as SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { destinations } from "@/data/destinations"
import Link from "next/link"

interface SearchBarProps {
  className?: string
  onSearch?: (results: any[]) => void
  compact?: boolean
}

export function SearchBar({ className = "", onSearch, compact = false }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [interest, setInterest] = useState("all")
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Get unique categories from destinations
  const categories = ["all", ...Array.from(new Set(destinations.map(d => d.category)))].sort()
  
  // Interests are hardcoded for now, but could come from a data source
  const interests = [
    "all",
    "Food",
    "Art",
    "History",
    "Nature",
    "Adventure",
    "Relaxation",
    "Culture",
    "Architecture"
  ]

  // Handle search
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = destinations.filter(destination => {
        const matchesQuery = destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            destination.description.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesCategory = category === "all" || destination.category === category
        
        // For now, interest is not in our data model, so we'll just filter by query and category
        // In a real implementation, you would filter by interest as well
        
        return matchesQuery && matchesCategory
      }).slice(0, 5) // Limit to 5 results
      
      setSearchResults(results)
      
      if (onSearch) {
        onSearch(results)
      }
    } else {
      setSearchResults([])
      
      if (onSearch) {
        onSearch([])
      }
    }
  }, [searchQuery, category, interest, onSearch])

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div 
      ref={searchRef}
      className={`relative ${className}`}
    >
      <motion.div 
        className={`flex flex-col md:flex-row gap-2 p-2 rounded-lg ${compact ? 'bg-transparent' : 'glass-effect'}`}
        layout
      >
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className={`pl-10 pr-4 py-2 w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:ring-teal-400 ${compact ? 'h-10' : 'h-12'}`}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X size={16} />
            </Button>
          )}
        </div>
        
        {isExpanded && !compact && (
          <motion.div 
            className="flex flex-col md:flex-row gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={interest} onValueChange={setInterest}>
              <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white h-12">
                <SelectValue placeholder="Interest" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                {interests.map(int => (
                  <SelectItem key={int} value={int} className="capitalize">
                    {int}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              className="h-12 bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 hover:bg-gradient-to-r hover:from-teal-500 hover:to-fuchsia-500"
            >
              Search
            </Button>
          </motion.div>
        )}
      </motion.div>
      
      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isExpanded && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="py-2">
              {searchResults.map((result) => (
                <Link 
                  href={`/destinations/${result.id}`} 
                  key={result.id}
                  className="block px-4 py-3 hover:bg-slate-700 transition-colors"
                  onClick={() => setIsExpanded(false)}
                >
                  <div className="font-medium text-white">{result.title}</div>
                  <div className="text-sm text-slate-300 truncate">{result.description}</div>
                </Link>
              ))}
              
              {searchResults.length > 0 && (
                <div className="px-4 py-2 border-t border-slate-700">
                  <Link 
                    href={`/destinations?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(category)}&interest=${encodeURIComponent(interest)}`}
                    className="text-sm text-teal-400 hover:text-teal-300 flex items-center justify-center"
                    onClick={() => setIsExpanded(false)}
                  >
                    View all results
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
