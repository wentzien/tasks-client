import {Link as RouterLink} from "react-router-dom";
import PropTypes from "prop-types";
import {AppBar, Box, IconButton, Toolbar} from "@material-ui/core";
import {experimentalStyled} from "@material-ui/core/styles";
import MenuIcon from "../../../icons/Menu";
import AccountPopover from "./AccountPopover";
// import ContactsPopover from "./ContactsPopover";
import ContentSearch from "./ContentSearch";
// import LanguagePopover from "./LanguagePopover";
import Logo from "../Logo";
import NotificationsPopover from "./NotificationsPopover";
import {useEffect, useState} from "react";
import userService from "../../../services/userService";
import useAuth from "../../../hooks/useAuth";

const DashboardNavbarRoot = experimentalStyled(AppBar)(({theme}) => ({
    ...(theme.palette.mode === "light" && {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "none",
        color: theme.palette.primary.contrastText
    }),
    ...(theme.palette.mode === "dark" && {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "none"
    }),
    zIndex: theme.zIndex.drawer + 100
}));

const DashboardNavbar = (props) => {
    const {onSidebarMobileOpen, ...other} = props;
    const [invites, setInvites] = useState([]);
    const {user} = useAuth();

    useEffect(async () => {
        if (user) {
            const invites = await userService.getAllInvites();
            setInvites(invites);
            console.log(invites);
        }
    }, [user]);

    return (
        <DashboardNavbarRoot {...other}>
            <Toolbar sx={{minHeight: 64}}>
                <IconButton
                    color="inherit"
                    onClick={onSidebarMobileOpen}
                    sx={{
                        display: {
                            lg: "none"
                        }
                    }}
                >
                    <MenuIcon fontSize="small"/>
                </IconButton>
                <RouterLink to="/">
                    <Logo
                        sx={{
                            display: {
                                lg: "inline",
                                xs: "none"
                            },
                            height: 40,
                            width: 40
                        }}
                    />
                </RouterLink>
                <Box
                    sx={{
                        flexGrow: 1,
                        ml: 2
                    }}
                />
                {/*<LanguagePopover />*/}
                <Box sx={{ml: 1}}>
                    <ContentSearch/>
                </Box>
                {/*<Box sx={{ ml: 1 }}>*/}
                {/*  <ContactsPopover />*/}
                {/*</Box>*/}
                <Box sx={{ml: 1}}>
                    <NotificationsPopover
                        invites={invites}
                    />
                </Box>
                <Box sx={{ml: 2}}>
                    <AccountPopover/>
                </Box>
            </Toolbar>
        </DashboardNavbarRoot>
    );
};

DashboardNavbar.propTypes = {
    onSidebarMobileOpen: PropTypes.func
};

export default DashboardNavbar;
