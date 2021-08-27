import * as yup from "yup";
import {Formik, Form} from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormikTextField from "../formik/FormikTextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const initialValues = {
    title: "",
};

const validationSchema = yup.object({
    title: yup
        .string("Enter your task title")
        .required("Task title is required"),
});

const TaskCreationForm = ({onSubmit}) => {
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
                        label="New task"
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
                        <Button
                            fullWidth
                            color="primary"
                            disabled={isSubmitting || !isValid || !dirty}
                            // sx={{ ml: 1 }}
                            type="submit"
                            variant="contained"
                        >
                            Save
                        </Button>
                </Form>
            )}
        </Formik>
    );
};

export default TaskCreationForm;
