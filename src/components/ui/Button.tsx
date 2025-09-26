import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-interactive-primary text-foreground-on-interactive hover:bg-interactive-primary-hover",
        secondary: "bg-interactive-secondary text-text-primary hover:bg-interactive-secondary-hover",
        danger: "bg-interactive-danger text-foreground-on-interactive hover:bg-interactive-danger-hover",
        outline:
          "border bg-surface-background shadow-sm hover:bg-surface-elevated text-text-primary border-interactive-secondary",
        ghost:
          "hover:bg-surface-elevated text-text-primary",
        link: "text-text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-element-gap py-element-gap text-sm",
        md: "px-container-padding py-element-gap",
        lg: "px-component-gap py-container-padding text-lg",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
