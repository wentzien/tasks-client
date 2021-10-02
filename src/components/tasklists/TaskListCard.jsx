import TaskList from "./TaskList";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const TaskListCard = ({tasks, onDelete, onMarkFinished, onMarkImportant, onClickTitle, disabled}) => {
    return (
        <Card>
            <CardContent sx={{pt: 0}}>
                <TaskList
                    tasks={tasks}
                    onDelete={onDelete}
                    onMarkFinished={onMarkFinished}
                    onMarkImportant={onMarkImportant}
                    onClickTitle={onClickTitle}
                    disabled={disabled}
                />
            </CardContent>
        </Card>
    );
};

export default TaskListCard;
