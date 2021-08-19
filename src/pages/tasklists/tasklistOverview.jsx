import React, {useState, useEffect} from "react";
import TasklistList from "../../components/tasklists/TasklistList";
import tasklistService from "../../services/tasklistService";
const TasklistOverview = () => {
    const [tasklists, setTasklists] = useState([]);

    useEffect(async () => {
        const tasklists = await tasklistService.getAll();
        setTasklists(tasklists);
    });

    return (
        <React.Fragment>
            <TasklistList tasklists={tasklists}/>
        </React.Fragment>
    );
};

export default TasklistOverview;
