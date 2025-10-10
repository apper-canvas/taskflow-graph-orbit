import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  className,
  error,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full px-4 py-2.5 rounded-lg border-2 bg-white text-gray-900 placeholder:text-gray-400",
        "transition-all duration-200 resize-none",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
        error ? "border-error focus:border-error focus:ring-error/20" : "border-gray-200",
        "disabled:bg-gray-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;