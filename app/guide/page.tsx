"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function GuidePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="glass-card overflow-hidden mb-12 neon-border">
          <div className="relative h-64 md:h-80">
            <Image
              src="/images/devices/htc-vive.jpg"
              alt="VR Setup Guide"
              fill
              className="object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-800/70 backdrop-filter backdrop-blur-sm" />
            
            <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6 gradient-text neon-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                VR Setup Guide
              </motion.h1>
              
              <motion.p 
                className="text-lg text-white/80 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Step-by-step instructions for setting up your VR headset for the best Virtual Voyage experience
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Device Selection Tabs */}
        <div className="max-w-4xl mx-auto mb-16">
          <Tabs defaultValue="meta-quest">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 glass-effect p-1 mb-8">
              <TabsTrigger 
                value="meta-quest"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-fuchsia-400 data-[state=active]:text-slate-900"
              >
                Meta Quest
              </TabsTrigger>
              <TabsTrigger 
                value="htc-vive"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-fuchsia-400 data-[state=active]:text-slate-900"
              >
                HTC Vive
              </TabsTrigger>
              <TabsTrigger 
                value="valve-index"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-fuchsia-400 data-[state=active]:text-slate-900"
              >
                Valve Index
              </TabsTrigger>
              <TabsTrigger 
                value="smartphone"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-400 data-[state=active]:to-fuchsia-400 data-[state=active]:text-slate-900"
              >
                Smartphone VR
              </TabsTrigger>
            </TabsList>
            
            {/* Meta Quest Setup */}
            <TabsContent value="meta-quest" className="mt-8">
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src="/images/devices/meta-quest.jpg"
                        alt="Meta Quest Headset"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">Meta Quest Setup</h2>
                    <p className="text-white/70 mb-4">
                      The Meta Quest is a standalone VR headset that doesn't require a PC or external sensors. 
                      Follow these steps to set up your Meta Quest for Virtual Voyage.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1 text-white/70">
                          <li>Meta Quest 2 or Meta Quest 3 headset</li>
                          <li>Stable Wi-Fi connection</li>
                          <li>Meta Quest mobile app (iOS or Android)</li>
                          <li>Virtual Voyage app installed on your headset</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Step 1: Initial Setup</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-white/70">
                      <li>
                        <p className="font-medium text-white">Charge your headset</p>
                        <p>Ensure your Meta Quest is fully charged before starting the setup process.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Download the Meta Quest app</p>
                        <p>Install the Meta Quest app on your smartphone from the App Store or Google Play Store.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Create or log in to your Meta account</p>
                        <p>Open the app and either create a new Meta account or log in with your existing credentials.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Connect your headset</p>
                        <p>Turn on your headset and follow the in-app instructions to pair it with your smartphone.</p>
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Step 2: Install Virtual Voyage</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-white/70">
                      <li>
                        <p className="font-medium text-white">Open the Meta Quest Store</p>
                        <p>Put on your headset and navigate to the App Store from the main menu.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Search for Virtual Voyage</p>
                        <p>Use the search function to find the Virtual Voyage app.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Download and install</p>
                        <p>Select the app and click "Download" or "Purchase" to install it on your headset.</p>
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Step 3: Optimize Your Experience</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-white/70">
                      <li>
                        <p className="font-medium text-white">Adjust your headset fit</p>
                        <p>Make sure your headset is comfortable and the display is clear. Adjust the straps and IPD (interpupillary distance) as needed.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Set up Guardian boundaries</p>
                        <p>Follow the prompts to set up your play area boundaries to ensure you have enough space for a safe VR experience.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Connect to Wi-Fi</p>
                        <p>Ensure your headset is connected to a stable Wi-Fi network for the best streaming quality.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Launch Virtual Voyage</p>
                        <p>Open the Virtual Voyage app from your library and sign in with your account credentials.</p>
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Troubleshooting</h3>
                    <div className="space-y-4 text-white/70">
                      <div>
                        <p className="font-medium text-white">Poor image quality or lag</p>
                        <p>Ensure you're connected to a strong Wi-Fi signal. 5GHz networks provide better performance for VR streaming.</p>
                      </div>
                      <div>
                        <p className="font-medium text-white">App crashes or freezes</p>
                        <p>Restart your headset by holding the power button for 10 seconds. If problems persist, try reinstalling the app.</p>
                      </div>
                      <div>
                        <p className="font-medium text-white">Controller tracking issues</p>
                        <p>Make sure your play area is well-lit but not too bright. Replace controller batteries if they're low.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/help">
                    <Button variant="outline">
                      Need more help? Visit our Help Center
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            {/* HTC Vive Setup */}
            <TabsContent value="htc-vive" className="mt-8">
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src="/images/devices/htc-vive.jpg"
                        alt="HTC Vive Headset"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">HTC Vive Setup</h2>
                    <p className="text-white/70 mb-4">
                      The HTC Vive is a PC-powered VR headset that offers high-quality visuals and precise tracking.
                      Follow these steps to set up your HTC Vive for Virtual Voyage.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1 text-white/70">
                          <li>HTC Vive headset with controllers and base stations</li>
                          <li>VR-ready PC (see recommended specifications below)</li>
                          <li>Steam and SteamVR installed on your PC</li>
                          <li>Virtual Voyage app installed through Steam</li>
                          <li>At least 2m x 1.5m of clear play space</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Step 1: Hardware Setup</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-white/70">
                      <li>
                        <p className="font-medium text-white">Set up base stations</p>
                        <p>Mount the base stations in opposite corners of your play area, angled down toward the center. They should be above head height (at least 2m from the floor).</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Connect the link box</p>
                        <p>Connect the link box to your PC using the HDMI and USB cables. Then connect the power adapter.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Connect the headset</p>
                        <p>Connect the headset to the link box using the 3-in-1 cable.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Power on the controllers</p>
                        <p>Turn on the controllers by pressing the system button on each one.</p>
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Step 2: Software Setup</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-white/70">
                      <li>
                        <p className="font-medium text-white">Install Steam and SteamVR</p>
                        <p>Download and install Steam from the official website, then install SteamVR from the Steam store.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Run room setup</p>
                        <p>Launch SteamVR and follow the room setup process to define your play area.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Install Virtual Voyage</p>
                        <p>Search for Virtual Voyage in the Steam store and install it on your PC.</p>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/help">
                    <Button variant="outline">
                      Need more help? Visit our Help Center
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            {/* Valve Index Setup */}
            <TabsContent value="valve-index" className="mt-8">
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src="/images/devices/valve-index.jpg"
                        alt="Valve Index Headset"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">Valve Index Setup</h2>
                    <p className="text-white/70 mb-4">
                      The Valve Index is a premium PC-powered VR headset known for its high-quality displays, audio, and controllers.
                      Follow these steps to set up your Valve Index for Virtual Voyage.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1 text-white/70">
                          <li>Valve Index headset, controllers, and base stations</li>
                          <li>VR-ready PC (see recommended specifications below)</li>
                          <li>Steam and SteamVR installed on your PC</li>
                          <li>Virtual Voyage app installed through Steam</li>
                          <li>At least 2m x 2m of clear play space</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Basic Setup Steps</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-white/70">
                      <li>
                        <p className="font-medium text-white">Install SteamVR</p>
                        <p>Download and install Steam, then install SteamVR from the Steam store.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Set up base stations</p>
                        <p>Mount the base stations in opposite corners of your play area, above head height.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Connect the headset</p>
                        <p>Connect the headset to your PC using the provided cables.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Run room setup</p>
                        <p>Follow the SteamVR room setup process to define your play area.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Install Virtual Voyage</p>
                        <p>Purchase and install Virtual Voyage from the Steam store.</p>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/help">
                    <Button variant="outline">
                      Need more help? Visit our Help Center
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            {/* Smartphone VR Setup */}
            <TabsContent value="smartphone" className="mt-8">
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src="/images/devices/smartphone-vr.jpg"
                        alt="Smartphone VR Headset"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">Smartphone VR Setup</h2>
                    <p className="text-white/70 mb-4">
                      Smartphone VR viewers are an affordable way to experience virtual reality using your existing smartphone.
                      Follow these steps to set up your smartphone for Virtual Voyage.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1 text-white/70">
                          <li>Compatible smartphone (iOS or Android)</li>
                          <li>Smartphone VR headset (Google Cardboard, Samsung Gear VR, etc.)</li>
                          <li>Virtual Voyage mobile app installed on your smartphone</li>
                          <li>Stable Wi-Fi connection</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Step 1: Prepare Your Smartphone</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-white/70">
                      <li>
                        <p className="font-medium text-white">Install the Virtual Voyage app</p>
                        <p>Download and install the Virtual Voyage app from the App Store (iOS) or Google Play Store (Android).</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Create or log in to your account</p>
                        <p>Open the app and either create a new account or log in with your existing credentials.</p>
                      </li>
                      <li>
                        <p className="font-medium text-white">Enable VR mode</p>
                        <p>In the app settings, enable VR mode to prepare for viewing content with your headset.</p>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/help">
                    <Button variant="outline">
                      Need more help? Visit our Help Center
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 