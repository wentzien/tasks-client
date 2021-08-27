import TaskCreationForm from "./TaskCreationForm";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

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
