import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ title, description, actionLabel, onAction, icon = "CheckCircle2" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent mb-6 backdrop-blur-sm"
        >
          <ApperIcon name={icon} size={48} className="text-primary" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {title || "No tasks yet"}
        </h3>
        <p className="text-secondary mb-8 leading-relaxed">
          {description || "Get started by creating your first task and stay organized!"}
        </p>
        {onAction && (
          <Button onClick={onAction} variant="primary" size="lg">
            <ApperIcon name="Plus" size={20} />
            {actionLabel || "Create Task"}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;