import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const ConfirmationDialog = ({onConfirmation, open, handleClose}) => {
    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Confirm action</DialogTitle>
            <DialogContent>
                Are you really sure you are doing this action?
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={()=>{
                        handleClose();
                        onConfirmation();
                    }}
                    color="secondary"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;