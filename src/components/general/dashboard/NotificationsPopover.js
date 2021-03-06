import {useRef, useState} from "react";
import {subDays, subHours} from "date-fns";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import BellIcon from "../../../icons/Bell";
import ChatAltIcon from "../../../icons/ChatAlt";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CreditCardIcon from "../../../icons/CreditCard";
import ShoppingCartIcon from "../../../icons/ShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const now = new Date();

const notifications = [
    {
        id: "5e8883f1b51cc1956a5a1ec0",
        createdAt: subHours(now, 2).getTime(),
        description: "Dummy text",
        title: "Your order is placed",
        type: "order_placed"
    },
    {
        id: "5e8883f7ed1486d665d8be1e",
        createdAt: subDays(now, 1).getTime(),
        description: "You have 32 unread messages",
        title: "New message received",
        type: "new_message"
    },
    {
        id: "5e8883fca0e8612044248ecf",
        createdAt: subDays(now, 3).getTime(),
        description: "Dummy text",
        title: "Your item is shipped",
        type: "item_shipped"
    },
    {
        id: "5e88840187f6b09b431bae68",
        createdAt: subDays(now, 7).getTime(),
        description: "You have 32 unread messages",
        title: "New message received",
        type: "new_message"
    }
];

const iconsMap = {
    item_shipped: ShoppingCartIcon,
    new_message: ChatAltIcon,
    order_placed: CreditCardIcon,
    invited: ShareIcon
};

const NotificationsPopover = ({invites, onAccept, onDecline}) => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Notifications">
                <IconButton
                    color="inherit"
                    ref={anchorRef}
                    onClick={handleOpen}
                >
                    {
                        invites &&
                        (
                            <Badge
                                color="error"
                                badgeContent={invites.length}
                            >
                                <BellIcon fontSize="small"/>
                            </Badge>
                        )
                    }
                </IconButton>
            </Tooltip>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}
                onClose={handleClose}
                open={open}
                PaperProps={{
                    sx: {width: 320}
                }}
            >
                <Box sx={{p: 2}}>
                    <Typography
                        color="textPrimary"
                        variant="h6"
                    >
                        Notifications
                    </Typography>
                </Box>
                {notifications.length === 0
                    ? (
                        <Box sx={{p: 2}}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                There are no notifications
                            </Typography>
                        </Box>
                    )
                    : (
                        <>
                            <List disablePadding>
                                {invites.map((invite) => {

                                    return (
                                        <ListItem
                                            divider
                                            key={invite.id}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: "primary.main",
                                                        color: "primary.contrastText"
                                                    }}
                                                >
                                                    <ShareIcon fontSize="small"/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={(
                                                    <Link
                                                        color="textPrimary"
                                                        sx={{cursor: "pointer"}}
                                                        underline="none"
                                                        variant="subtitle2"
                                                    >
                                                        {invite.Tasklist.title}
                                                    </Link>
                                                )}
                                                secondary={invite.InvitedByUser.name}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Accept"
                                                    variant="contained"
                                                    onClick={() => onAccept(invite.id)}
                                                >
                                                    <CheckRoundedIcon/>
                                                </IconButton>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Decline"
                                                    variant="contained"
                                                    onClick={() => onDecline(invite.id)}
                                                >
                                                    <CloseRoundedIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 1
                                }}
                            >
                                <Button
                                    color="primary"
                                    size="small"
                                    variant="text"
                                >
                                    Mark all as read
                                </Button>
                            </Box>
                        </>
                    )}
            </Popover>
        </>
    );
};

export default NotificationsPopover;
