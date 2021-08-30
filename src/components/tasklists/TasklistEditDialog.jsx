import * as yup from "yup";
import {Formik, Form} from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import QuillEditor from "../general/QuillEditor";
import FormikTextField from "../formik/FormikTextField";
import FormikSwitch from "../formik/FormikSwitch";
import FormHelperText from "@material-ui/core/FormHelperText";

const validationSchema = yup.object({
    title: yup
        .string("Enter your title")
        .required("Title is required"),
    allowShareByLink: yup
        .boolean("Adjust online accessibility")
        .required("Online accessibility is required")
});

const TasklistEditDialog = ({onSubmit, tasklist, onDelete, open, handleOpen, handleClose}) => {
    const initialValues = {
        title: tasklist.title,
        allowShareByLink: tasklist.allowShareByLink
    };

    return (
        <>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit tasklist</DialogTitle>
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
                          }) => (
                            <Form>
                                <FormikTextField
                                    label="Title"
                                    name="title"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <FormikSwitch
                                    label="Allow Sharing"
                                    description="Enabling this will allow you to share the list online via a
                                    link."
                                    name="allowShareByLink"
                                    color="primary"
                                    edge="start"
                                />
                                {status && (
                                    <Box sx={{mt: 3}}>
                                        <FormHelperText error>
                                            {status}
                                        </FormHelperText>
                                    </Box>
                                )}
                                <DialogActions>
                                    <Button
                                        onClick={handleClose}
                                        color="primary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={isSubmitting || !isValid}
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

