"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Glass Card Component
interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ children, className, hoverEffect = false }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 backdrop-blur-sm",
        hoverEffect && "transition-transform hover:scale-105 duration-300",
        className
      )}
    >
      {children}
    </div>
  )
}

// Section Header Component
interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({ title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-slate-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// Feature Card Component
interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="bg-gradient-to-br from-teal-400 to-fuchsia-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-300">
        {description}
      </p>
    </div>
  )
}

// Animated Section Component
interface AnimatedSectionProps {
  children: ReactNode
  className?: string
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Badge Component
interface BadgeProps {
  children: ReactNode
  variant?: "default" | "outline" | "secondary" | "destructive"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variantClasses = {
    default: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    outline: "bg-transparent border-white/20 text-white",
    secondary: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    destructive: "bg-red-500/10 text-red-400 border-red-500/20",
  }

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  )
}

// Gradient Text Component
interface GradientTextProps {
  children: ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span className={cn("gradient-text", className)}>
      {children}
    </span>
  )
}

// Animated Button Component
interface AnimatedButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "default" | "outline" | "secondary" | "destructive" | "gradient"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function AnimatedButton({ 
  children, 
  href, 
  onClick, 
  variant = "default", 
  size = "default",
  className 
}: AnimatedButtonProps) {
  const buttonContent = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <Button
        variant={variant === "gradient" ? "default" : variant}
        size={size}
        onClick={onClick}
        className={cn(
          variant === "gradient" && "bg-gradient-to-r from-teal-400 to-fuchsia-400 text-slate-900 hover:from-teal-500 hover:to-fuchsia-500",
          className
        )}
      >
        {children}
      </Button>
    </motion.div>
  )

  return buttonContent
}

// Divider Component
interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={cn("flex items-center my-8", className)}>
      <div className="flex-grow h-px bg-slate-700/50"></div>
      <div className="flex-grow h-px bg-slate-700/50"></div>
    </div>
  )
}

// Stat Card Component
interface StatCardProps {
  value: string | number
  label: string
  icon?: ReactNode
  className?: string
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div className={cn("glass-card p-6 rounded-xl text-center", className)}>
      {icon && (
        <div className="mb-4 flex justify-center">
          {icon}
        </div>
      )}
      <div className="text-3xl font-bold mb-2 gradient-text">{value}</div>
      <div className="text-sm text-slate-300">{label}</div>
    </div>
  )
}
