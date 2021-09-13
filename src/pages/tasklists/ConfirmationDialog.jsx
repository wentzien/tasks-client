import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

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