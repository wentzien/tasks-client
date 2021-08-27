import TaskList from "./TaskList";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const TaskListCard = ({tasks, onDelete, onMarkFinished, onMarkImportant, onClickTitle}) => {
    return (
        <Card>
            <CardContent sx={{pt: 0}}>
                <TaskList
                    tasks={tasks}
                    onDelete={onDelete}
                    onMarkFinished={onMarkFinished}
                    onMarkImportant={onMarkImportant}
                    onClickTitle={onClickTitle}
                />
            </CardContent>
        </Card>
    );
};

export default TaskListCard;
