import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete, lists }) => {
  const list = lists.find((l) => l.Id === task.listId);
  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)" }}
      className={`bg-white rounded-xl shadow-card p-5 transition-all duration-200 ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggleComplete(task.Id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? "bg-gradient-to-br from-success to-green-600 border-success"
              : "border-gray-300 hover:border-primary hover:bg-primary/5"
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ApperIcon name="Check" size={16} className="text-white" />
            </motion.div>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className={`text-lg font-bold ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            <div className="flex items-center gap-2">
              <PriorityBadge priority={task.priority} />
            </div>
          </div>

          {task.description && (
            <p className="text-secondary text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm">
            {list && (
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: list.color }}
                />
                <span className="text-secondary font-medium">{list.name}</span>
              </div>
            )}

            <div
              className={`flex items-center gap-1.5 ${
                isOverdue ? "text-error font-semibold" : "text-secondary"
              }`}
            >
              <ApperIcon name="Calendar" size={16} />
              <span>{format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="rounded-lg"
          >
            <ApperIcon name="Edit2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.Id)}
            className="rounded-lg hover:bg-error/10 hover:text-error"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;