import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import DestinationGallery from "@/components/destination-gallery"
import { destinations } from "@/data/destinations"
import Link from "next/link"
import { Star } from "lucide-react"

export function generateStaticParams() {
  return destinations.map((destination) => ({
    id: destination.id,
  }))
}

export default function DestinationPage({ params }: { params: { id: string } }) {
  const destination = destinations.find((d) => d.id === params.id)

  if (!destination) {
    notFound()
  }

  // Map destination IDs to their respective image paths
  const destinationImages: Record<string, string> = {
    paris: "/images/destinations/paris.jpg",
    "great-wall": "/images/destinations/great-wall.jpg",
    "taj-mahal": "/images/destinations/taj-mahal.jpg",
    "machu-picchu": "/images/destinations/machu-picchu.jpg",
    pyramids: "/images/destinations/pyramids.jpg",
    "grand-canyon": "/images/destinations/grand-canyon.jpg",
    santorini: "/images/destinations/santorini.jpg",
    venice: "/images/destinations/venice.jpg",
    kyoto: "/images/destinations/kyoto.jpg",
    bali: "/images/destinations/bali.jpg",
  }

  // Get the image for this destination or use a default
  const imagePath = destinationImages[params.id] || "/images/destinations/default.jpg"

  // Check if this destination has a VR experience using the property from the destination data
  const hasVRExperience = destination.hasVRExperience || false

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] bg-gradient-to-b from-black/60 to-black/20">
        <Image
          src={imagePath}
          alt={destination.title}
          fill
          className="object-cover z-[-1]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        
        <div className="container mx-auto h-full flex flex-col justify-end pb-12">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{destination.title}</h1>
            {hasVRExperience && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-teal-400 to-fuchsia-400 rounded-full shadow-lg">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white"
                >
                  <path d="M3 12h.01M21 12h.01M9 12h.01M15 12h.01M21 8v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1ZM7 12h10"/>
                </svg>
                <span className="text-xs font-bold text-white">VR Ready</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-white/90 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 mr-1" />
              <span className="font-medium">{destination.rating}</span>
            </div>
            <span className="mx-2">•</span>
            <span>{destination.reviewCount.toLocaleString()} visitors</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto no-scrollbar">
            <a href="#overview" className="px-6 py-4 text-white font-medium border-b-2 border-blue-500">Overview</a>
            <a href="#experience" className="px-6 py-4 text-white/70 hover:text-white font-medium border-b-2 border-transparent">Experience</a>
            <a href="#reviews" className="px-6 py-4 text-white/70 hover:text-white font-medium border-b-2 border-transparent">Reviews</a>
            <a href="#gallery" className="px-6 py-4 text-white/70 hover:text-white font-medium border-b-2 border-transparent">Gallery</a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section id="overview" className="mb-12">
              <p className="text-white/80 mb-6">
                {destination.longDescription || 
                  `Experience the magic of ${destination.title}. This destination offers a perfect blend of culture, history, and natural beauty. Explore iconic landmarks, indulge in local cuisine, and create memories that will last a lifetime.`}
              </p>
              <p className="text-white/80">
                Our carefully crafted itinerary ensures you get the most out of your visit to {destination.title}. With expert guides and comfortable accommodations, you can focus on enjoying your journey while we take care of the details.
              </p>
            </section>

            <section id="experience" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>
              <p className="text-white/80 mb-6">
                Experience the magic of {destination.title} in virtual reality. Walk through the charming streets, visit iconic landmarks, and immerse yourself in the rich culture and history of {destination.title.split(',')[0]}. Our VR experience brings the beauty and atmosphere directly to you.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">4.5+</div>
                  <div className="text-sm text-white/60">Hours</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">10+</div>
                  <div className="text-sm text-white/60">Locations</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">15+</div>
                  <div className="text-sm text-white/60">Activities</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-white/60">Support</div>
                </div>
              </div>

              {hasVRExperience && (
                <div className="bg-gradient-to-r from-teal-500/20 to-fuchsia-500/20 border border-teal-500/50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">Virtual Reality Experience Available</h3>
                  <p className="text-white/80 mb-4">
                    Immerse yourself in a 360° virtual tour of {destination.title}. Explore iconic landmarks and experience the destination from the comfort of your home.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="md:col-span-2">
                      <div className="relative h-48 md:h-full w-full rounded-lg overflow-hidden">
                        <Image
                          src={`/images/panoramas/${destination.id}-panorama.jpg`}
                          alt={`${destination.title} VR Experience`}
                          fill
                          className="object-cover"
                          onError={(e: any) => {
                            e.currentTarget.src = "/images/panoramas/default-panorama.jpg";
                            e.currentTarget.onerror = null;
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-medium text-white mb-1">Immersive Experience</h4>
                        <p className="text-sm text-white/70">360° panoramic views with interactive hotspots and audio narration</p>
                      </div>
                      
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-medium text-white mb-1">VR Compatible</h4>
                        <p className="text-sm text-white/70">Works with VR headsets or directly in your browser</p>
                      </div>
                      
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-medium text-white mb-1">Free Access</h4>
                        <p className="text-sm text-white/70">No additional cost for our virtual reality experiences</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/vr-viewer/${destination.id}`}>
                    <Button className="w-full md:w-auto bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:from-teal-500 hover:to-fuchsia-500 text-white">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-2"
                      >
                        <path d="M3 12h.01M21 12h.01M9 12h.01M15 12h.01M21 8v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1ZM7 12h10"/>
                      </svg>
                      Start VR Experience
                    </Button>
                  </Link>
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-4">What You'll Experience</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Map attractions based on destination */}
                {(() => {
                  // Define attractions for specific destinations
                  const attractionsByDestination: Record<string, string[]> = {
                    paris: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe'],
                    "great-wall": ['Mutianyu Section', 'Badaling', 'Jinshanling', 'Simatai'],
                    "taj-mahal": ['Main Mausoleum', 'The Gardens', 'Mosque', 'Gateway'],
                    "grand-canyon": ['South Rim', 'North Rim', 'Havasu Falls', 'Colorado River'],
                    santorini: ['Oia', 'Fira', 'Red Beach', 'Akrotiri'],
                    kyoto: ['Fushimi Inari', 'Kinkaku-ji', 'Arashiyama', 'Gion District'],
                  };
                  
                  // Get attractions for this destination or use generic ones
                  const attractions = attractionsByDestination[params.id] || 
                    ['Landmark 1', 'Landmark 2', 'Landmark 3', 'Landmark 4'];
                  
                  return attractions.map((spot, index) => (
                    <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                      <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-gray-700">
                        <Image 
                          src={`/images/gallery/generic/gallery-${index + 1}.jpg`}
                          alt={spot}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-white font-medium">{spot}</h3>
                    </div>
                  ));
                })()}
              </div>
            </section>

            <section id="reviews" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
              
              <div className="space-y-6">
                {[
                  {
                    name: "Sarah Johnson",
                    date: "March 15, 2023",
                    rating: 5,
                    comment: "Absolutely breathtaking experience! The VR quality was incredible, and I felt like I was actually there. Highly recommend to anyone who wants to experience this destination without traveling."
                  },
                  {
                    name: "Michael Chen",
                    date: "February 3, 2023",
                    rating: 4,
                    comment: "Great experience overall. The visuals were stunning and the interactive elements added a lot to the immersion. Would have given 5 stars if there were more historical information included."
                  },
                  {
                    name: "Emma Rodriguez",
                    date: "January 22, 2023",
                    rating: 5,
                    comment: "This VR experience exceeded my expectations! The attention to detail was amazing, and I learned so much about the culture and history. Can't wait to try more destinations!"
                  }
                ].map((review, index) => (
                  <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-white">{review.name}</h3>
                        <p className="text-sm text-white/60">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-500"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-white/80">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="gallery">
              <DestinationGallery id={params.id} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Experience Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/70">Duration</span>
                  <span className="text-white font-medium">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Language</span>
                  <span className="text-white font-medium">Multiple</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">VR Quality</span>
                  <span className="text-white font-medium">8K Ultra HD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Interactive</span>
                  <span className="text-white font-medium">Yes</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-white">${destination.price}</span>
                  <span className="text-white/70 ml-1">per person</span>
                </div>
              </div>

              {hasVRExperience ? (
                <Link href={`/vr-viewer/${destination.id}`}>
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" 
                    size="lg"
                  >
                    Start VR Experience
                  </Button>
                </Link>
              ) : (
                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" 
                  size="lg"
                >
                  Book This Trip
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
