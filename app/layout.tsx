import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import { Toaster } from "sonner"
import { AuthProvider } from "@/components/auth/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Virtual Voyage - Experience the world from home",
  description:
    "Explore the world's most amazing destinations through immersive virtual reality experiences.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <Navigation />
            <main>{children}</main>
            <Toaster position="top-right" richColors />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
