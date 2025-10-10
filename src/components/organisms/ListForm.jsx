import { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const PRESET_COLORS = [
  "#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", 
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1"
];

const ListForm = ({ list, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: list?.name || "",
    color: list?.color || PRESET_COLORS[0],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "List name is required";
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField
        label="List Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter list name"
        error={errors.name}
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900">
          Color <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-5 gap-3">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData({ ...formData, color })}
              className={`w-full aspect-square rounded-lg transition-all ${
                formData.color === color
                  ? "ring-4 ring-offset-2 ring-primary scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          <ApperIcon name="Check" size={18} />
          {list ? "Update List" : "Create List"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ListForm;