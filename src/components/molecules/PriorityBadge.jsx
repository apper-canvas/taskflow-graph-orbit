import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority }) => {
  const config = {
    high: { label: "High", variant: "high", icon: "AlertCircle" },
    medium: { label: "Medium", variant: "medium", icon: "AlertTriangle" },
    low: { label: "Low", variant: "low", icon: "Info" },
  };

  const { label, variant, icon } = config[priority] || config.low;

  return (
    <Badge variant={variant}>
      <ApperIcon name={icon} size={12} />
      {label}
    </Badge>
  );
};

export default PriorityBadge;