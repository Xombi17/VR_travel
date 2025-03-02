import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { PageTransitionProvider } from "@/components/page-transition-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Virtual Voyage - Experience the World in VR",
  description:
    "Explore the world's most breathtaking destinations from the comfort of your home with our cutting-edge VR technology.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        <PageTransitionProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
          <Toaster position="bottom-right" theme="dark" />
        </PageTransitionProvider>
      </body>
    </html>
  )
}
