"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motionVariants, motionTransitions, getReducedMotionTransition } from "@/lib/motion"

// MotionSheet Root - manages open/close state
interface MotionSheetContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MotionSheetContext = React.createContext<MotionSheetContextValue | null>(null)

const useMotionSheet = () => {
  const context = React.useContext(MotionSheetContext)
  if (!context) {
    throw new Error("useMotionSheet must be used within a MotionSheet")
  }
  return context
}

interface MotionSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const MotionSheet = ({ open = false, onOpenChange, children }: MotionSheetProps) => {
  return (
    <MotionSheetContext.Provider value={{ open, onOpenChange: onOpenChange ?? (() => {}) }}>
      {children}
    </MotionSheetContext.Provider>
  )
}

// MotionSheet Trigger
interface MotionSheetTriggerProps {
  asChild?: boolean
  children: React.ReactNode
  className?: string
}

const MotionSheetTrigger = React.forwardRef<
  HTMLButtonElement,
  MotionSheetTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ asChild = false, children, className, onClick, ...props }, ref) => {
  const { open, onOpenChange } = useMotionSheet()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpenChange(!open)
    onClick?.(event)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
        className?: string;
        ref?: React.Ref<HTMLButtonElement>;
      }>,
      {
        onClick: handleClick,
        className: cn(className, (children.props as { className?: string }).className),
        ref,
      }
    )
  }

  return (
    <button
      ref={ref}
      className={cn(
        "bg-transparent border-none cursor-pointer focus:outline-none",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
})
MotionSheetTrigger.displayName = "MotionSheetTrigger"

// MotionSheet Overlay
interface MotionSheetOverlayProps {
  className?: string
}

const MotionSheetOverlay = React.forwardRef<HTMLDivElement, MotionSheetOverlayProps>(
  ({ className }, ref) => {
    const { onOpenChange } = useMotionSheet()

    return (
      <motion.div
        ref={ref}
        className={cn("fixed inset-0 z-60 bg-black/20", className)}
        variants={motionVariants.backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={getReducedMotionTransition(motionTransitions.fast)}
        onClick={() => onOpenChange(false)}
      />
    )
  }
)
MotionSheetOverlay.displayName = "MotionSheetOverlay"

// MotionSheet Content variants
const motionSheetVariants = cva(
  "fixed z-65 bg-surface-card shadow-lg focus:outline-none",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b-border",
        bottom: "inset-x-0 bottom-0 border-t-border",
        left: "inset-y-0 left-0 w-full max-w-sm border-r-border",
        right: "inset-y-0 right-0 w-full max-w-sm border-l-border",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

// Custom variants for each side
const createSideVariants = (side: "top" | "bottom" | "left" | "right") => {
  switch (side) {
    case "top":
      return {
        closed: { y: "-100%", opacity: 0 },
        open: { y: 0, opacity: 1 },
      }
    case "bottom":
      return {
        closed: { y: "100%", opacity: 0 },
        open: { y: 0, opacity: 1 },
      }
    case "left":
      return {
        closed: { x: "-100%", opacity: 0 },
        open: { x: 0, opacity: 1 },
      }
    case "right":
      return {
        closed: { x: "100%", opacity: 0 },
        open: { x: 0, opacity: 1 },
      }
  }
}

interface MotionSheetContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof motionSheetVariants> {
  hideCloseButton?: boolean
  onEscapeKeyDown?: () => void
}

const MotionSheetContent = React.forwardRef<HTMLDivElement, MotionSheetContentProps>(
  ({ side = "right", className, children, hideCloseButton = false, onEscapeKeyDown, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      onDrag: _onDrag,
      onDragStart: _onDragStart,
      onDragEnd: _onDragEnd,
      onAnimationStart: _onAnimationStart,
      onAnimationEnd: _onAnimationEnd,
      ...safeProps
    } = props
    const { open, onOpenChange } = useMotionSheet()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onEscapeKeyDown?.()
          onOpenChange(false)
        }
      }

      if (open) {
        document.addEventListener("keydown", handleEscape)
        // Prevent body scroll when sheet is open
        document.body.style.overflow = "hidden"
      }

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = "unset"
      }
    }, [open, onEscapeKeyDown, onOpenChange])

    if (!mounted) return null

    const variants = createSideVariants(side ?? "right")

    return createPortal(
      <AnimatePresence mode="wait">
        {open && (
          <>
            <MotionSheetOverlay />
            <motion.div
              ref={ref}
              className={cn(motionSheetVariants({ side }), className)}
              variants={variants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={getReducedMotionTransition(motionTransitions.springSnappy)}
              {...safeProps}
            >
              {children}
              {!hideCloseButton && (
                <motion.button
                  className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:ring-offset-2"
                  onClick={() => onOpenChange(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </motion.button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
    )
  }
)
MotionSheetContent.displayName = "MotionSheetContent"

// MotionSheet Header
const MotionSheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-2 text-center sm:text-left p-6", className)}
    {...props}
  />
)
MotionSheetHeader.displayName = "MotionSheetHeader"

// MotionSheet Footer
const MotionSheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2 p-6",
      className
    )}
    {...props}
  />
)
MotionSheetFooter.displayName = "MotionSheetFooter"

// MotionSheet Title
const MotionSheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-text-primary", className)}
    {...props}
  />
))
MotionSheetTitle.displayName = "MotionSheetTitle"

// MotionSheet Description
const MotionSheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-muted", className)}
    {...props}
  />
))
MotionSheetDescription.displayName = "MotionSheetDescription"

export {
  MotionSheet,
  MotionSheetTrigger,
  MotionSheetOverlay,
  MotionSheetContent,
  MotionSheetHeader,
  MotionSheetFooter,
  MotionSheetTitle,
  MotionSheetDescription,
}