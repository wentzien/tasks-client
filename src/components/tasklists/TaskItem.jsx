import {addDays, format} from "date-fns";
import Box from "@material-ui/core/Box";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Typography from "@material-ui/core/Typography";
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ListItem from "@material-ui/core/ListItem";

const TaskItem = ({task, onDelete, onMarkFinished, onMarkImportant, divider}) => {
    return (
        <ListItem
            key={task.id}
            disableGutters
            divider={divider}
            sx={{
                justifyContent: "space-between",
                padding: 2
            }}
        >
            <Box display="flex">
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <CheckCircleOutlineIcon
                        onClick={() => onMarkFinished(task.id)}
                        sx={{cursor: "pointer"}}
                    />
                </Box>
                <Box sx={{ml: 2}}>
                    <Typography
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        {task.description}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {format(addDays(new Date(), 14).getTime(), "dd MMM yyyy")}
                    </Typography>
                </Box>
            </Box>

            <Box display="flex">
                <StarOutlineRoundedIcon
                    onClick={() => onMarkImportant(task)}
                    sx={{cursor: "pointer"}}
                />
                <DeleteOutlineRoundedIcon
                    onClick={() => onDelete(task.id)}
                    sx={{cursor: "pointer"}}
                />
            </Box>
        </ListItem>
    );
};

export default TaskItem;

