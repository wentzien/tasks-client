import {useState, useEffect} from "react";
import generalListService from "../../services/generallistsService";
import taskService from "../../services/taskService";
import {Helmet} from "react-helmet-async";
import toast from "react-hot-toast";
import _ from "lodash";
import useMediaQuery from "@mui/material/useMediaQuery";
import TaskListCard from "../../components/tasklists/TaskListCard";
import TaskAdaptionCard from "../../components/tasklists/TaskAdaptionCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const GeneralListOverview = ({type, title}) => {
    const [taskToAdapt, setTaskToAdapt] = useState({});
    const [tasks, setTasks] = useState([]);
    const [toggleTaskAdaption, setToggleTaskAdaption] = useState(false);
    const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    useEffect(async () => {
        try {
            switch (type) {
                case "myday":
                    setTasks(await generalListService.getMyDay());
                    break;
                case "important":
                    setTasks(await generalListService.important());
                    break;
                case "planned":
                    setTasks(await generalListService.planned());
                    break;
                case "all":
                    setTasks(await generalListService.all());
                    break;
                case "done":
                    setTasks(await generalListService.done());
                    break;
                case "assignedtome":
                    setTasks(await generalListService.assignedToMe());
                    break;
            }
            setToggleTaskAdaption(false);
        } catch (ex) {
            console.error(ex);
        }
    }, [type]);

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

    const handleDelete = async (task) => {
        const tasksBackup = [...tasks];
        try {
            const tasksCache = [...tasks];
            const index = tasksCache.indexOf(task);
            tasksCache.splice(index, 1);
            setTasks(tasksCache);
            await taskService.remove(task.TasklistId, task.id);
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
            const tasklistId = updatedTask.TasklistId;
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

    const taskListCard = <>
        <TaskListCard
            tasks={tasks}
            onDelete={handleDelete}
            onMarkFinished={handleMarkFinished}
            onMarkImportant={handleMarkImportant}
            onClickTitle={handleOpenTaskAdaption}
        />
    </>;

    const taskAdaptionCard = <>
        <TaskAdaptionCard
            task={taskToAdapt}
            onSubmit={handleUpdateTask}
            onMarkImportant={handleMarkImportant}
            onDelete={handleDelete}
            onClose={handleCloseTaskAdaption}
        />
    </>;

    return (
        <>
            <Helmet>
                <title>{title} | Tasks App</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    p: 3
                }}
            >
                <Typography variant="h1">
                    {title}
                </Typography>
                {
                    smUp ?
                        <Grid container spacing={1}>
                            <Grid item xs={toggleTaskAdaption ? 6 : 12}>
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
                                {taskListCard}
                            </>
                }

            </Box>
        </>
    );
};

export default GeneralListOverview;

