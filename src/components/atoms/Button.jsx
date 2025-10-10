import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-primary",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500",
    ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-error",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-success",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;