import {useRef, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Divider,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Typography
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import CogIcon from "../../../icons/Cog";
import UserIcon from "../../../icons/User";

const AccountPopover = () => {
    const anchorRef = useRef(null);
    const {user} = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpen}
                ref={anchorRef}
                sx={{
                    alignItems: "center",
                    display: "flex"
                }}
            >
                <Avatar
                    src="/static/img/user.jpg"
                    // src={user.avatar}
                    sx={{
                        height: 32,
                        width: 32
                    }}
                />
            </Box>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
                keepMounted
                onClose={handleClose}
                open={open}
                PaperProps={{
                    sx: {width: 240}
                }}
            >
                <Box sx={{p: 2}}>
                    <Typography
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        Hello {user ? user.name : "Guest"}!
                    </Typography>
                </Box>
                <Divider/>
                <Box sx={{mt: 2}}>
                    <MenuItem
                        component={RouterLink}
                        to="/social/profile"
                    >
                        <ListItemIcon>
                            <UserIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText
                            primary={(
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Profile
                                </Typography>
                            )}
                        />
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to="/account"
                    >
                        <ListItemIcon>
                            <CogIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText
                            primary={(
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                >
                                    Settings
                                </Typography>
                            )}
                        />
                    </MenuItem>
                </Box>
                <Box sx={{p: 2}}>
                    <Button
                        component={RouterLink}
                        to="/authentication/logout"
                        color="primary"
                        fullWidth
                        variant="outlined"
                    >
                        Logout
                    </Button>
                </Box>
            </Popover>
        </>
    );
};

export default AccountPopover;
