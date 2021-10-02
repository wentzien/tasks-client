import React from "react";
import * as yup from "yup";
import {Formik, Form, useField} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import useAuth from "../../hooks/useAuth";

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = yup.object({
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

const LoginForm = () => {
    const {login} = useAuth();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setStatus, setSubmitting, resetForm}) => {
                try {
                    await login(values);

                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        resetForm({
                            values: {
                                email: values.email,
                                password: ""
                            }
                        });
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
                        label="Email Address"
                        name="email"
                        type="email"
                        autoFocus
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
                            Log In
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>

        // <Formik
        //     initialValues={initialValues}
        //     validationSchema={validationSchema}
        //     onSubmit={(values, {setSubmitting}) => {
        //         alert(JSON.stringify(values, null, 2));
        //     }}
        // >
        //     {formik => (
        //         <form onSubmit={formik.handleSubmit}>
        //             <TextField
        //                 fullWidth
        //                 id="email"
        //                 label="Email"
        //                 error={formik.touched.email && Boolean(formik.errors.email)}
        //                 helperText={formik.touched.email && formik.errors.email}
        //                 {...formik.getFieldProps("email")}
        //             />
        //             <TextField
        //                 fullWidth
        //                 id="password"
        //                 label="Password"
        //                 type="password"
        //                 error={formik.touched.password && Boolean(formik.errors.password)}
        //                 helperText={formik.touched.password && formik.errors.password}
        //                 {...formik.getFieldProps("password")}
        //             />
        //             <Button color="primary" variant="contained" fullWidth type="submit">
        //                 Submit
        //             </Button>
        //         </form>
        //     )}
        // </Formik>
    );
};

export default LoginForm;
