import * as yup from "yup";
import {Formik, Form, useField} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

const initialValues = {
    title: "",
};

const validationSchema = yup.object({
    title: yup
        .string("Enter your title")
        .required("Title is required"),
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

const TasklistForm = ({onSubmit}) => {
    return (
        <Formik
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
                        label="Title"
                        name="title"
                        type="text"
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
                    <Box
                        sx={{
                            alignItems: "center",
                            display: "flex"
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            color="primary"
                            disabled={isSubmitting || !isValid || !dirty}
                            sx={{ ml: 1 }}
                            type="submit"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default TasklistForm;

