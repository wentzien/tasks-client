import * as yup from "yup";
import {Formik, Form, useField} from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const initialValues = {
    description: "",
};

const validationSchema = yup.object({
    description: yup
        .string("Enter your task description")
        .required("Task description is required"),
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

const TaskForm = ({onSubmit}) => {
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
                        label="Task description"
                        name="description"
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

export default TaskForm;
