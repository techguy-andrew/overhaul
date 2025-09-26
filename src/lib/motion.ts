// src/lib/motion.ts - Motion utility functions and constants

import { Transition, Variants } from "framer-motion"

/**
 * Motion Constants - Semantic animation values
 * These map to our CSS custom properties in tokens.css
 */
export const MOTION = {
  // Durations (in seconds for Framer Motion)
  duration: {
    instant: 0,
    fast: 0.15,
    normal: 0.25,
    slow: 0.35,
    slower: 0.5,
  },

  // Easing curves - enterprise-grade
  easing: {
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    spring: [0.175, 0.885, 0.32, 1.275],
    enterprise: [0.25, 0.46, 0.45, 0.94],
  } as const,

  // Spring physics presets
  spring: {
    gentle: { type: "spring" as const, stiffness: 300, damping: 30 },
    medium: { type: "spring" as const, stiffness: 400, damping: 25 },
    snappy: { type: "spring" as const, stiffness: 500, damping: 20 },
    bouncy: { type: "spring" as const, stiffness: 600, damping: 15 },
  },

  // Distance values for slides/movements
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    sidebar: 300,
  },
} as const

/**
 * Common animation variants for consistent motion across components
 */
export const motionVariants = {
  // Fade animations
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  // Slide animations
  slideUp: {
    hidden: { y: MOTION.distance.lg, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  slideDown: {
    hidden: { y: -MOTION.distance.lg, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  slideLeft: {
    hidden: { x: MOTION.distance.lg, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  slideRight: {
    hidden: { x: -MOTION.distance.lg, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },

  // Scale animations
  scale: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  scaleUp: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },

  // Sidebar specific animations
  sidebar: {
    closed: { x: -MOTION.distance.sidebar, opacity: 0 },
    open: { x: 0, opacity: 1 },
  },

  // Backdrop/overlay animations
  backdrop: {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(4px)" },
  },
} as const satisfies Record<string, Variants>

/**
 * Common transition presets
 */
export const motionTransitions = {
  // Quick interactions
  fast: {
    duration: MOTION.duration.fast,
    ease: MOTION.easing.smooth,
  },

  // Standard interactions
  normal: {
    duration: MOTION.duration.normal,
    ease: MOTION.easing.enterprise,
  },

  // Slow, deliberate animations
  slow: {
    duration: MOTION.duration.slow,
    ease: MOTION.easing.smooth,
  },

  // Spring physics for organic feel
  spring: MOTION.spring.medium,
  springGentle: MOTION.spring.gentle,
  springSnappy: MOTION.spring.snappy,
  springBouncy: MOTION.spring.bouncy,

  // Layout animations
  layout: {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
  },
} as const satisfies Record<string, Transition>

/**
 * Reduced motion preferences
 */
export const getReducedMotionTransition = (transition: Transition): Transition => {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return {
      duration: 0.01, // Almost instant but not 0 to avoid layout issues
      ease: "linear",
    }
  }
  return transition
}

/**
 * Create staggered animations for lists
 */
export const createStagger = (delayPer: number = 0.1) => ({
  visible: {
    transition: {
      staggerChildren: delayPer,
    },
  },
})

/**
 * Common hover/tap animations for interactive elements
 */
export const interactionVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

/**
 * Utility for creating theme-aware motion configs
 * Respects user's motion preferences and client themes
 */
export const createMotionConfig = (
  variants: Variants,
  transition: Transition = motionTransitions.normal
) => ({
  variants,
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  transition: getReducedMotionTransition(transition),
})