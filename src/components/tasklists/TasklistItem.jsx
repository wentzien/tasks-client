import Card from "react-bootstrap/Card";

const TasklistItem = ({tasklist}) => {
    return (
        <Card>
            <Card.Body>
                <a href={"/tasklists/" + tasklist.id}>{tasklist.name}</a>
            </Card.Body>
        </Card>
    );
};

export default TasklistItem;
