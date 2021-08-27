import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import TaskItem from "./TaskItem";
import {useEffect, useState} from "react";

const TaskList = ({tasks, onDelete, onMarkFinished, onMarkImportant, onClickTitle}) => {
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
        <Card sx={{mt: 4}}>
            {/*<CardHeader title={"My Tasklist"}/>*/}
            {/*<Divider/>*/}
            <CardContent sx={{pt: 0}}>
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
                            />
                        ))
                    }
                </List>
            </CardContent>
        </Card>
    );
};

export default TaskList;
