'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Home, FileText, Settings, Users, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-card border-b border-interactive-secondary">
        <div className="flex items-center justify-between h-16 px-container-padding">
          {/* Left Section: Navigation + Brand */}
          <div className="flex items-center gap-element-gap">
            {/* Claims App Style Sheet Navigation */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-element-gap py-element-gap"
                  aria-label="Open navigation menu"
                  aria-expanded={open}
                  aria-controls="mobile-navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[280px] sm:w-[300px] p-0"
                id="mobile-navigation"
                hideCloseButton={true}
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation for the Application
                </SheetDescription>
                <Sidebar
                  navigation={NAVIGATION}
                  isActive={isActive}
                  onLinkClick={() => setOpen(false)}
                />
              </SheetContent>
            </Sheet>

            {/* Brand */}
            <Link
              href={BRAND.href}
              className="font-semibold text-lg text-text-primary hover:text-text-accent transition-colors"
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