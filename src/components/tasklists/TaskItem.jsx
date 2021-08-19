import React, {useState, useEffect} from "react";

const TaskItem = ({task}) => {
    return (
        <div className="card">
            <div className="card-body">
                {task.description}
            </div>
        </div>
    );
};

export default TaskItem;
