'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { createStagger, motionTransitions, interactionVariants, getReducedMotionTransition } from '@/lib/motion'
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

// Animation variants for navigation items
const navItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    transition: getReducedMotionTransition(motionTransitions.fast)
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: getReducedMotionTransition(motionTransitions.normal)
  }
}

const containerVariants = createStagger(0.05)

export function Sidebar({ navigation, isActive, onLinkClick, className }: SidebarProps) {
  return (
    <motion.nav
      className={cn('flex flex-col h-full bg-surface-card', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col p-element-gap">
          {navigation.map((item, index) => (
            <motion.div
              key={item.href}
              variants={navItemVariants}
              custom={index}
            >
              <Link
                href={item.href}
                onClick={onLinkClick}
                aria-current={isActive(item.href) ? 'page' : undefined}
                title={item.description}
                className="block"
              >
                <motion.div
                  className={cn(
                    'flex items-center gap-element-gap py-3 px-0 rounded-md transition-colors duration-150',
                    isActive(item.href)
                      ? 'text-text-accent bg-interactive-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-interactive-secondary/50'
                  )}
                  whileHover={interactionVariants.hover}
                  whileTap={interactionVariants.tap}
                  transition={getReducedMotionTransition(motionTransitions.fast)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={getReducedMotionTransition({ duration: 0.15 })}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}