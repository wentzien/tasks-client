import Box from "@material-ui/core/Box";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton"
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ListItem from "@material-ui/core/ListItem";

const TaskItem = ({task, onDelete, onMarkFinished, onMarkImportant, onClickTitle, divider, disabled}) => {
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
                        <IconButton onClick={() => onMarkFinished(task)} disabled={disabled}>
                            {task.done ?
                                <CheckCircleRoundedIcon/>
                                :
                                <RadioButtonUncheckedRoundedIcon/>
                            }
                        </IconButton>
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
                <IconButton onClick={() => onMarkImportant(task)} disabled={disabled}>
                    {
                        task.important ?
                            <StarRoundedIcon/>
                            :
                            <StarOutlineRoundedIcon/>
                    }
                </IconButton>
                <IconButton onClick={() => onDelete(task)} disabled={disabled}>
                    <DeleteOutlineRoundedIcon/>
                </IconButton>
            </Box>
        </ListItem>
    );
};

export default TaskItem;

