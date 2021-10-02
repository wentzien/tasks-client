import * as yup from "yup";
import {Formik, Form} from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormikTextField from "../formik/FormikTextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormikSelect from "../formik/FormikSelect";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserTimes, faUser} from "@fortawesome/free-solid-svg-icons";

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

                    <List>
                        <ListItem
                            secondaryAction={
                                <>
                                    <IconButton edge="end" aria-label="remove">
                                        <FontAwesomeIcon icon={faUserTimes} size="xs"/>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <FontAwesomeIcon icon={faUser}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Dennis Wentzien"
                                secondary="dennis@wentzien.xyz"
                            />
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TasklistShareDialog;

