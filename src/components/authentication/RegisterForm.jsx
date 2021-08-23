import React from "react";
import * as yup from "yup";
import {Formik, Form, useField} from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import useAuth from "../../hooks/useAuth";

const initialValues = {
    name: "",
    email: "",
    password: "",
};

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

const FormikTextField = ({...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <TextField
                {...field}
                {...props}
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
            />
        </>
    );
}

const RegisterForm = () => {
    const {register} = useAuth();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setStatus, setSubmitting}) => {
                try {
                    await register(values);

                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        setStatus(ex.response.data);
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({
                  status,
                  isSubmitting,
                  isValid,
                  dirty
              }) => (
                <Form>
                    <FormikTextField
                        label="Name"
                        name="name"
                        type="text"
                        autoFocus
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <FormikTextField
                        label="Email Address"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <FormikTextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    {status && (
                        <Box sx={{mt: 3}}>
                            <FormHelperText error>
                                {status}
                            </FormHelperText>
                        </Box>
                    )}
                    <Box sx={{mt: 2}}>
                        <Button
                            color="primary"
                            disabled={isSubmitting || !isValid || !dirty}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Register
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
