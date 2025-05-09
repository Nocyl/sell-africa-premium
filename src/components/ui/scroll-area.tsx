
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    orientation?: "vertical" | "horizontal" | "both";
    hideScrollbar?: boolean;
  }
>(({ className, children, orientation = "vertical", hideScrollbar = false, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    {!hideScrollbar && (orientation === "vertical" || orientation === "both") && (
      <ScrollBar orientation="vertical" />
    )}
    {!hideScrollbar && (orientation === "horizontal" || orientation === "both") && (
      <ScrollBar orientation="horizontal" />
    )}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px] hover:w-3.5 transition-all duration-150",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px] hover:h-3.5 transition-all duration-150",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb 
      className={cn(
        "relative flex-1 rounded-full bg-border",
        "hover:bg-primary/30 transition-colors duration-150 active:bg-primary/40",
        "touch-action-manipulation" // Améliore la manipulation tactile
      )} 
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
