"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// FAQ data structure
interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: "How do I set up my VR headset for Virtual Voyage?",
    answer: "To set up your VR headset, first ensure it's fully charged and connected to Wi-Fi. Download our app from your headset's app store, create an account or sign in, and follow the on-screen instructions for setup. For detailed instructions specific to your device, please visit our <a href='/guide' class='text-teal-400 hover:underline'>VR Setup Guide</a>.",
    category: "vr-setup"
  },
  {
    question: "Which VR headsets are compatible with Virtual Voyage?",
    answer: "Virtual Voyage is compatible with Meta Quest 2 & 3, HTC Vive, Valve Index, and most smartphone-based VR viewers. We're constantly expanding our device support. For the best experience, we recommend using a dedicated VR headset rather than a smartphone viewer.",
    category: "vr-setup"
  },
  {
    question: "My VR headset isn't connecting to the app. What should I do?",
    answer: "First, ensure your headset is fully charged and connected to Wi-Fi. Restart both your headset and the app. Check if your headset's firmware is up to date. If problems persist, try uninstalling and reinstalling the app. If you're still experiencing issues, please contact our support team.",
    category: "vr-setup"
  },
  {
    question: "How do I create an account?",
    answer: "To create an account, click the 'Sign Up' button in the top right corner of our website or app. Enter your email address, create a password, and fill in your profile information. Verify your email address by clicking the link sent to your inbox, and you're all set!",
    category: "account"
  },
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click 'Sign In' and then 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link. Click the link in the email and follow the instructions to create a new password.",
    category: "account"
  },
  {
    question: "Can I have multiple profiles under one account?",
    answer: "Yes, you can create up to 5 profiles under a single account. This is perfect for families or groups who share a VR headset. Each profile can have its own preferences, saved destinations, and viewing history.",
    category: "account"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. In select regions, we also offer Google Pay and regional payment methods.",
    category: "payment"
  },
  {
    question: "How do I update my payment information?",
    answer: "To update your payment information, go to your Account Settings, select 'Payment Methods', and click 'Edit' next to the payment method you wish to update. You can also add new payment methods from this screen.",
    category: "payment"
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer refunds within 14 days of purchase if you haven't accessed the VR experience. If you've experienced technical issues that prevented you from enjoying the experience, please contact our support team for assistance.",
    category: "payment"
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. We use industry-standard encryption and security measures to protect your payment information. We are PCI DSS compliant and never store your full credit card details on our servers.",
    category: "payment"
  },
  {
    question: "How do I download experiences for offline viewing?",
    answer: "To download experiences for offline viewing, navigate to the destination page and click the 'Download' button. Make sure you have enough storage space on your device. Downloaded experiences will be available in the 'Downloads' section of your profile.",
    category: "usage"
  },
  {
    question: "Can I share my experiences with friends?",
    answer: "Yes! You can share your favorite destinations by clicking the 'Share' button on any destination page. You can share via email, social media, or generate a unique link. Your friends will need their own account to access the full VR experience.",
    category: "usage"
  }
]

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([])
  
  // Filter FAQs based on category and search query
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })
  
  // Toggle FAQ expansion
  const toggleFAQ = (index: number) => {
    setExpandedFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    )
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Help Center</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Find answers to common questions about Virtual Voyage, VR setup, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass-effect rounded-full flex items-center p-2 pl-4">
            <Search className="w-5 h-5 text-white/50 mr-2" />
            <Input
              type="text"
              placeholder="Search for answers..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {["all", "vr-setup", "account", "payment"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 font-medium"
                    : "glass-effect text-white/70 hover:text-white"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category === "all"
                  ? "All Questions"
                  : category === "vr-setup"
                  ? "VR Setup"
                  : category === "account"
                  ? "Account"
                  : "Payment"}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
          
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <p className="text-xl text-white/70">No results found for "{searchQuery}"</p>
              <p className="mt-2 text-white/50">Try a different search term or browse by category</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="glass-card overflow-hidden border border-white/10 hover:border-teal-400/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 flex justify-between items-center text-left"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="font-medium text-lg pr-8">{faq.question}</h3>
                    {expandedFAQs.includes(index) ? (
                      <ChevronUp className="flex-shrink-0 text-teal-400" />
                    ) : (
                      <ChevronDown className="flex-shrink-0 text-white/60" />
                    )}
                  </button>
                  
                  {expandedFAQs.includes(index) && (
                    <div className="px-6 pb-4 text-white/70">
                      <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Additional Help Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 gradient-text">VR Setup Guide</h3>
            <p className="text-white/70 mb-4">
              Detailed instructions for setting up and optimizing your VR experience with various headsets.
            </p>
            <Link href="/guide">
              <Button variant="outline" className="w-full glass-effect border-teal-400/30 hover:bg-teal-400/10">
                View Guide
              </Button>
            </Link>
          </div>
          
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 gradient-text">Contact Support</h3>
            <p className="text-white/70 mb-4">
              Can't find what you're looking for? Our support team is here to help with any questions.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="w-full glass-effect border-teal-400/30 hover:bg-teal-400/10">
                Contact Us
              </Button>
            </Link>
          </div>
          
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 gradient-text">Video Tutorials</h3>
            <p className="text-white/70 mb-4">
              Step-by-step video guides for using our VR travel platform and troubleshooting common issues.
            </p>
            <Link href="/tutorials">
              <Button variant="outline" className="w-full glass-effect border-teal-400/30 hover:bg-teal-400/10">
                Watch Videos
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Live Chat CTA */}
        <div className="glass-card p-8 text-center max-w-4xl mx-auto neon-border">
          <h3 className="text-2xl font-bold mb-3 gradient-text">Need Immediate Assistance?</h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Our support team is available 24/7 to help with any questions or technical issues you may have.
          </p>
          <Button className="bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 hover:bg-gradient-to-r hover:from-teal-500 hover:to-fuchsia-500">
            Start Live Chat
          </Button>
        </div>
      </div>
    </div>
  )
} 