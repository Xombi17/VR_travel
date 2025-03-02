"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { AvatarFallback } from "@/components/ui/avatar-fallback"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "The virtual tour of Paris was incredible! I felt like I was actually standing beneath the Eiffel Tower. The attention to detail is amazing.",
    avatar: "/images/avatars/avatar-1.jpg",
    rating: 5,
    destination: "Eiffel Tower, Paris"
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    text: "I've always wanted to visit the Great Wall of China, and this VR experience was the next best thing. The interactive elements made it so engaging!",
    avatar: "/images/avatars/avatar-2.jpg",
    rating: 4,
    destination: "Great Wall of China"
  },
  {
    name: "Emma Rodriguez",
    location: "London, UK",
    text: "The Taj Mahal experience transported me straight to India. The 360° views and historical information were fascinating and educational.",
    avatar: "/images/avatars/avatar-3.jpg",
    rating: 5,
    destination: "Taj Mahal, India"
  },
  {
    name: "David Kim",
    location: "Seoul, South Korea",
    text: "As someone with limited mobility, these virtual travel experiences have opened up the world to me. I'm so grateful for this technology!",
    avatar: "/images/avatars/avatar-4.jpg",
    rating: 5,
    destination: "Multiple Destinations"
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Explorers Say</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Hear from our community of virtual travelers about their immersive experiences and adventures around the
            digital globe.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 md:p-12 border border-white/10 min-h-[300px]"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: active === index ? 1 : 0,
                  x: active === index ? 0 : 100,
                  position: active === index ? "relative" : "absolute",
                }}
                transition={{ duration: 0.5 }}
                style={{
                  display: active === index ? "flex" : "none",
                }}
              >
                <div className="md:w-1/4 flex-shrink-0">
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-500 to-blue-500">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Hide the image on error
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          // Show fallback (handled by parent component)
                        }}
                      />
                    ) : (
                      <AvatarFallback name={testimonial.name} />
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-cyan-400 text-xs font-medium">{testimonial.destination}</p>
                  </div>
                </div>

                <div className="md:w-3/4 text-center md:text-left">
                  <Quote
                    className="w-10 h-10 text-cyan-500/30 mb-4 mx-auto md:mx-0"
                  />

                  <p className="text-white/90 text-lg mb-6 italic">{testimonial.text}</p>

                  <div>
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  active === index ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-white/20"
                }`}
                onClick={() => setActive(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

