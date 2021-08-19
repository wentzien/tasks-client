import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({tasks}) => {
    return (
        <React.Fragment>
            {
                tasks.map(task =>
                    <TaskItem task={task}/>
                )
            }
        </React.Fragment>
    );
};

export default TaskList;
