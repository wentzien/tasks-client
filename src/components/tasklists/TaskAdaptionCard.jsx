import TaskAdaptionForm from "./TaskAdaptionForm";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const TaskAdaptionCard = ({task, onSubmit, onMarkImportant, onDelete, onClose}) => {
    return (
        <Card>
            <CardContent sx={{pt: 1}}>
                <TaskAdaptionForm
                    task={task}
                    onSubmit={onSubmit}
                    onMarkImportant={onMarkImportant}
                    onDelete={onDelete}
                    onClose={onClose}
                />
            </CardContent>
        </Card>
    );
};

export default TaskAdaptionCard;
