import * as yup from "yup";
import {Formik, Form} from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormikTextField from "../formik/FormikTextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormikSelect from "../formik/FormikSelect";

const validationSchema = yup.object({
    email: yup
        .string("Enter an collaborators email")
        .email("Enter a valid email")
        .required("Email is required"),
    role: yup
        .string("Select a role")
        .oneOf(["Editor", "Reader", "Creator"])
});

const TasklistShareDialog = ({onSubmit, open, handleClose}) => {
    const initialValues = {
        email: "",
        role: "Editor"
    };

    return (
        <>
            <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Share tasklist</DialogTitle>
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
                              dirty
                          }) => (
                            <Form>
                                <FormikTextField
                                    label="Collaborator email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <FormikSelect
                                    label="Role"
                                    name="role"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    items={[
                                        {name: "Editor", value: "Editor"},
                                        {name: "Reader", value: "Reader"},
                                        {name: "Creator", value: "Creator"},
                                    ]}
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
                                        disabled={isSubmitting || !isValid || !dirty}
                                        type="submit"
                                        // onClick={handleClose}
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

export default TasklistShareDialog;

