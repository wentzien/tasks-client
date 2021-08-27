import {useState, useEffect} from "react";
import {useParams, Link as RouterLink} from "react-router-dom";
import tasklistService from "../../services/tasklistService";
import taskService from "../../services/taskService";
import {Helmet} from "react-helmet-async";
import toast from "react-hot-toast";
import _ from "lodash";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TaskList from "../../components/tasklists/TaskList";
import TaskCreationForm from "../../components/tasklists/TaskCreationForm";
import TaskAdaptionForm from "../../components/tasklists/TaskAdaptionForm";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";

const TasklistOverview = () => {
    const {tasklistId} = useParams();
    const [tasklist, setTasklist] = useState({title: "loading..."});
    const [taskToAdapt, setTaskToAdapt] = useState({});
    const [tasks, setTasks] = useState([]);
    const [toggleTaskAdaption, setToggleTaskAdaption] = useState(false);
    const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    useEffect(async () => {
        try {
            const tasklist = await tasklistService.getById(tasklistId);
            setTasklist(tasklist)
            const tasks = await taskService.getAll(tasklistId);
            setTasks(tasks);
            setToggleTaskAdaption(false);
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

    const taskCreationCard = <>
        <Card>
            <CardContent sx={{pt: 1}}>
                <TaskCreationForm
                    onSubmit={handleCreateTask}
                />
            </CardContent>
        </Card>
    </>;

    const taskListCard = <>
        <Card sx={{mt: 2}}>
            <CardContent sx={{pt: 0}}>
                <TaskList
                    tasks={tasks}
                    onDelete={handleDelete}
                    onMarkFinished={handleMarkFinished}
                    onMarkImportant={handleMarkImportant}
                    onClickTitle={handleOpenTaskAdaption}
                />
            </CardContent>
        </Card>
    </>;

    const taskAdaptionCard = <>
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
    </>;

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
                {
                    smUp ?
                        <Grid container spacing={1}>
                            <Grid item xs={toggleTaskAdaption ? 6 : 12}>
                                {taskCreationCard}
                                {taskListCard}
                            </Grid>
                            {
                                toggleTaskAdaption &&
                                <Grid item xs={6}>
                                    {taskAdaptionCard}
                                </Grid>
                            }
                        </Grid>
                        :
                        toggleTaskAdaption ?
                            <>
                                {taskAdaptionCard}
                            </>
                            :
                            <>
                                {taskCreationCard}
                                {taskListCard}
                            </>
                }

            </Box>
        </>
    );
};

export default TasklistOverview;

