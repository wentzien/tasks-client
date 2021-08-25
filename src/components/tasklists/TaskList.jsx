import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import TaskItem from "./TaskItem";

const TaskList = ({tasks, onDelete, onMarkFinished, onMarkImportant}) => {
    let taskCounter = 0;

    const renderDivider = () => {
        taskCounter++;
        return taskCounter !== tasks.length;
    }

    return (
        <Card sx={{mt: 4}}>
            <CardHeader title={"My Tasklist"}/>
            <Divider/>
            <CardContent sx={{pt: 0}}>
                <List>
                    {
                        tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDelete={onDelete}
                                onMarkFinished={onMarkFinished}
                                onMarkImportant={onMarkImportant}
                                divider={renderDivider()}
                            />

                            // <ListItem
                            //     key={task.id}
                            //     disableGutters
                            //     divider={renderDivider()}
                            //     sx={{
                            //         justifyContent: "space-between",
                            //         padding: 2
                            //     }}
                            // >
                            //     <Box display="flex">
                            //         <Box sx={{display: "flex", alignItems: "center"}}>
                            //             <CheckCircleOutlineIcon
                            //                 onClick={() => onMarkFinished(task.id)}
                            //                 sx={{cursor: "pointer"}}
                            //             />
                            //         </Box>
                            //         <Box sx={{ml: 2}}>
                            //             <Typography
                            //                 color="textPrimary"
                            //                 variant="subtitle2"
                            //             >
                            //                 {task.description}
                            //             </Typography>
                            //             <Typography
                            //                 color="textSecondary"
                            //                 variant="body2"
                            //             >
                            //                 {format(addDays(new Date(), 14).getTime(), "dd MMM yyyy")}
                            //             </Typography>
                            //         </Box>
                            //     </Box>
                            //
                            //     <Box display="flex">
                            //         <StarOutlineRoundedIcon
                            //             onClick={() => onMarkImportant(task)}
                            //             sx={{cursor: "pointer"}}
                            //         />
                            //         <DeleteOutlineRoundedIcon
                            //             onClick={() => onDelete(task.id)}
                            //             sx={{cursor: "pointer"}}
                            //         />
                            //     </Box>
                            // </ListItem>
                        ))
                    }
                </List>
            </CardContent>
        </Card>
    );
};

export default TaskList;
