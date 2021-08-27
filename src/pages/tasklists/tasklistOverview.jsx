import {useState, useEffect} from "react";
import {useParams, Link as RouterLink} from "react-router-dom";
import taskService from "../../services/taskService";
import TaskList from "../../components/tasklists/TaskList";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import {Helmet} from "react-helmet-async";
import tasklistService from "../../services/tasklistService";
import TaskCreationForm from "../../components/tasklists/TaskCreationForm";
import _ from "lodash";
import toast from "react-hot-toast";
import TaskAdaptionForm from "../../components/tasklists/TaskAdaptionForm";

const TasklistOverview = () => {
    const {tasklistId} = useParams();
    const [tasklist, setTasklist] = useState({title: "loading..."});
    const [taskToAdapt, setTaskToAdapt] = useState({});
    const [tasks, setTasks] = useState([]);
    const [toggleTaskAdaption, setToggleTaskAdaption] = useState(false);

    useEffect(async () => {
        try {
            const tasklist = await tasklistService.getById(tasklistId);
            setTasklist(tasklist)
            const tasks = await taskService.getAll(tasklistId);
            setTasks(tasks);
        } catch (ex) {
            console.error(ex);
        }


    }, [tasklistId]);

    const handleCreateTask = async (values, {setStatus, setSubmitting, resetForm}) => {
        const tasksBackup = [...tasks];
        try {
            let tasksCache = [...tasks]
            const notConfirmedTaskId = "newNotYetConfirmedTask" // should be unique
            const newTask = {
                id: notConfirmedTaskId,
                description: values.description
            };
            tasksCache.push(newTask);
            setTasks(tasksCache);

            const confirmedTask = await taskService.create(tasklistId, values);
            tasksCache = tasks.filter(task => task.id !== notConfirmedTaskId);
            tasksCache.push(confirmedTask);
            setTasks(tasksCache);
        } catch (ex) {
            console.error(ex);
            toast.error("Unable to create new task.");
            if (ex.response && ex.response.status === 400) {
                setStatus(ex.response.data);
                setSubmitting(false);
            }
            setTasks(tasksBackup);
        }
        resetForm();
    };

    const handleUpdateTask = async (task, values, {setStatus, setSubmitting}) => {
        try {
            task.title = values.title;
            task.description = values.description;
            task.notes = values.notes;
            await updateTask(task);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                setStatus(ex.response.data);
                setSubmitting(false);
            }
        }
    };

    const handleDelete = async (taskId) => {
        const tasksBackup = [...tasks];
        try {
            const tasksCache = tasks.filter(task => task.id !== taskId);
            setTasks(tasksCache);
            await taskService.remove(tasklistId, taskId);
            setToggleTaskAdaption(false);
        } catch (ex) {
            console.error(ex);
            toast.error("Unable to delete task.");
            setTasks(tasksBackup);
        }
    };

    const handleMarkFinished = async (task) => {
        task.done = !task.done;
        await updateTask(task);
    };

    const handleMarkImportant = async (task) => {
        task.important = !task.important;
        await updateTask(task);
    };

    const updateTask = async (updatedTask) => {
        const tasksBackup = [...tasks];
        try {
            const tasksCache = [...tasks];
            const index = tasksCache.indexOf(updatedTask);
            tasksCache[index] = updatedTask;

            setTasks(tasksCache);
            const taskId = updatedTask.id;
            updatedTask = _.pick(updatedTask, ["title", "done", "important", "description", "notes"]);
            await taskService.update(tasklistId, taskId, updatedTask);
        } catch (ex) {
            console.error(ex);
            toast.error("Unable to update task.");
            setTasks(tasksBackup);
        }
    };

    const handleOpenTaskAdaption = (task) => {
        setTaskToAdapt(task);
        setToggleTaskAdaption(true);
    };

    const handleCloseTaskAdaption = () => {
        setToggleTaskAdaption(false);
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
                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button
                        color="primary"
                        size="large"
                        startIcon={<EditRoundedIcon/>}
                    >
                        Edit
                    </Button>
                    <Button
                        sx={{ml: 3}}
                        component={RouterLink}
                        to=""
                        color="primary"
                        size="large"
                        startIcon={<GroupAddRoundedIcon/>}
                    >
                        Share
                    </Button>
                </Box>

                <Grid container spacing={1}>
                    <Grid item xs={toggleTaskAdaption ? 6 : 12}>
                        <Card>
                            <CardContent sx={{pt: 1}}>
                                <TaskCreationForm
                                    onSubmit={handleCreateTask}
                                />
                            </CardContent>
                        </Card>
                        <TaskList
                            tasks={tasks}
                            onDelete={handleDelete}
                            onMarkFinished={handleMarkFinished}
                            onMarkImportant={handleMarkImportant}
                            onClickTitle={handleOpenTaskAdaption}
                        />
                    </Grid>
                    {
                        toggleTaskAdaption &&
                        <Grid item xs={6}>
                            <Card>
                                <CardContent sx={{pt: 1}}>
                                    <TaskAdaptionForm
                                        task={taskToAdapt}
                                        onSubmit={handleUpdateTask}
                                        onMarkImportant={handleMarkImportant}
                                        onDelete={handleDelete}
                                        onClose={handleCloseTaskAdaption}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    }
                </Grid>


            </Box>
        </>
    );
};

export default TasklistOverview;

