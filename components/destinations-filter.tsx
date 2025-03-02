"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"

const regions = ["Europe", "Asia", "North America", "South America", "Africa", "Oceania", "Antarctica"]

const categories = [
  "Historical",
  "Natural Wonders",
  "Urban Landscapes",
  "Cultural Sites",
  "Beaches",
  "Mountains",
  "Landmarks",
]

export default function DestinationsFilter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region))
    } else {
      setSelectedRegions([...selectedRegions, region])
    }
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedRegions([])
    setSelectedCategories([])
  }

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Destinations</h2>
        <button
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        >
          <Filter className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Filters</span>
        </button>
      </div>

      <div
        className={`lg:block ${mobileFilterOpen ? "block" : "hidden"} lg:static fixed inset-0 z-40 bg-black/95 lg:bg-transparent lg:p-0 p-6 overflow-auto`}
      >
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Filters</h3>
          <button className="text-white" onClick={() => setMobileFilterOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="sticky top-0 lg:relative">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 mb-6">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full py-2 px-4 pl-10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            </div>

            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Regions</h3>
              <div className="space-y-2">
                {regions.map((region) => (
                  <div key={region} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`region-${region}`}
                      checked={selectedRegions.includes(region)}
                      onChange={() => toggleRegion(region)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                    />
                    <label htmlFor={`region-${region}`} className="ml-2 text-white/80 text-sm">
                      {region}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-white/80 text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full py-2 text-sm text-white/80 hover:text-white border border-white/20 rounded-full transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

