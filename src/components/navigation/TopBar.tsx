'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, FileText, Settings, Users, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { MotionSheet, MotionSheetContent, MotionSheetTrigger, MotionSheetTitle, MotionSheetDescription } from '@/components/ui/motion-sheet'
import { Sidebar } from './Sidebar'
import { interactionVariants } from '@/lib/motion'

// Navigation configuration - inline for portability
interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  description?: string
  requiresAuth?: boolean
}

const NAVIGATION: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: Home,
    description: 'Dashboard overview and analytics',
    requiresAuth: false
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'View detailed analytics and reports',
    requiresAuth: false
  },
  {
    href: '/documents',
    label: 'Documents',
    icon: FileText,
    description: 'Manage and organize documents',
    requiresAuth: false
  },
  {
    href: '/users',
    label: 'Users',
    icon: Users,
    description: 'User management and permissions',
    requiresAuth: false
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    description: 'Application settings and configuration',
    requiresAuth: false
  }
]

const BRAND = {
  name: 'Application',
  href: '/',
  description: 'Semantic design token architecture showcase'
}

interface TopBarProps {
  children?: React.ReactNode
  actions?: React.ReactNode
}

export function TopBar({ children, actions }: TopBarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Inline navigation hook logic
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  // Inline ScrollToTop functionality
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {/* TopBar Header */}
      <header className="fixed top-0 left-0 right-0 z-70 bg-surface-card">
        <div className="flex items-center justify-between h-16 px-container-padding">
          {/* Left Section: Navigation + Brand */}
          <div className="flex items-center gap-element-gap">
            {/* Motion-powered Navigation */}
            <MotionSheet open={open} onOpenChange={setOpen}>
              <MotionSheetTrigger asChild>
                <motion.button
                  className="p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                  aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={open}
                  aria-controls="mobile-navigation"
                  whileHover={interactionVariants.hover}
                  whileTap={interactionVariants.tap}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? (
                      <X className="h-5 w-5 text-text-primary" />
                    ) : (
                      <Menu className="h-5 w-5 text-text-primary" />
                    )}
                  </motion.div>
                </motion.button>
              </MotionSheetTrigger>

              <MotionSheetContent
                side="left"
                className="top-16 w-[280px] sm:w-[300px] p-0 border-r-interactive-secondary"
                id="mobile-navigation"
                hideCloseButton={true}
              >
                <MotionSheetTitle className="sr-only">Navigation Menu</MotionSheetTitle>
                <MotionSheetDescription className="sr-only">
                  Main navigation for the Application
                </MotionSheetDescription>
                <Sidebar
                  navigation={NAVIGATION}
                  isActive={isActive}
                  onLinkClick={() => setOpen(false)}
                />
              </MotionSheetContent>
            </MotionSheet>

            {/* Brand */}
            <Link
              href={BRAND.href}
              onClick={() => setOpen(false)}
              className="text-lg text-text-primary hover:scale-105 active:opacity-60 transition-all duration-150"
              aria-label={`${BRAND.name} - ${BRAND.description}`}
            >
              {BRAND.name}
            </Link>
          </div>

          {/* Center Section: Optional Content */}
          {children && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-component-gap">
              {children}
            </div>
          )}

          {/* Right Section: Actions */}
          <div className="flex items-center gap-element-gap">
            {actions}
          </div>
        </div>
      </header>
    </>
  )
}