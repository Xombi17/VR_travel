"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { VirtualTourViewer } from "@/components/virtual-tour-viewer"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Info, Map } from "lucide-react"
import Image from "next/image"

// Define the panorama destinations with hotspots
const panoramas = [
  {
    id: "paris",
    title: "Paris, France",
    description: "Experience the City of Lights in stunning 360° view. See the Eiffel Tower and the beautiful Parisian streets.",
    imageUrl: "/images/panoramas/paris-panorama.jpg",
    thumbnail: "/images/destinations/eiffel-tower.jpg",
    audioUrl: "https://soundbible.com/mp3/city-ambience-outdoor-6414.mp3",
    locationInfo: {
      title: "Paris, France",
      description: "The City of Light, known for its art, culture, and iconic landmarks.",
      bestTimeToVisit: "Late spring (May-June) or early fall (September-October) when the weather is mild and crowds are smaller.",
      weather: {
        current: "Partly Cloudy",
        temp: "22°C",
        conditions: "Mild with light breeze"
      },
      facts: [
        "Paris hosts over 40 million tourists annually",
        "The Eiffel Tower was originally meant to be a temporary structure",
        "Paris has 130 museums and over 1000 art galleries",
        "The Louvre is the world's largest art museum"
      ],
      nearbyPlaces: [
        {
          name: "Louvre Museum",
          distance: "2.5 km",
          image: "/images/destinations/louvre.jpg"
        },
        {
          name: "Notre-Dame Cathedral",
          distance: "3.1 km",
          image: "/images/destinations/notre-dame.jpg"
        },
        {
          name: "Arc de Triomphe",
          distance: "1.8 km",
          image: "/images/destinations/arc-de-triomphe.jpg"
        }
      ]
    },
    hotspots: [
      {
        pitch: -2.1,
        yaw: 44.3,
        text: "Eiffel Tower",
        description: "The iconic symbol of Paris, standing 324 meters tall. Built in 1889, it attracts over 7 million visitors annually.",
        image: "/images/destinations/eiffel-tower.jpg",
        url: "/destinations/paris"
      },
      {
        pitch: -1.5,
        yaw: 67.3,
        text: "Seine River",
        description: "The historic river that flows through Paris, offering scenic boat tours and romantic riverside walks.",
        image: "/images/destinations/seine-river.jpg"
      },
      {
        pitch: -0.9,
        yaw: -53.2,
        text: "Champ de Mars",
        description: "A beautiful public greenspace, perfect for picnics with an iconic view of the Eiffel Tower.",
        image: "/images/destinations/champ-de-mars.jpg"
      }
    ],
    viewpoints: [
      {
        id: "eiffel-tower",
        name: "Eiffel Tower",
        yaw: 44.3,
        pitch: -2.1,
        description: "The iconic iron lattice tower on the Champ de Mars"
      },
      {
        id: "arc-de-triomphe",
        name: "Arc de Triomphe",
        yaw: -28.6,
        pitch: -3.2,
        description: "Historic monument honoring those who fought for France"
      },
      {
        id: "notre-dame",
        name: "Notre-Dame Cathedral",
        yaw: 95.1,
        pitch: -1.5,
        description: "Medieval Catholic cathedral known for its French Gothic architecture"
      }
    ],
    ambientSounds: [
      {
        id: "city-ambience",
        url: "https://soundbible.com/mp3/city-ambience-outdoor-6414.mp3",
        volume: 0.4,
        loop: true
      },
      {
        id: "birds",
        url: "https://soundbible.com/mp3/birds-singing-02-6744.mp3",
        volume: 0.2,
        loop: true
      }
    ],
    arPoints: [
      {
        id: "eiffel-history",
        yaw: 44.3,
        pitch: -2.1,
        type: "historical",
        title: "Eiffel Tower History",
        content: "Completed in 1889, the Eiffel Tower was built for the World's Fair. Initially meant to be temporary, it became a permanent icon of Paris."
      },
      {
        id: "weather-info",
        yaw: -28.6,
        pitch: 20,
        type: "weather",
        title: "Current Weather",
        content: "22°C with clear skies. Perfect visibility for panoramic views of Paris."
      }
    ],
    timeViews: [
      {
        id: "sunrise",
        name: "Sunrise",
        time: "06:00",
        icon: "sunrise",
        imageUrl: "/images/panoramas/paris-panorama.jpg"
      },
      {
        id: "day",
        name: "Day",
        time: "12:00",
        icon: "noon",
        imageUrl: "/images/panoramas/paris-panorama.jpg"
      },
      {
        id: "sunset",
        name: "Sunset",
        time: "18:00",
        icon: "sunset",
        imageUrl: "/images/panoramas/paris-panorama.jpg"
      },
      {
        id: "night",
        name: "Night",
        time: "21:00",
        icon: "night",
        imageUrl: "/images/panoramas/paris-panorama.jpg"
      }
    ]
  },
  {
    id: "santorini",
    title: "Santorini, Greece",
    description: "Explore the breathtaking white buildings and blue domes of Santorini overlooking the Aegean Sea.",
    imageUrl: "/images/panoramas/santorini-panorama.jpg",
    thumbnail: "/images/destinations/santorini.jpg",
    audioUrl: "https://soundbible.com/mp3/ocean_waves-Mike_Koenig-980635527.mp3",
    locationInfo: {
      title: "Santorini, Greece",
      description: "A stunning volcanic island known for its white-washed buildings and spectacular sunsets.",
      bestTimeToVisit: "April to October, with September offering perfect weather and fewer tourists.",
      weather: {
        current: "Sunny",
        temp: "25°C",
        conditions: "Clear skies with gentle sea breeze"
      },
      facts: [
        "Santorini was formed by one of the largest volcanic eruptions in history",
        "The island's unique architecture was designed to minimize sun exposure",
        "Local wine is unique due to grapes grown in volcanic soil",
        "The island is actually a group of five islands forming a caldera"
      ],
      nearbyPlaces: [
        {
          name: "Red Beach",
          distance: "12 km",
          image: "/images/destinations/red-beach.jpg"
        },
        {
          name: "Ancient Thera",
          distance: "8 km",
          image: "/images/destinations/ancient-thera.jpg"
        },
        {
          name: "Amoudi Bay",
          distance: "0.5 km",
          image: "/images/destinations/amoudi-bay.jpg"
        }
      ]
    },
    hotspots: [
      {
        pitch: -5.3,
        yaw: 12.9,
        text: "Aegean Sea",
        description: "The crystal-clear waters of the Aegean Sea, home to diverse marine life and perfect for sailing.",
        image: "/images/destinations/aegean-sea.jpg"
      },
      {
        pitch: -2.1,
        yaw: -35.6,
        text: "Blue Dome Church",
        description: "The iconic blue-domed churches of Santorini, a symbol of Greek island architecture.",
        image: "/images/destinations/blue-dome.jpg"
      },
      {
        pitch: -1.8,
        yaw: 110.2,
        text: "Oia Village",
        description: "Famous for its stunning sunsets and white-washed houses carved into the cliffs.",
        image: "/images/destinations/oia-village.jpg",
        url: "/destinations/santorini"
      }
    ],
    viewpoints: [
      {
        id: "oia-village",
        name: "Oia Village",
        yaw: 15.8,
        pitch: -4.2,
        description: "Famous blue-domed churches and white buildings"
      },
      {
        id: "caldera-view",
        name: "Caldera View",
        yaw: -42.3,
        pitch: -2.7,
        description: "Panoramic view of the volcanic caldera"
      },
      {
        id: "sunset-point",
        name: "Sunset Point",
        yaw: 78.5,
        pitch: -1.9,
        description: "Perfect spot to watch Santorini's famous sunsets"
      }
    ],
    ambientSounds: [
      {
        id: "waves",
        url: "https://soundbible.com/mp3/ocean_waves-Mike_Koenig-980635527.mp3",
        volume: 0.4,
        loop: true
      },
      {
        id: "seagulls",
        url: "https://soundbible.com/mp3/seagull-sounds-3512.mp3",
        volume: 0.2,
        loop: true
      }
    ],
    arPoints: [
      {
        id: "caldera-info",
        yaw: -42.3,
        pitch: -2.7,
        type: "info",
        title: "Volcanic Caldera",
        content: "The crescent shape of Santorini is actually a caldera, formed by one of the largest volcanic eruptions in recorded history."
      },
      {
        id: "sunset-time",
        yaw: 78.5,
        pitch: -1.9,
        type: "time",
        title: "Best Sunset Spot",
        content: "Oia is famous for its sunsets. The best viewing time is between 19:00 and 20:00 during summer months."
      },
      {
        id: "aegean-sea-info",
        yaw: 12.9,
        pitch: -5.3,
        type: "info",
        title: "Aegean Sea",
        content: "The beautiful Aegean Sea surrounds Santorini, offering stunning views and perfect sailing conditions."
      }
    ],
    timeViews: [
      {
        id: "morning",
        name: "Morning",
        time: "08:00",
        icon: "morning",
        imageUrl: "/images/panoramas/santorini-panorama.jpg"
      },
      {
        id: "afternoon",
        name: "Afternoon",
        time: "14:00",
        icon: "afternoon",
        imageUrl: "/images/panoramas/santorini-panorama.jpg"
      },
      {
        id: "sunset",
        name: "Sunset",
        time: "19:00",
        icon: "sunset",
        imageUrl: "/images/panoramas/santorini-panorama.jpg"
      },
      {
        id: "night",
        name: "Night",
        time: "22:00",
        icon: "night",
        imageUrl: "/images/panoramas/santorini-panorama.jpg"
      }
    ]
  },
  {
    id: "grand-canyon",
    title: "Grand Canyon, USA",
    description: "Marvel at the vast expanse of the Grand Canyon from a perfect vantage point.",
    imageUrl: "/images/panoramas/grand-canyon-panorama.jpg",
    thumbnail: "/images/destinations/grand-canyon.jpg",
    audioUrl: "https://soundbible.com/mp3/meadow-birds-nature-sounds-7803.mp3",
    locationInfo: {
      title: "Grand Canyon, USA",
      description: "One of the world's most spectacular natural wonders, carved by the Colorado River.",
      bestTimeToVisit: "March to May and September to November offer mild weather and smaller crowds.",
      weather: {
        current: "Sunny",
        temp: "28°C",
        conditions: "Clear skies with light winds"
      },
      facts: [
        "The canyon is 277 miles (446 km) long and up to 18 miles (29 km) wide",
        "The Colorado River has been carving the canyon for over 6 million years",
        "The canyon contains rock layers that are over 2 billion years old",
        "Over 5 million people visit the Grand Canyon each year"
      ],
      nearbyPlaces: [
        {
          name: "Bright Angel Trail",
          distance: "0.5 km",
          image: "/images/destinations/bright-angel-trail.jpg"
        },
        {
          name: "Desert View Watchtower",
          distance: "5 km",
          image: "/images/destinations/desert-view-watchtower.jpg"
        },
        {
          name: "Havasu Falls",
          distance: "16 km",
          image: "/images/destinations/havasu-falls.jpg"
        }
      ]
    },
    hotspots: [
      {
        pitch: -8.7,
        yaw: 44.3,
        text: "Colorado River",
        description: "The mighty river that carved the Grand Canyon over millions of years.",
        image: "/images/destinations/colorado-river.jpg"
      },
      {
        pitch: -3.2,
        yaw: -28.6,
        text: "South Rim",
        description: "The most visited and accessible part of the Grand Canyon.",
        image: "/images/destinations/south-rim.jpg"
      },
      {
        pitch: -1.5,
        yaw: 95.1,
        text: "Bright Angel Trail",
        description: "One of the park's most popular hiking trails, offering stunning views.",
        image: "/images/destinations/bright-angel-trail.jpg"
      }
    ],
    viewpoints: [
      {
        id: "colorado-river",
        name: "Colorado River View",
        yaw: 44.3,
        pitch: -8.7,
        description: "View of the mighty river that carved the canyon"
      },
      {
        id: "south-rim",
        name: "South Rim Overlook",
        yaw: -28.6,
        pitch: -3.2,
        description: "Panoramic vista from the South Rim"
      },
      {
        id: "bright-angel",
        name: "Bright Angel Trailhead",
        yaw: 95.1,
        pitch: -1.5,
        description: "Starting point of the famous hiking trail"
      }
    ],
    ambientSounds: [
      {
        id: "wind",
        url: "https://soundbible.com/mp3/wind-1.mp3",
        volume: 0.4,
        loop: true
      },
      {
        id: "birds",
        url: "https://soundbible.com/mp3/birds-singing-02-6744.mp3",
        volume: 0.2,
        loop: true
      }
    ],
    arPoints: [
      {
        id: "geological-info",
        yaw: 44.3,
        pitch: -8.7,
        type: "info",
        title: "Geological History",
        content: "The Grand Canyon is a testament to the power of erosion, with rock layers dating back over 2 billion years."
      },
      {
        id: "trail-info",
        yaw: 95.1,
        pitch: -1.5,
        type: "trail",
        title: "Bright Angel Trail",
        content: "One of the park's most popular trails, offering stunning views of the canyon and the Colorado River."
      }
    ],
    timeViews: [
      {
        id: "sunrise",
        name: "Sunrise",
        time: "06:00",
        icon: "sunrise",
        imageUrl: "/images/panoramas/grand-canyon-panorama.jpg"
      },
      {
        id: "day",
        name: "Day",
        time: "12:00",
        icon: "noon",
        imageUrl: "/images/panoramas/grand-canyon-panorama.jpg"
      },
      {
        id: "sunset",
        name: "Sunset",
        time: "18:00",
        icon: "sunset",
        imageUrl: "/images/panoramas/grand-canyon-panorama.jpg"
      },
      {
        id: "night",
        name: "Night",
        time: "21:00",
        icon: "night",
        imageUrl: "/images/panoramas/grand-canyon-panorama.jpg"
      }
    ]
  },
  {
    id: "kyoto",
    title: "Kyoto, Japan",
    description: "Immerse yourself in the traditional beauty of Kyoto's temples and gardens.",
    imageUrl: "/images/panoramas/kyoto-panorama.jpg",
    thumbnail: "/images/destinations/kyoto.jpg",
    audioUrl: "https://soundbible.com/mp3/temple_bell_huge-daniel_simon-1607708370.mp3",
    locationInfo: {
      title: "Kyoto, Japan",
      description: "Japan's cultural heart, famous for its temples, gardens, and traditional architecture.",
      bestTimeToVisit: "March-May for cherry blossoms, or October-November for fall colors.",
      weather: {
        current: "Partly Cloudy",
        temp: "20°C",
        conditions: "Mild with occasional showers"
      },
      facts: [
        "Kyoto was Japan's capital city for over 1000 years",
        "The city has over 1600 Buddhist temples and 400 Shinto shrines",
        "17 UNESCO World Heritage sites are located in Kyoto",
        "Kyoto was spared from WWII bombing due to its cultural significance"
      ],
      nearbyPlaces: [
        {
          name: "Fushimi Inari Shrine",
          distance: "4 km",
          image: "/images/destinations/fushimi-inari.jpg"
        },
        {
          name: "Arashiyama Bamboo Grove",
          distance: "8 km",
          image: "/images/destinations/arashiyama.jpg"
        },
        {
          name: "Nijo Castle",
          distance: "3 km",
          image: "/images/destinations/nijo-castle.jpg"
        }
      ]
    },
    hotspots: [
      {
        pitch: -4.2,
        yaw: 15.8,
        text: "Kinkaku-ji Temple",
        description: "The famous Golden Pavilion, covered in gold leaf and surrounded by a beautiful garden.",
        image: "/images/destinations/kinkakuji.jpg"
      },
      {
        pitch: -2.7,
        yaw: -42.3,
        text: "Zen Garden",
        description: "A meticulously maintained rock garden representing mountains and flowing water.",
        image: "/images/destinations/zen-garden.jpg"
      },
      {
        pitch: -1.9,
        yaw: 78.5,
        text: "Cherry Blossoms",
        description: "Beautiful sakura trees that bloom in spring, a symbol of Japanese culture.",
        image: "/images/destinations/cherry-blossoms.jpg"
      }
    ],
    viewpoints: [
      {
        id: "kinkakuji",
        name: "Golden Pavilion",
        yaw: 15.8,
        pitch: -4.2,
        description: "The famous three-story Zen temple covered in gold leaf"
      },
      {
        id: "zen-garden",
        name: "Rock Garden",
        yaw: -42.3,
        pitch: -2.7,
        description: "Traditional Karesansui (dry landscape) garden"
      },
      {
        id: "cherry-blossom",
        name: "Cherry Blossom Path",
        yaw: 78.5,
        pitch: -1.9,
        description: "Path lined with beautiful sakura trees"
      }
    ],
    ambientSounds: [
      {
        id: "temple-bell",
        url: "https://soundbible.com/mp3/temple_bell_huge-daniel_simon-1607708370.mp3",
        volume: 0.4,
        loop: true
      },
      {
        id: "birds",
        url: "https://soundbible.com/mp3/birds-singing-02-6744.mp3",
        volume: 0.2,
        loop: true
      }
    ],
    arPoints: [
      {
        id: "temple-info",
        yaw: 15.8,
        pitch: -4.2,
        type: "info",
        title: "Kinkaku-ji Temple",
        content: "The Golden Pavilion was built in 1397 as a retirement villa for the Shogun."
      },
      {
        id: "garden-info",
        yaw: -42.3,
        pitch: -2.7,
        type: "garden",
        title: "Zen Garden",
        content: "This traditional Japanese garden is designed to promote meditation and contemplation."
      }
    ],
    timeViews: [
      {
        id: "morning",
        name: "Morning",
        time: "08:00",
        icon: "morning",
        imageUrl: "/images/panoramas/kyoto-panorama.jpg"
      },
      {
        id: "afternoon",
        name: "Afternoon",
        time: "14:00",
        icon: "afternoon",
        imageUrl: "/images/panoramas/kyoto-panorama.jpg"
      },
      {
        id: "sunset",
        name: "Sunset",
        time: "18:00",
        icon: "sunset",
        imageUrl: "/images/panoramas/kyoto-panorama.jpg"
      },
      {
        id: "night",
        name: "Night",
        time: "21:00",
        icon: "night",
        imageUrl: "/images/panoramas/kyoto-panorama.jpg"
      }
    ]
  },
  {
    id: "taj-mahal",
    title: "Taj Mahal, India",
    description: "Witness the majestic Taj Mahal and its surrounding gardens in full 360° glory.",
    imageUrl: "/images/panoramas/taj-mahal-panorama.jpg",
    thumbnail: "/images/destinations/taj-mahal.jpg",
    audioUrl: "https://soundbible.com/mp3/indian-classical-music-sitar-flute-tabla-tanpura-9594.mp3",
    locationInfo: {
      title: "Taj Mahal, India",
      description: "An iconic symbol of love, this white marble mausoleum is one of the world's most beautiful buildings.",
      bestTimeToVisit: "October to March when the weather is cooler and less humid.",
      weather: {
        current: "Clear",
        temp: "32°C",
        conditions: "Warm and humid"
      },
      facts: [
        "Built between 1632 and 1653 by Emperor Shah Jahan in memory of his wife",
        "The Taj Mahal changes color throughout the day",
        "Over 20,000 artisans worked on its construction",
        "The four minarets are slightly tilted outward to protect the main dome in case they fall"
      ],
      nearbyPlaces: [
        {
          name: "Agra Fort",
          distance: "2.5 km",
          image: "/images/destinations/agra-fort.jpg"
        },
        {
          name: "Mehtab Bagh",
          distance: "1 km",
          image: "/images/destinations/mehtab-bagh.jpg"
        },
        {
          name: "Fatehpur Sikri",
          distance: "40 km",
          image: "/images/destinations/fatehpur-sikri.jpg"
        }
      ]
    },
    hotspots: [
      {
        pitch: -3.8,
        yaw: 0.2,
        text: "Main Mausoleum",
        description: "The central structure of white marble, featuring intricate Islamic calligraphy and floral patterns.",
        image: "/images/destinations/taj-main.jpg"
      },
      {
        pitch: -2.5,
        yaw: -65.1,
        text: "Reflecting Pool",
        description: "A long pool that perfectly mirrors the Taj Mahal, creating stunning photo opportunities.",
        image: "/images/destinations/taj-pool.jpg"
      },
      {
        pitch: -1.7,
        yaw: 45.9,
        text: "Garden Entrance",
        description: "The ornate gateway to the Charbagh garden, featuring red sandstone architecture.",
        image: "/images/destinations/taj-garden.jpg"
      }
    ],
    viewpoints: [
      {
        id: "main-dome",
        name: "Main Dome",
        yaw: 0.2,
        pitch: -3.8,
        description: "The iconic central dome of the Taj Mahal"
      },
      {
        id: "reflecting-pool",
        name: "Reflecting Pool",
        yaw: -65.1,
        pitch: -2.5,
        description: "The long pool that mirrors the Taj Mahal"
      },
      {
        id: "garden-gate",
        name: "Garden Entrance",
        yaw: 45.9,
        pitch: -1.7,
        description: "The ornate gateway to the Charbagh garden"
      }
    ],
    ambientSounds: [
      {
        id: "indian-music",
        url: "https://soundbible.com/mp3/indian-classical-music-sitar-flute-tabla-tanpura-9594.mp3",
        volume: 0.4,
        loop: true
      },
      {
        id: "birds",
        url: "https://soundbible.com/mp3/birds-singing-02-6744.mp3",
        volume: 0.2,
        loop: true
      }
    ],
    arPoints: [
      {
        id: "mausoleum-info",
        yaw: 0.2,
        pitch: -3.8,
        type: "info",
        title: "Taj Mahal Mausoleum",
        content: "The Taj Mahal was built by Emperor Shah Jahan in memory of his wife, Mumtaz Mahal."
      },
      {
        id: "garden-info",
        yaw: 45.9,
        pitch: -1.7,
        type: "garden",
        title: "Charbagh Garden",
        content: "The garden is designed according to the principles of Persian gardens, with a central pool and walking paths."
      }
    ],
    timeViews: [
      {
        id: "sunrise",
        name: "Sunrise",
        time: "06:00",
        icon: "sunrise",
        imageUrl: "/images/panoramas/taj-mahal-panorama.jpg"
      },
      {
        id: "day",
        name: "Day",
        time: "12:00",
        icon: "noon",
        imageUrl: "/images/panoramas/taj-mahal-panorama.jpg"
      },
      {
        id: "sunset",
        name: "Sunset",
        time: "18:00",
        icon: "sunset",
        imageUrl: "/images/panoramas/taj-mahal-panorama.jpg"
      },
      {
        id: "night",
        name: "Night",
        time: "21:00",
        icon: "night",
        imageUrl: "/images/panoramas/taj-mahal-panorama.jpg"
      }
    ]
  }
]

export default function VRViewerPage() {
  // Create a fallback for useSearchParams during static export
  const searchParams = typeof window !== 'undefined' ? useSearchParams() : { get: () => null };
  const destinationParam = searchParams.get ? searchParams.get('destination') : null;
  
  const [selectedPanorama, setSelectedPanorama] = useState(panoramas[0])
  const [showInfo, setShowInfo] = useState(false)
  
  // Set the initial panorama based on the URL parameter
  useEffect(() => {
    if (destinationParam) {
      const matchedPanorama = panoramas.find(p => p.id === destinationParam)
      if (matchedPanorama) {
        setSelectedPanorama(matchedPanorama)
      }
    }
  }, [destinationParam])
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Virtual Reality Tours</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Destination selection */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6 text-white">Destinations</h2>
              
              <div className="space-y-4">
                {panoramas.map((panorama) => (
                  <motion.div
                    key={panorama.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedPanorama.id === panorama.id
                        ? "bg-gradient-to-r from-teal-500/20 to-fuchsia-500/20 border border-teal-500/50"
                        : "hover:bg-white/5"
                    }`}
                    onClick={() => setSelectedPanorama(panorama)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image
                          src={panorama.thumbnail}
                          alt={panorama.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e: any) => {
                            e.currentTarget.src = "/images/destinations/default.jpg";
                            e.currentTarget.onerror = null;
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className={`font-medium ${
                          selectedPanorama.id === panorama.id
                            ? "text-white"
                            : "text-white/70"
                        }`}>
                          {panorama.title}
                        </h3>
                        <p className="text-xs text-white/50">
                          {panorama.hotspots.length} points of interest
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-black/30 rounded-lg">
                <h3 className="text-sm font-medium text-white mb-2">VR Compatibility</h3>
                <p className="text-xs text-white/70">
                  For the best experience, use a VR headset or view on a device with gyroscope support.
                  You can also navigate using your mouse or touch screen.
                </p>
              </div>
            </div>
          </div>
          
          {/* Main content - VR viewer */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* VR Viewer */}
            {selectedPanorama && (
              <VirtualTourViewer
                panoramaId={selectedPanorama.id}
                panoramaUrl={selectedPanorama.imageUrl}
                title={selectedPanorama.title}
                audioUrl={selectedPanorama.audioUrl}
                hotspots={selectedPanorama.hotspots}
                locationInfo={selectedPanorama.locationInfo}
                viewpoints={selectedPanorama.viewpoints}
                arPoints={selectedPanorama.arPoints}
                timeViews={selectedPanorama.timeViews}
                ambientSounds={selectedPanorama.ambientSounds}
                className="w-full"
              />
            )}
            
            {/* Info section */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">{selectedPanorama.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/10 hover:bg-white/20"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <Info className="h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-white/70 mb-6">{selectedPanorama.description}</p>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="bg-white/10 hover:bg-white/20 border-teal-500/50"
                >
                  Explore More
                </Button>
                <Button 
                  variant="ghost"
                  className="bg-white/10 hover:bg-white/20"
                >
                  Share
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="sync">
                  {showInfo && (
                    <motion.div 
                      className="mt-6 bg-black/30 backdrop-blur-sm rounded-xl p-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      key={selectedPanorama.id}
                    >
                      <h3 className="text-xl font-semibold mb-4 gradient-text">About {selectedPanorama.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-medium mb-2">Points of Interest</h4>
                          <ul className="space-y-2">
                            {selectedPanorama.hotspots.map((hotspot, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-teal-400 mr-2">•</span>
                                <span className="text-white/70">{hotspot.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Navigation Tips</h4>
                          <p className="text-white/70 mb-4">
                            Look for the interactive hotspots in the panorama to learn more about specific points of interest.
                            Click and drag to look around, or use the control buttons for additional features.
                          </p>
                          <div className="flex items-center">
                            <Map className="h-5 w-5 text-teal-400 mr-2" />
                            <span className="text-white/70">Interactive points: {selectedPanorama.hotspots.length}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}