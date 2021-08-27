import * as yup from "yup";
import {Formik, Form} from "formik";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import QuillEditor from "../general/QuillEditor";
import FormikTextField from "../formik/FormikTextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const validationSchema = yup.object({
    title: yup
        .string("Enter your title")
        .required("Title is required"),
    description: yup
        .string("Enter your description"),
    notes: yup
        .string("Enter your notes")
});

const TaskAdaptionForm = ({onSubmit, task, onClose, onDelete, onMarkImportant}) => {
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
                        <IconButton aria-label="close" onClick={() => onMarkImportant(task)}>
                            <StarRoundedIcon/>
                        </IconButton>
                        :
                        <IconButton aria-label="close" onClick={() => onMarkImportant(task)}>
                            <StarOutlineRoundedIcon/>
                        </IconButton>
                }
                <IconButton aria-label="delete" onClick={() => onDelete(task)}>
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
                        />
                        <QuillEditor
                            sx={{mt: 2, height: 400}}
                            placeholder="Notes"
                            value={values.notes}
                            onChange={v => setFieldValue("notes", v)}
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
                            disabled={isSubmitting || !isValid}
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
