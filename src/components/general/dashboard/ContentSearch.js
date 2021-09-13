/* eslint-disable react/no-array-index-key */
import {useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "../../../icons/Search";
import XIcon from "../../../icons/X";
import Scrollbar from "../Scrollbar";
import searchService from "../../../services/searchService";

const ContentSearch = () => {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const search = async () => {
        setShowResults(false);
        setIsLoading(true);

        try {
            const results = await searchService.getHits(value);
            setResults(results);
        } catch (ex) {
            console.error(ex);
        }

        setIsLoading(false);
        setShowResults(true);
    };

    const handleClick = () => {
        search();
    };

    const handleKeyUp = (event) => {
        if (event.code === "ENTER") {
            search();
        }
    };

    return (
        <>
            <Tooltip title="Search">
                <IconButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <SearchIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Drawer
                anchor="top"
                ModalProps={{BackdropProps: {invisible: true}}}
                onClose={handleClose}
                open={open}
                PaperProps={{
                    sx: {width: "100%"}
                }}
                variant="temporary"
            >
                <Box sx={{p: 3}}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >
                        <IconButton onClick={handleClose}>
                            <XIcon fontSize="small"/>
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{p: 3}}>
                    <Container maxWidth="md">
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex"
                            }}
                        >
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small"/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(event) => setValue(event.target.value)}
                                onKeyUp={handleKeyUp}
                                placeholder="Search..."
                                value={value}
                            />
                            <Button
                                color="primary"
                                onClick={handleClick}
                                size="large"
                                sx={{ml: 2}}
                                variant="contained"
                            >
                                Search
                            </Button>
                        </Box>
                        <Box sx={{mt: 3}}>
                            <Scrollbar options={{suppressScrollX: true}}>
                                {isLoading
                                    ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <CircularProgress/>
                                        </Box>
                                    )
                                    : (
                                        <>
                                            {
                                                showResults && results.length > 0 ?
                                                    (
                                                        <>
                                                            {results.map(result => (
                                                                <Box
                                                                    key={result.id}
                                                                    sx={{mb: 2}}
                                                                >
                                                                    <Link
                                                                        color="textPrimary"
                                                                        component={RouterLink}
                                                                        to={"/tasklists/" + result.id}
                                                                        variant="h5"
                                                                    >
                                                                        {result.title}
                                                                    </Link>
                                                                    {result.Tasks.map(task => (
                                                                        <Typography
                                                                            key={task.id}
                                                                            color="textPrimary"
                                                                            variant="body2"
                                                                        >
                                                                            {task.title}
                                                                        </Typography>
                                                                    ))}
                                                                </Box>
                                                            ))}
                                                        </>
                                                    ) :
                                                    (
                                                        <>
                                                            <Typography color="textPrimary">
                                                                Nothing found
                                                            </Typography>
                                                        </>
                                                    )
                                            }
                                            {showResults && results.length > 0 && (
                                                <>

                                                </>
                                            )}
                                        </>
                                    )}
                            </Scrollbar>
                        </Box>
                    </Container>
                </Box>
            </Drawer>
        </>
    );
};

export default ContentSearch;
