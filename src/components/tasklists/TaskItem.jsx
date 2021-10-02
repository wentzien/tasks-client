import Box from "@mui/material/Box";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton"
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ListItem from "@mui/material/ListItem";

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

