'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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
        <div className="flex flex-col gap-1 p-element-gap">
          {navigation.map((item) => (
            <Button
              key={item.href}
              variant={isActive(item.href) ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-element-gap h-11',
                !isActive(item.href) && 'text-text-secondary hover:text-text-primary'
              )}
              asChild
            >
              <Link
                href={item.href}
                onClick={onLinkClick}
                aria-current={isActive(item.href) ? 'page' : undefined}
                title={item.description}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}