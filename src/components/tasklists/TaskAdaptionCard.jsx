import TaskAdaptionForm from "./TaskAdaptionForm";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const TaskAdaptionCard = ({task, onSubmit, onMarkImportant, onDelete, onClose, disabled}) => {
    return (
        <Card sx={{position: "sticky", top: 10}}>
            <CardContent sx={{pt: 1}}>
                <TaskAdaptionForm
                    task={task}
                    onSubmit={onSubmit}
                    onMarkImportant={onMarkImportant}
                    onDelete={onDelete}
                    onClose={onClose}
                    disabled={disabled}
                />
            </CardContent>
        </Card>
    );
};

export default TaskAdaptionCard;
