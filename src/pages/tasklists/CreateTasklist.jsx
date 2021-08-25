import React, {useState} from "react";
import {Helmet} from "react-helmet-async";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TasklistForm from "../../components/tasklists/TasklistForm";
import tasklistService from "../../services/tasklistService";
import {Navigate} from "react-router-dom";

const CreateTasklist = () => {
    const [tasklistId, setTasklistId] = useState(null);

    const handleSubmit = async (values, {setStatus, setSubmitting, resetForm}) => {
        try {
            const newTasklist = await tasklistService.create(values);
            setTasklistId(newTasklist.id);
        } catch (ex) {
            console.error(ex);
            if (ex.response && ex.response.status === 400) {
                resetForm();
                setStatus(ex.response.data);
                setSubmitting(false);
            }
        }
    };

    return (
        <>
            {tasklistId && <Navigate to={"/tasklists/" + tasklistId}/>}
            <Helmet>
                <title>Create Tasklist | Tasks App</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    p: 3
                }}
            >
                <Typography variant="h1">
                    Create Tasklist
                </Typography>
                <Card sx={{mt: 4}}>
                    <CardContent sx={{pt: 0}}>
                        <TasklistForm
                            onSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
;

export default CreateTasklist;
