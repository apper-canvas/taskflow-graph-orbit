import { cn } from "@/utils/cn";

const Badge = ({ children, variant = "default", className }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    high: "bg-gradient-to-r from-error to-red-600 text-white",
    medium: "bg-gradient-to-r from-accent to-orange-500 text-white",
    low: "bg-gradient-to-r from-primary to-blue-600 text-white",
    success: "bg-gradient-to-r from-success to-green-600 text-white",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;