import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  projectId: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  toggleFavouritesUpdated: () => void;
}

export const DeleteConfirmationDialog: React.FC<
  DeleteConfirmationDialogProps
> = ({ open, projectId, onConfirm, onCancel, toggleFavouritesUpdated }) => {
  const handleConfirm = () => {
    onConfirm();
    toggleFavouritesUpdated();
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-confirmation-dialog"
    >
      <DialogTitle id="delete-confirmation-dialog">
        Delete Project: {projectId}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this project?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          No
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
