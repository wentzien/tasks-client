import {useState, useEffect} from "react";
import {useParams, Link as RouterLink} from "react-router-dom";
import tasklistService from "../../services/tasklistService";
import taskService from "../../services/taskService";
import {Helmet} from "react-helmet-async";
import toast from "react-hot-toast";
import _ from "lodash";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TaskListCard from "../../components/tasklists/TaskListCard";
import TaskAdaptionCard from "../../components/tasklists/TaskAdaptionCard";
import TaskCreationCard from "../../components/tasklists/TaskCreationCard";
import TasklistEditDialog from "../../components/tasklists/TasklistEditDialog";
import TasklistShareDialog from "../../components/tasklists/TasklistShareDialog";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import inviteService from "../../services/inviteService";

const TasklistOverview = () => {
    const {tasklistId} = useParams();
    const [tasklist, setTasklist] = useState({title: "loading..."});
    const [taskToAdapt, setTaskToAdapt] = useState({});
    const [tasks, setTasks] = useState([]);
    const [toggleTaskAdaption, setToggleTaskAdaption] = useState(false);
    const [toggleTasklistEdit, setToggleTasklistEdit] = useState(false);
    const [toggleShare, setToggleShare] = useState(false);
    const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const [role, setRole] = useState();
    const [canEdit, setCanEdit] = useState(false);
    const [canMakeSettings, setCanMakeSettings] = useState(false);
    const [canShare, setCanShare] = useState(false);

    useEffect(async () => {
        try {
            const tasklist = await tasklistService.getById(tasklistId);
            setTasklist(tasklist);
            const tasks = await taskService.getAll(tasklistId);
            setTasks(tasks);
            setToggleTaskAdaption(false);
        } catch (ex) {
            console.error(ex);
        }
    }, [tasklistId]);

    useEffect(() => {
        if (tasklist.Collaborators) {
            setRole(tasklist.Collaborators[0].role);
        }
    }, [tasklist])

    useEffect(() => {
        setCanEdit(role === "Creator" || role === "Editor");
        setCanShare(role === "Creator" || role === "Editor");
        setCanMakeSettings(role === "Creator");
    }, [role]);

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
        task.title = values.title;
        task.description = values.description;
        task.notes = values.notes;
        await updateTask(task, {setStatus, setSubmitting});
    };

    const handleUpdateTasklist = async (values, {setStatus, setSubmitting}) => {
        const tasklistBackup = {...tasklist};
        try {
            const tasklistCache = {...tasklist};
            tasklistCache.title = values.title;
            tasklistCache.allowShareByLink = values.allowShareByLink;
            tasklistCache.shared = values.shared;

            setTasklist(tasklistCache);
            await tasklistService.update(tasklistId, _.pick(tasklistCache, ["title", "allowShareByLink", "shared"]));
        } catch (ex) {
            console.error(ex);
            toast.error("Unable to update tasklist.");
            if (ex.response && ex.response.status === 400) {
                setStatus(ex.response.data);
                setSubmitting(false);
            }
            setTasklist(tasklistBackup);
        }
    };

    const handleTasklistDelete = async () => {
        handleCloseTasklistEdit();
        try {
            await tasklistService.remove(tasklistId);
            toast.success("Tasklist has been deleted.");
        } catch (ex) {
            console.error(ex);
            toast.error("Unable to delete tasklist.");
        }
    };

    const handleInvite = async (values, {setStatus, setSubmitting}) => {
        try {
            await inviteService.inviteUser(tasklistId, values);
            handleCloseShare();
        } catch (ex) {
            console.error(ex);
            toast.error("Unable to invite user.");
            if (ex.response && ex.response.status === 400 || ex.response.status === 404) {
                console.log(ex.response.data);
                setStatus(ex.response.data);
                setSubmitting(false);
            }
        }
    }

    const handleDeleteTask = async (task) => {
        const tasksBackup = [...tasks];
        try {
            const tasksCache = [...tasks];
            const index = tasksCache.indexOf(task);
            tasksCache.splice(index, 1);
            setTasks(tasksCache);
            await taskService.remove(tasklistId, task.id);
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

    const updateTask = async (updatedTask, formik) => {

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
            if (formik && ex.response && ex.response.status === 400) {
                const {setStatus, setSubmitting} = formik;
                setStatus(ex.response.data);
                setSubmitting(false);
            }
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

    const handleOpenTasklistEdit = () => {
        setToggleTasklistEdit(true);
    };

    const handleCloseTasklistEdit = () => {
        setToggleTasklistEdit(false);
    };

    const handleOpenShare = () => {
        setToggleShare(true);
    };

    const handleCloseShare = () => {
        setToggleShare(false);
    };

    const taskCreationCard = <>
        <TaskCreationCard onSubmit={handleCreateTask}/>
    </>

    const taskListCard = <>
        <TaskListCard
            tasks={tasks}
            onDelete={handleDeleteTask}
            onMarkFinished={handleMarkFinished}
            onMarkImportant={handleMarkImportant}
            onClickTitle={handleOpenTaskAdaption}
            disabled={!canEdit}
        />
    </>;

    const taskAdaptionCard = <>
        <TaskAdaptionCard
            task={taskToAdapt}
            onSubmit={handleUpdateTask}
            onMarkImportant={handleMarkImportant}
            onDelete={handleDeleteTask}
            onClose={handleCloseTaskAdaption}
            disabled={!canEdit}
        />
    </>;

    const tasklistEditDialog = <>
        <TasklistEditDialog
            open={toggleTasklistEdit}
            onSubmit={handleUpdateTasklist}
            onDelete={handleTasklistDelete}
            handleClose={handleCloseTasklistEdit}
            tasklist={tasklist}
            disabled={!canMakeSettings}
        />
    </>;

    const tasklistShareDialog = <>
        <TasklistShareDialog
            open={toggleShare}
            onSubmit={handleInvite}
            handleClose={handleCloseShare}
        />
    </>;

    return (
        <>
            <Helmet>
                <title>
                    {role === "Reader" ? "Reading Mode | " : ""}
                    {role === "Editor" ? "Editor Mode | " : ""}
                    {role === "Creator" ? "Creator Mode | " : ""}
                    {tasklist.title} | Tasks App
                </title>
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
                    {tasklistEditDialog}
                    <Button
                        onClick={handleOpenTasklistEdit}
                        color="primary"
                        size="large"
                        startIcon={<EditRoundedIcon/>}
                        disabled={role !== "Creator" && role !== "Editor"}
                    >
                        Settings
                    </Button>
                    {tasklistShareDialog}
                    <Button
                        sx={{ml: 3}}
                        onClick={handleOpenShare}
                        color="primary"
                        size="large"
                        startIcon={<GroupAddRoundedIcon/>}
                        disabled={!tasklist.shared || !canShare}
                    >
                        Share
                    </Button>
                </Box>
                {
                    smUp ?
                        <Grid container spacing={1}>
                            <Grid item xs={toggleTaskAdaption ? 6 : 12}>
                                {canEdit && taskCreationCard}
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

