"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Team members data
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "Former travel photographer with a passion for making travel experiences accessible to everyone through technology.",
      image: "/images/about/team/team-alex.jpg",
    },
    {
      name: "Sophia Chen",
      role: "Chief Technology Officer",
      bio: "VR specialist with 10+ years of experience developing immersive digital environments and interactive experiences.",
      image: "/images/about/team/team-sophia.jpg",
    },
    {
      name: "Marcus Johnson",
      role: "Creative Director",
      bio: "Award-winning filmmaker who brings destinations to life through compelling storytelling and stunning visuals.",
      image: "/images/about/team/team-marcus.jpg",
    },
    {
      name: "Leila Patel",
      role: "Head of Partnerships",
      bio: "Travel industry veteran who collaborates with tourism boards and cultural institutions worldwide.",
      image: "/images/about/team/team-leila.jpg",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section - Updated Two-Column Layout */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Making Virtual Travel
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Accessible to Everyone
                </span>
              </motion.h1>

              <motion.p
                className="text-white/80 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We're on a mission to revolutionize how people experience the world through immersive
                virtual reality technology. Our platform brings the wonders of global travel to your home.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="/destinations">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-6 text-lg">
                    Explore Destinations
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Section - Updated with Card Design */}
            <motion.div
              className="glass-card p-8 rounded-xl border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Our Impact
              </h3>
              
              <div className="grid grid-cols-2 gap-8">
                <motion.div 
                  className="flex flex-col"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">50K+</h3>
                  <p className="text-white/70">Active Users</p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">100+</h3>
                  <p className="text-white/70">Destinations</p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">4.9</h3>
                  <p className="text-white/70">User Rating</p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">24/7</h3>
                  <p className="text-white/70">Support</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Our Story</h2>
              <p className="text-white/70 mb-4">
                Founded in 2024, VirtualVoyage began with a simple idea: make world travel accessible to everyone through virtual reality. What started as a small team of tech enthusiasts has grown into a global platform connecting people to extraordinary destinations.
              </p>
              <p className="text-white/70 mb-4">
                Today, we're proud to offer the most immersive virtual travel experiences, powered by cutting-edge VR technology and a passion for exploration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/destinations">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Explore Destinations
                  </Button>
                </Link>
                <Link href="/guide">
                  <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30">
                    VR Setup Guide
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="relative h-[400px] rounded-xl overflow-hidden shadow-lg shadow-cyan-500/10"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <Image
                src="/images/about/our-story.jpg"
                alt="VirtualVoyage Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Our Values
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              These core principles guide everything we do at VirtualVoyage, from developing new experiences to supporting our community.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div 
              className="glass-card p-8 rounded-xl border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
              whileHover={{ boxShadow: "0 0 20px rgba(94, 234, 212, 0.3)" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-cyan-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m7 10 5 5 5-5"></path>
                  <path d="M12 15V3"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Accessibility</h3>
              <p className="text-white/70">
                We believe everyone should be able to experience the world's wonders, regardless of physical ability, financial means, or time constraints.
              </p>
            </motion.div>

            <motion.div 
              className="glass-card p-8 rounded-xl border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
              whileHover={{ boxShadow: "0 0 20px rgba(94, 234, 212, 0.3)" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-cyan-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                  <path d="m3 11 18-5v12L3 14v-3z"></path>
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Authenticity</h3>
              <p className="text-white/70">
                We strive to create experiences that are true to the spirit and culture of each destination, working with local experts and cultural institutions.
              </p>
            </motion.div>

            <motion.div 
              className="glass-card p-8 rounded-xl border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
              whileHover={{ boxShadow: "0 0 20px rgba(94, 234, 212, 0.3)" }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-cyan-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Innovation</h3>
              <p className="text-white/70">
                We continuously push the boundaries of what's possible with VR technology to create increasingly immersive and interactive travel experiences.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Meet Our Team
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The passionate individuals behind VirtualVoyage who are dedicated to bringing the world to your doorstep.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="glass-card rounded-xl border border-white/10 backdrop-blur-sm overflow-hidden hover:scale-105 transition-transform duration-300"
                variants={itemVariants}
                whileHover={{ boxShadow: "0 0 20px rgba(94, 234, 212, 0.3)" }}
              >
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{member.name}</h3>
                    <p className="text-cyan-400 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white/70">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div 
              className="relative h-[450px] rounded-xl overflow-hidden shadow-lg shadow-cyan-500/10 order-2 md:order-1"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <Image
                src="/images/about/technology.jpg"
                alt="VR Technology"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"></path>
                  </svg>
                  <span className="text-sm font-medium">Cutting-edge VR Technology</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="order-1 md:order-2" variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Our Technology</h2>
              <p className="text-white/70 mb-6">
                At VirtualVoyage, we use cutting-edge VR technology to create immersive travel experiences that transport you to destinations around the world from the comfort of your home.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-cyan-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">High-Definition 360° Video</h4>
                    <p className="text-white/70 text-sm">Immersive visuals that make you feel like you're really there.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-cyan-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Spatial Audio</h4>
                    <p className="text-white/70 text-sm">Authentic soundscapes that enhance the sense of presence.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-cyan-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Interactive Elements</h4>
                    <p className="text-white/70 text-sm">Engage with your surroundings for a more dynamic experience.</p>
                  </div>
                </div>
              </div>
              
              <Link href="/guide">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Learn About Our VR Setup
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-xl border border-white/10 backdrop-blur-sm">
            <motion.div className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Ready to Explore the World?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Start your virtual journey today and discover the world from a new perspective. No passport required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/destinations">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-6 text-lg">
                    Explore Destinations
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 px-8 py-6 text-lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 