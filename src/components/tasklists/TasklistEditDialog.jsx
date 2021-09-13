import * as yup from "yup";
import {Formik, Form} from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormikTextField from "../formik/FormikTextField";
import FormikSwitch from "../formik/FormikSwitch";
import FormHelperText from "@material-ui/core/FormHelperText"
import ConfirmationDialog from "../../pages/tasklists/ConfirmationDialog";
import {useState} from "react";

const validationSchema = yup.object({
    title: yup
        .string("Enter your title")
        .required("Title is required"),
    allowShareByLink: yup
        .boolean("Adjust online accessibility")
        .required("Online accessibility is required")
});

const TasklistEditDialog = ({onSubmit, tasklist, onDelete, open, handleClose, disabled}) => {
    const [toggleConfirmation, setToggleConfirmation] = useState(false);

    const initialValues = {
        title: tasklist.title,
        allowShareByLink: tasklist.allowShareByLink,
        shared: tasklist.shared
    };

    const handleOpenConfirmation = () => {
        setToggleConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setToggleConfirmation(false);
    }

    return (
        <>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                              status,
                              isSubmitting,
                              isValid,
                              values
                          }) => (
                            <Form>
                                <FormikTextField
                                    label="Title"
                                    name="title"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    disabled={disabled}
                                />
                                <FormikSwitch
                                    label="Sharing"
                                    description="Enable Share options. Cannot be reversed."
                                    name="shared"
                                    color="primary"
                                    edge="start"
                                    disabled={disabled || tasklist.shared}
                                />
                                <FormikSwitch
                                    label="Link Sharing"
                                    description="Enabling this will allow you to share the list online via a
                                    link."
                                    name="allowShareByLink"
                                    color="primary"
                                    edge="start"
                                    disabled={disabled || !values.shared}
                                />
                                {status && (
                                    <Box sx={{mt: 3}}>
                                        <FormHelperText error>
                                            {status}
                                        </FormHelperText>
                                    </Box>
                                )}
                                <DialogActions>
                                    <ConfirmationDialog
                                        open={toggleConfirmation}
                                        onConfirmation={onDelete}
                                        handleClose={handleCloseConfirmation}
                                    />
                                    <Button
                                        onClick={handleOpenConfirmation}
                                        color="secondary"
                                        disabled={disabled}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={handleClose}
                                        color="primary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={disabled || isSubmitting || !isValid}
                                        type="submit"
                                        onClick={handleClose}
                                        color="primary"
                                    >
                                        Save
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TasklistEditDialog;

