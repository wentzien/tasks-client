import Card from "react-bootstrap/Card";

const TaskItem = ({task}) => {
    return (
        <Card>
            <Card.Body>
                {task.description}
            </Card.Body>
        </Card>
    );
};

export default TaskItem;
