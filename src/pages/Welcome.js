import {Helmet} from "react-helmet-async";
import Typography from "@mui/material/Typography";
import {Link as RouterLink} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

const Welcome = () => {
    return (
        <>
            <Helmet>
                <title>Welcome | Tasks App</title>
            </Helmet>
            <Box sx={{
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box>
                    <Typography align="center" variant="h1" gutterBottom>
                        Welcome to Tasks App
                    </Typography>
                    <Typography align="center" component="h2" variant="h3" gutterBottom>
                        Organize your tasks.
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={8}>
                        <Button
                            sx={{fontSize: 20}}
                            component={RouterLink}
                            to="/authentication/register"
                        >
                            Create your free account
                            <Chip
                                color="primary"
                                label="JOIN NOW"
                                size="small"
                                sx={{
                                    cursor: "pointer",
                                    ml: 1
                                }}
                            />

                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Welcome;
