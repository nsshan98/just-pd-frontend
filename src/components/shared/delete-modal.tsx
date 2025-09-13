"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

const DeleteModal = ({ open, onClose, onConfirm, isLoading }: DeleteModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm rounded-2xl">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-3">
            <Trash2 className="w-20 h-20 p-3 rounded-full bg-red-400 text-red-200" />
          </div>
          <DialogTitle className="text-2xl font-semibold font-inter">
            Do You Want To Delete?
          </DialogTitle>
          <DialogDescription className="mt-1 text-gray-500 font-inter">
            Action cannot be undone!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-center gap-3 mt-4">
          <Button
            variant="outline"
            className="font-inter"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 font-bold font-inter"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
