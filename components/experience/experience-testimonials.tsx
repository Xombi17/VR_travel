"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Jessica Chen",
    role: "Travel Enthusiast",
    avatar: "/images/avatars/avatar-1.jpg",
    content: "The VR experience of the Northern Lights was breathtaking! I felt like I was actually standing in Iceland watching the aurora dance across the sky. Incredible detail and immersion.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Tech Blogger",
    avatar: "/images/avatars/avatar-2.jpg",
    content: "As someone who reviews VR experiences professionally, I can say that these travel experiences are among the best I've tried. The attention to detail and sound design create a truly immersive experience.",
    rating: 5
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Photography Teacher",
    avatar: "/images/avatars/avatar-3.jpg",
    content: "I use these VR experiences to show my photography students perspectives they couldn't otherwise capture. The Santorini sunset experience is particularly stunning!",
    rating: 4
  }
]

export default function ExperienceTestimonials() {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 mr-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Fallback for avatar */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-white/50 text-sm">{testimonial.role}</p>
              </div>
            </div>
            
            <p className="text-white/80 mb-4">{testimonial.content}</p>
            
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i} 
                  className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-white/20'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 