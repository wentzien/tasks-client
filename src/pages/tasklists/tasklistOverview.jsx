import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import taskService from "../../services/taskService";
import TaskList from "../../components/tasklists/TaskList";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Helmet} from "react-helmet-async";
import Typography from "@material-ui/core/Typography";
import tasklistService from "../../services/tasklistService";
import TaskForm from "../../components/tasklists/TaskForm";

const TasklistOverview = () => {
    const {tasklistId} = useParams();
    const [tasklist, setTasklist] = useState({
        title: "My Tasklist"
    });
    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        try {
            const tasklist = await tasklistService.getById(tasklistId);
            console.log(tasklist);
            setTasklist(tasklist)
            const tasks = await taskService.getAll(tasklistId);
            console.log(tasks)
            setTasks(tasks);

        } catch (ex) {
            console.error(ex);
        }


    }, [tasklistId]);

    const handleSubmit = async (values, {setStatus, setSubmitting}) => {
        console.log(values);
        try {
            await taskService.create(tasklistId, values);

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                setStatus(ex.response.data);
                setSubmitting(false);
            }
        }
    };

    const handleDelete = (taskId) => {
        console.log("delete", taskId);
    };

    const handleMarkFinished = (taskId) => {
        console.log("markFinished", taskId);
    };

    const handleMarkImportant = (task) => {
        console.log("markImportant", task);
    };

    return (
        <>
            <Helmet>
                <title>{tasklist.title} | Tasks App</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    p: 3
                }}
            >
                <Typography variant="h1">
                    {tasklist.title}
                </Typography>
                <Card sx={{mt: 4}}>
                    <CardContent sx={{pt: 0}}>
                        <TaskForm
                            onSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
                <TaskList
                    tasks={tasks}
                    onDelete={handleDelete}
                    onMarkFinished={handleMarkFinished}
                    onMarkImportant={handleMarkImportant}
                />
            </Box>
        </>
    );
};

export default TasklistOverview;

