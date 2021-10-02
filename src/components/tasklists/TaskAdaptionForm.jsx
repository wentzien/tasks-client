import * as yup from "yup";
import {Formik, Form} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import QuillEditor from "../general/QuillEditor";
import FormikTextField from "../formik/FormikTextField";
import FormHelperText from "@mui/material/FormHelperText";

const validationSchema = yup.object({
    title: yup
        .string("Enter your title")
        .required("Title is required"),
    description: yup
        .string("Enter your description"),
    notes: yup
        .string("Enter your notes")
});

const TaskAdaptionForm = ({onSubmit, task, onClose, onDelete, onMarkImportant, disabled}) => {
    const initialValues = {
        title: task.title || "",
        description: task.description || "",
        notes: task.notes || ""
    };

    return (
        <>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <IconButton aria-label="close" onClick={onClose}>
                    <ChevronLeftRoundedIcon/>
                </IconButton>
                {
                    task.important ?
                        <IconButton aria-label="close" onClick={() => onMarkImportant(task)} disabled={disabled}>
                            <StarRoundedIcon/>
                        </IconButton>
                        :
                        <IconButton aria-label="close" onClick={() => onMarkImportant(task)} disabled={disabled}>
                            <StarOutlineRoundedIcon/>
                        </IconButton>
                }
                <IconButton aria-label="delete" onClick={() => onDelete(task)}  disabled={disabled}>
                    <DeleteOutlineRoundedIcon/>
                </IconButton>
            </Box>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, {setStatus, setSubmitting}) => onSubmit(task, values, {
                    setStatus,
                    setSubmitting
                })}
            >
                {({
                      status,
                      values,
                      setFieldValue,
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
                            disabled={disabled}
                        />
                        <FormikTextField
                            sx={{mt: 2}}
                            label="Description"
                            name="description"
                            type="text"
                            fullWidth
                            multiline
                            rows={6}
                            margin="normal"
                            variant="outlined"
                            disabled={disabled}
                        />
                        <QuillEditor
                            sx={{mt: 2, height: 400}}
                            placeholder="Notes"
                            value={values.notes}
                            onChange={v => setFieldValue("notes", v)}
                            readOnly={disabled}
                        />
                        {status && (
                            <Box sx={{mt: 3}}>
                                <FormHelperText error>
                                    {status}
                                </FormHelperText>
                            </Box>
                        )}
                        <Button
                            sx={{mt: 2}}
                            fullWidth
                            color="primary"
                            disabled={isSubmitting || !isValid || disabled}
                            type="submit"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default TaskAdaptionForm;
