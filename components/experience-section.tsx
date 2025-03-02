"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ExperienceSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/vr-experience-bg.jpg"
          alt="VR Experience background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Immersive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Virtual Reality
              </span>{" "}
              Travel Experience
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Our cutting-edge VR technology transports you to the world&apos;s most breathtaking destinations. Experience
              the sights, sounds, and atmosphere of global landmarks without leaving your home.
            </p>

            <div className="space-y-4">
              {[
                { title: "360° Panoramic Views", desc: "Fully immersive panoramic experiences of each destination" },
                { title: "Interactive Elements", desc: "Interact with your environment and discover hidden features" },
                { title: "Guided Tours", desc: "Expert narration and historical context for each location" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">{feature.title}</h3>
                    <p className="text-white/60">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-8 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your VR Journey
            </motion.button>
          </motion.div>

          <motion.div className="lg:w-1/2 relative" style={{ scale, opacity, y }}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central VR portal */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                <Image
                  src="/images/backgrounds/vr-experience-bg.jpg"
                  alt="VR Portal"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Orbital ring */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Floating destination bubbles */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                // Use different destination images for each bubble
                const destinations = [
                  "/images/destinations/eiffel-tower.jpg",
                  "/images/destinations/great-wall.jpg",
                  "/images/destinations/taj-mahal.jpg",
                  "/images/destinations/santorini.jpg",
                  "/images/destinations/machu-picchu.jpg",
                  "/images/destinations/northern-lights.jpg"
                ];
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 rounded-full overflow-hidden border-2 border-white/30"
                    style={{
                      top: `calc(50% - 8% + ${Math.sin((angle * Math.PI) / 180) * 45}%)`,
                      left: `calc(50% - 8% + ${Math.cos((angle * Math.PI) / 180) * 45}%)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Image
                      src={destinations[i]}
                      alt={`Destination bubble ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

