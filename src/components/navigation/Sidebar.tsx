'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

// Navigation item interface for portability
interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  description?: string
  requiresAuth?: boolean
}

interface SidebarProps {
  navigation: NavItem[]
  isActive: (href: string) => boolean
  onLinkClick?: () => void
  className?: string
}

export function Sidebar({ navigation, isActive, onLinkClick, className }: SidebarProps) {
  return (
    <nav className={cn('flex flex-col h-full bg-surface-card', className)}>
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col p-element-gap">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              aria-current={isActive(item.href) ? 'page' : undefined}
              title={item.description}
              className={cn(
                'flex items-center gap-element-gap py-3 px-0 transition-all duration-150',
                'hover:scale-105 active:opacity-60',
                isActive(item.href)
                  ? 'text-text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}