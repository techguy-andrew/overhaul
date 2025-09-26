'use client'

import { usePathname } from 'next/navigation'
import { Home, FileText, Settings, Users, BarChart3 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  description?: string
  requiresAuth?: boolean
}

export const NAVIGATION: NavItem[] = [
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
] as const

export const BRAND = {
  name: 'Application',
  href: '/',
  description: 'Semantic design token architecture showcase'
} as const

export function useNavigation() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return { NAVIGATION, BRAND, isActive, pathname }
}