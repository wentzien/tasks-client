import PropTypes from "prop-types";
import {Link as RouterLink} from "react-router-dom";
import {AppBar, Box, Button, Chip, Divider, IconButton, Link, Toolbar} from "@material-ui/core";
import MenuIcon from "../../../icons/Menu";
import Logo from "../Logo";

const MainNavbar = (props) => {
    const {onSidebarMobileOpen} = props;

    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "background.paper",
                color: "text.secondary"
            }}
        >
            <Toolbar sx={{minHeight: 64}}>
                <IconButton
                    color="inherit"
                    onClick={onSidebarMobileOpen}
                    sx={{
                        display: {
                            md: "none"
                        }
                    }}
                >
                    <MenuIcon fontSize="small"/>
                </IconButton>
                <RouterLink to="/">
                    <Logo
                        sx={{
                            display: {
                                md: "inline",
                                xs: "none"
                            },
                            height: 40,
                            width: 40
                        }}
                    />
                </RouterLink>
                <Box sx={{flexGrow: 1}}/>
                <Box
                    sx={{
                        alignItems: "center",
                        display: {
                            md: "flex",
                            xs: "none"
                        }
                    }}
                >
                    <Link
                        color="textSecondary"
                        component={RouterLink}
                        to="/tasklists"
                        underline="none"
                        variant="body1"
                    >
                        Tasklists
                    </Link>
                    <Chip
                        color="primary"
                        label="NEW"
                        size="small"
                        sx={{
                            maxHeight: 20,
                            ml: 1,
                            mr: 2
                        }}
                    />
                    <Divider
                        orientation="vertical"
                        sx={{
                            height: 32,
                            mx: 2
                        }}
                    />
                    <Link
                        color="textSecondary"
                        component={RouterLink}
                        to="/authentication/register"
                        underline="none"
                        variant="body1"
                    >
                        Register
                    </Link>
                    <Link
                        color="textSecondary"
                        component={RouterLink}
                        to="/authentication/login"
                        underline="none"
                        variant="body1"
                    >
                        Login
                    </Link>
                </Box>
            </Toolbar>
            <Divider/>
        </AppBar>
    );
};

MainNavbar.propTypes = {
    onSidebarMobileOpen: PropTypes.func
};

export default MainNavbar;
