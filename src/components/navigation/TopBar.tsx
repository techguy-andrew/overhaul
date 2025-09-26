'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, FileText, Settings, Users, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
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
  const [isOpen, setIsOpen] = useState(false)
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

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* TopBar Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-card border-b border-interactive-secondary">
        <div className="flex items-center justify-between h-16 px-container-padding">
          {/* Left Section: Navigation + Brand */}
          <div className="flex items-center gap-element-gap">
            {/* Universal Menu Toggle - Seamless hamburger-to-close transition */}
            <Button
              variant="ghost"
              size="sm"
              className="px-element-gap py-element-gap transition-all duration-200 ease-in-out"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="navigation-sidebar"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

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

      {/* Custom Overlay - Claims-App Style */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop - only dims content area below topbar */}
          <div
            className="absolute top-16 left-0 right-0 bottom-0 bg-surface-background/50 transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          />

          {/* Sidebar positioned below topbar */}
          <div
            className="absolute top-16 left-0 w-[280px] h-[calc(100vh-4rem)] bg-surface-card border-r border-interactive-secondary shadow-lg transform transition-transform duration-200 ease-in-out"
            id="navigation-sidebar"
            role="navigation"
            aria-label="Main navigation"
          >
            <Sidebar
              navigation={NAVIGATION}
              isActive={isActive}
              onLinkClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}