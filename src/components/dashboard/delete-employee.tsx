"use client";
import { useDeleteEmployee } from "@/hooks/reactQuery/employeeQuery";
import { toast } from "sonner";
import DeleteModal from "../shared/delete-modal";

type DeleteEmployeeProps = {
  open: boolean;
  onClose: () => void;
  employeeId: string;
};

const DeleteEmployeeDialog = ({
  employeeId,
  onClose,
  open,
}: DeleteEmployeeProps) => {
  const { employeeDeleteMutation } = useDeleteEmployee();

  const handleDeleteEmployee = () => {
    employeeDeleteMutation.mutate(employeeId, {
      onSuccess: () => {
        toast("Employee Deleted Successfully");
        onClose();
      },
      onError: () => {
        toast.error("Something Went Wrong");
      },
    });
  };
  return (
    <DeleteModal
      open={open}
      onClose={onClose}
      onConfirm={handleDeleteEmployee}
    />
  );
};

export default DeleteEmployeeDialog;