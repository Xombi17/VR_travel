"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { destinations } from "@/data/destinations"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { OptimizedImage } from "@/components/optimized-image"
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function getDestinationImage(id: string) {
  const destinationImages: Record<string, string> = {
    paris: "/images/destinations/eiffel-tower.jpg",
    "great-wall": "/images/destinations/great-wall.jpg",
    "taj-mahal": "/images/destinations/taj-mahal.jpg",
    "machu-picchu": "/images/destinations/machu-picchu.jpg",
    pyramids: "/images/destinations/pyramids.jpg",
    "grand-canyon": "/images/destinations/grand-canyon.jpg",
    santorini: "/images/destinations/santorini.jpg",
    venice: "/images/destinations/venice.jpg",
    kyoto: "/images/destinations/kyoto.jpg",
    "northern-lights": "/images/destinations/northern-lights.jpg",
    "angkor-wat": "/images/destinations/angkor-wat.jpg",
    rio: "/images/destinations/rio.jpg",
    serengeti: "/images/destinations/serengeti.jpg",
    "bora-bora": "/images/destinations/bora-bora.jpg",
    sydney: "/images/destinations/sydney.jpg",
    petra: "/images/destinations/petra.jpg"
  }
  return destinationImages[id] || "/images/destinations/default.jpg"
}

export default function Home() {
  const featuredDestinations = destinations.filter(d => d.featured) || destinations.slice(0, 6)
  
  // Refs for sections
  const containerRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const immersiveRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Scroll animations
  const { scrollY, windowHeight, isElementInView } = useScrollAnimation();
  const { scrollYProgress } = useScroll();

  // Parallax scroll values for each section
  const featuredY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const immersiveY = useTransform(scrollYProgress, [0.2, 0.8], [100, 0]);
  const howItWorksY = useTransform(scrollYProgress, [0.4, 0.9], [100, 0]);
  const ctaY = useTransform(scrollYProgress, [0.6, 1], [100, 0]);

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Fixed Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-fuchsia-400 transform-none z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="gradient-text-purple">Virtual Travel</span>
              <br />
              <span className="text-white">Experience</span>
            </motion.h1>
            <motion.p
              className="text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore the world's most iconic destinations in stunning virtual reality.
              Immerse yourself in breathtaking 360° views and interactive experiences.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/destinations">
                <Button size="lg" className="bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:from-teal-500 hover:to-fuchsia-500 text-white text-lg px-8 shadow-lg shadow-fuchsia-500/20">
                  Start Exploring
                </Button>
              </Link>
              <Link href="/vr-viewer">
                <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                  Watch Demo
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - VR Badge and Decorative Elements */}
          <motion.div
            className="relative aspect-square"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* VR Badge */}
              <motion.div
                className="w-32 h-32 bg-[#0a1128]/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white font-bold text-4xl">VR</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.8,
          }}
          onClick={() => scrollToSection('featured-destinations')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white/50 hover:text-white/80 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Featured Destinations */}
      <motion.section
        ref={featuredRef}
        id="featured-destinations"
        className="relative py-24"
        style={{ y: featuredY }}
      >
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text-purple">Popular Destinations</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Discover our handpicked selection of the world's most iconic locations
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            {featuredDestinations
              .map((destination, index) => (
                <motion.div
                  key={destination.id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.8 }}
                  className="group"
                >
                  <Link href={`/destinations/${destination.id}`}>
                    <div className="relative overflow-hidden rounded-xl glass-card glass-card-hover">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={getDestinationImage(destination.id)}
                          alt={destination.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                          {destination.title}
                        </h3>
                        <p className="text-slate-300 mb-4 line-clamp-2">
                          {destination.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-white">{destination.rating}</span>
                            <span className="text-slate-400">({destination.reviewCount})</span>
                          </div>
                          <span className="text-cyan-400 font-semibold">${destination.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <Link href="/destinations">
              <Button size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white text-lg px-8 shadow-lg shadow-blue-500/20">
                View All Destinations
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Immersive VR Experience Section */}
      <motion.section
        ref={immersiveRef}
        id="immersive-vr"
        className="relative py-24 overflow-hidden"
        style={{ y: immersiveY }}
      >
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Immersive </span>
                <span className="gradient-text-purple">Virtual Reality</span><br />
                <span className="text-white">Travel Experience</span>
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Our cutting-edge VR technology transports you to the world's most breathtaking
                destinations. Experience the sights, sounds, and atmosphere of global landmarks
                without leaving your home.
              </p>
              
              <div className="space-y-6 mb-8">
                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-gradient-to-r from-teal-400 to-fuchsia-400 rounded-full p-2 mt-1 glowing">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-white">360° Panoramic Views</h3>
                    <p className="text-white/70">Fully immersive panoramic experiences of each destination</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-gradient-to-r from-teal-400 to-fuchsia-400 rounded-full p-2 mt-1 glowing">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-white">Interactive Elements</h3>
                    <p className="text-white/70">Interact with your environment and discover hidden features</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-gradient-to-r from-teal-400 to-fuchsia-400 rounded-full p-2 mt-1 glowing">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-white">Guided Tours</h3>
                    <p className="text-white/70">Expert narration and historical context for each location</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false }}
              >
                <Link href="/vr-viewer">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:from-teal-500 hover:to-fuchsia-500 text-white text-lg px-8 shadow-lg shadow-fuchsia-500/20"
                  >
                    Start Your VR Journey
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-white/10">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-fuchsia-400/20"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <OptimizedImage
                  src="/images/panoramas/santorini-panorama.jpg"
                  alt="VR Experience"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 to-transparent rounded-full" />
                
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: false }}
                >
                  <motion.div 
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-r from-teal-400/20 to-fuchsia-400/20 blur-3xl"
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div 
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-fuchsia-400/20 to-purple-500/20 blur-3xl"
                animate={{ 
                  y: [0, 15, 0],
                  x: [0, -10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        ref={howItWorksRef}
        id="how-it-works"
        className="relative py-24"
        style={{ y: howItWorksY }}
      >
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-[#5eead4]">How It Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              <div className="mb-6 relative mx-auto w-16 h-16">
                <div className="absolute inset-0 bg-[#5eead4] rounded-full opacity-20 blur-xl"></div>
                <div className="relative bg-[#5eead4]/10 rounded-full p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5eead4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Choose a Destination</h3>
              <p className="text-slate-300">Browse our extensive collection of destinations from around the world</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <div className="mb-6 relative mx-auto w-16 h-16">
                <div className="absolute inset-0 bg-[#5eead4] rounded-full opacity-20 blur-xl"></div>
                <div className="relative bg-[#5eead4]/10 rounded-full p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5eead4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Prepare Your Device</h3>
              <p className="text-slate-300">Set up your VR headset or use your computer, tablet, or smartphone</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false }}
            >
              <div className="mb-6 relative mx-auto w-16 h-16">
                <div className="absolute inset-0 bg-[#5eead4] rounded-full opacity-20 blur-xl"></div>
                <div className="relative bg-[#5eead4]/10 rounded-full p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5eead4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Immerse Yourself</h3>
              <p className="text-slate-300">Explore 360° panoramic views and interactive experiences of your chosen destination</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        ref={ctaRef}
        id="cta"
        className="relative py-24"
        style={{ y: ctaY }}
      >
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
          <div className="relative overflow-hidden rounded-2xl bg-[#0a1128]/40 backdrop-blur-sm p-8 md:p-12">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text-purple">Ready to Start Your Virtual Journey?</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8">
                Experience the world's most breathtaking destinations from the comfort of your home. No passport required.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/destinations">
                  <Button size="lg" className="bg-gradient-to-r from-teal-400 to-fuchsia-400 hover:from-teal-500 hover:to-fuchsia-500 text-white text-lg px-8 shadow-lg shadow-fuchsia-500/20">
                    Explore Now
                  </Button>
                </Link>
                <Link href="/vr-viewer">
                  <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 text-lg px-8">
                    Try VR Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
