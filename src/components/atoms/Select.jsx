import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className,
  children,
  error,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full px-4 py-2.5 rounded-lg border-2 bg-white text-gray-900",
        "transition-all duration-200 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
        error ? "border-error focus:border-error focus:ring-error/20" : "border-gray-200",
        "disabled:bg-gray-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;