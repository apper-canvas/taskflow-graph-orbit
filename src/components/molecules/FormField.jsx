import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  required,
  as = "input",
  children,
  ...props 
}) => {
  const Component = as === "textarea" ? Textarea : as === "select" ? Select : Input;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <Component type={type} error={error} {...props}>
        {children}
      </Component>
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
};

export default FormField;