import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };

interface Props {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  triggerStyles?: string;
  openDelay?: number;
  closeDelay?: number;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export default function HOVER({
  children,
  trigger = "Hover me",
  openDelay = 10,
  closeDelay = 1,
  onOpenChange,
  triggerStyles,
  className,
}: Props) {
  return (
    <HoverCard
      openDelay={openDelay}
      closeDelay={closeDelay}
      onOpenChange={onOpenChange}
    >
      <HoverCardTrigger className={cn(triggerStyles)}>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent className={cn("rounded-none p-1 w-fit", className)}>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
