"use client"

import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { createContext, useContext, type ReactNode } from "react"

type PageTransitionContextType = {
  pathname: string
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  pathname: "/",
})

export const usePageTransition = () => useContext(PageTransitionContext)

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <PageTransitionContext.Provider value={{ pathname }}>
      <AnimatePresence mode="wait" initial={false}>
        {children}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}

