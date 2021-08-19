import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import taskService from "../../../services/taskService";
import TaskList from "../../../components/tasklists/TaskList";

const TaskOverview = ({location}) => {
    const {tasklistId} = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        const tasks = await taskService.getAll(tasklistId);
        setTasks(tasks);
    }, []);

    return (
        <React.Fragment>
            <TaskList tasks={tasks}/>
        </React.Fragment>
    );
};

export default TaskOverview;
