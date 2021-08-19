import React, {useState, useEffect} from "react";
import TasklistList from "../../components/tasklists/TasklistList";
import tasklistService from "../../services/tasklistService";

const TasklistView = () => {
    const [tasklists, setTasklists] = useState([]);

    useEffect(async () => {
        const tasklists = await tasklistService.getAll();
        setTasklists(tasklists);
    }, []);

    return (
        <div>
            <TasklistList tasklists={tasklists}/>
        </div>
    );
};

export default TasklistView;
