import React, {useState, useEffect} from "react";

const TasklistItem = ({tasklist}) => {
    return (
        <div className="card">
            <div className="card-body">
                <a href={"/tasklists/" + tasklist.id}>{tasklist.name}</a>
            </div>
        </div>
    );
};

export default TasklistItem;
