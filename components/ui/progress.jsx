import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils"; // make sure this exists or replace with clsx

const Progress = React.forwardRef(
  ({ className, value, barClassName, ...props }, ref) => {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-3 w-full overflow-hidden rounded-full bg-muted", // padding/height here
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full transition-transform duration-500 ease-in-out",
            barClassName
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = "Progress";
export { Progress };
