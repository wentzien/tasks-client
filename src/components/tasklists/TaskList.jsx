import List from "@mui/material/List";
import TaskItem from "./TaskItem";
import {useEffect, useState} from "react";

const TaskList = ({tasks, onDelete, onMarkFinished, onMarkImportant, onClickTitle, disabled}) => {
    const [sortedTasks, setSortedTasks] = useState([]);
    let taskCounter = 0;

    const renderDivider = () => {
        taskCounter++;
        return taskCounter !== tasks.length;
    }

    useEffect(() => {
        tasks.sort((a, b) => a.done - b.done || Date.parse(b.createdAt) - Date.parse(a.createdAt));
        setSortedTasks(tasks);
    }, [tasks]);

    return (
        <List>
            {
                sortedTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onMarkFinished={onMarkFinished}
                        onMarkImportant={onMarkImportant}
                        onClickTitle={onClickTitle}
                        divider={renderDivider()}
                        disabled={disabled}
                    />
                ))
            }
        </List>
    );
};

export default TaskList;
