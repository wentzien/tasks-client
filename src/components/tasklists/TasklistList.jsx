import React, {useState, useEffect} from "react";
import TasklistItem from "./TasklistItem";

const TasklistList = ({tasklists}) => {

    return (
        <React.Fragment>
            {
                tasklists.map(tasklist =>
                    <TasklistItem tasklist={tasklist}/>
                )
            }
        </React.Fragment>
    );
};

export default TasklistList;
