import * as yup from "yup";
import {Formik, Form} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormikTextField from "../formik/FormikTextField";
import FormikSwitch from "../formik/FormikSwitch";
import FormHelperText from "@mui/material/FormHelperText"

const validationSchema = yup.object({
    name: yup
        .string("Enter your name")
        .required("Name is required"),
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(5, "Password should be of minimum 5 characters length")
        .required("Password is required"),
});

const TasklistEditDialog = ({onSubmit, user, open, handleClose}) => {

    const initialValues = {
        name: user.name,
        email: user.email,
        password: "",
        theme: user.theme
    };

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
                                    label="Name"
                                    name="name"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <FormikTextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <FormikTextField
                                    label="New password"
                                    name="password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <FormikSwitch
                                    label="Theme"
                                    description="Switch between light and dark theme."
                                    name="theme"
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

