import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ task, lists, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate || new Date().toISOString().split("T")[0],
    priority: task?.priority || "medium",
    listId: task?.listId || (lists[0]?.Id || 1),
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField
        label="Task Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Enter task title"
        error={errors.title}
        required
      />

      <FormField
        label="Description"
        as="textarea"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Add task description (optional)"
        rows={4}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          error={errors.dueDate}
          required
        />

        <FormField
          label="Priority"
          as="select"
          value={formData.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          required
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </FormField>
      </div>

      <FormField
        label="List"
        as="select"
        value={formData.listId}
        onChange={(e) => handleChange("listId", parseInt(e.target.value))}
        required
      >
        {lists.map((list) => (
          <option key={list.Id} value={list.Id}>
            {list.name}
          </option>
        ))}
      </FormField>

      <div className="flex items-center gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          <ApperIcon name="Check" size={18} />
          {task ? "Update Task" : "Create Task"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;