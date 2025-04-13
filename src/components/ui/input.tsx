import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder-gray-400 selection:text-primary-foreground border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        "focus:outline-none focus:border-primary selection:bg-primary-foreground selection:text-primary",
        className
      )}
      {...props}
    />
  );
}

export { Input };
