import Box from "@material-ui/core/Box";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Typography from "@material-ui/core/Typography";
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ListItem from "@material-ui/core/ListItem";

const TaskItem = ({task, onDelete, onMarkFinished, onMarkImportant, onClickTitle, divider}) => {
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
            <Box sx={{display: "flex"}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    {
                        task.done ?
                            <CheckCircleRoundedIcon
                                onClick={() => onMarkFinished(task)}
                                sx={{cursor: "pointer"}}
                            />
                            :
                            <RadioButtonUncheckedRoundedIcon
                                onClick={() => onMarkFinished(task)}
                                sx={{cursor: "pointer"}}
                            />
                    }
                </Box>
                <Box sx={{ml: 2, cursor: "pointer"}} onClick={() => onClickTitle(task)}>
                    <Typography
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        {task.title}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {task.createdAt && task.createdAt.toString().split("T")[0]}
                    </Typography>
                </Box>
            </Box>

            <Box display="flex">
                {
                    task.important ?
                        <StarRoundedIcon
                            onClick={() => onMarkImportant(task)}
                            sx={{cursor: "pointer"}}
                        />
                        :
                        <StarOutlineRoundedIcon
                            onClick={() => onMarkImportant(task)}
                            sx={{cursor: "pointer"}}
                        />
                }
                <DeleteOutlineRoundedIcon
                    onClick={() => onDelete(task.id)}
                    sx={{cursor: "pointer"}}
                />
            </Box>
        </ListItem>
    );
};

export default TaskItem;

