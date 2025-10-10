import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Confirm", variant = "danger" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            variant === "danger" ? "bg-error/10" : "bg-primary/10"
          }`}>
            <ApperIcon 
              name={variant === "danger" ? "AlertTriangle" : "AlertCircle"} 
              size={24} 
              className={variant === "danger" ? "text-error" : "text-primary"}
            />
          </div>
          <p className="text-gray-700 leading-relaxed pt-2">{message}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={variant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;