import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ConfirmationAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationAlertDialog: React.FC<ConfirmationAlertDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 gap-4 py-2">
          <p className="text-sm text-neutral-600">
          {message}
          </p>
        </div>
        <AlertDialogFooter className="flex justify-end">
          <Button variant={"blue"} onClick={onConfirm}>
            Yes, do it.
          </Button>
          <Button variant={"destructive"} onClick={onClose}>
            No, cancel.
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationAlertDialog;
