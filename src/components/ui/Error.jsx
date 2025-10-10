import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center max-w-md mx-auto px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-error/20 to-error/10 mb-6">
          <ApperIcon name="AlertCircle" size={32} className="text-error" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-secondary mb-8 leading-relaxed">
          {message || "We encountered an error loading your tasks. Please try again."}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            <ApperIcon name="RefreshCw" size={18} />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;