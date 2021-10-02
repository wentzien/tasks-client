import TaskCreationForm from "./TaskCreationForm";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const TaskCreationCard = ({onSubmit}) => {
    return (
        <Card sx={{mb: 2}}>
            <CardContent sx={{pt: 1}}>
                <TaskCreationForm
                    onSubmit={onSubmit}
                />
            </CardContent>
        </Card>
    );
};

export default TaskCreationCard;
