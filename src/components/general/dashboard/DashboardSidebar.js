import {useEffect, useState} from "react";
import {Link as RouterLink, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {Avatar, Box, Button, Divider, Drawer, Link, Typography} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useAuth from "../../../hooks/useAuth";

import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import EventRoundedIcon from "@material-ui/icons/EventRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import TodayRoundedIcon from "@material-ui/icons/TodayRounded";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

import Logo from "../Logo";
import NavSection from "../NavSection";
import Scrollbar from "../Scrollbar";
import tasklistService from "../../../services/tasklistService";

const tasklistCreationNavItem = {
    title: "Create Tasklist",
    path: "/tasklists/new",
    icon: <AddBoxOutlinedIcon/>
};

const basicSections = [
    {
        title: "General",
        items: [
            {
                title: "My day",
                path: "/home/myday",
                icon: <TodayRoundedIcon fontSize="small"/>
            },
            {
                title: "Important",
                path: "/home/important",
                icon: <StarBorderRoundedIcon fontSize="small"/>
            },
            {
                title: "Planned",
                path: "/home/planned",
                icon: <EventRoundedIcon fontSize="small"/>
            },
            {
                title: "All",
                path: "/home/all",
                icon: <AllInclusiveIcon fontSize="small"/>
            },
            {
                title: "Done",
                path: "/home/done",
                icon: <DoneRoundedIcon fontSize="small"/>
            },
            {
                title: "Assigned to me",
                path: "/home/assignedtome",
                icon: <PersonRoundedIcon fontSize="small"/>
            }
        ]
    },
    {
        title: "Tasklists",
        items: [
            tasklistCreationNavItem
        ]
    }
];

const DashboardSidebar = (props) => {
    const {onMobileClose, openMobile} = props;
    const location = useLocation();
    const {user} = useAuth();
    const [sections, setSections] = useState(basicSections);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    useEffect(async () => {
        if (user) {
            try {
                const tasklists = await tasklistService.getAll();
                if (tasklists) {
                    const newSections = [...sections];
                    newSections[1].items = [tasklistCreationNavItem, ...tasklists];
                    setSections(newSections);
                }
            } catch (ex) {
                console.error(ex);
            }
        }
    }, [user, location.pathname]);

    const content = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}
        >
            <Scrollbar options={{suppressScrollX: true}}>
                <Box
                    sx={{
                        display: {
                            lg: "none",
                            xs: "flex"
                        },
                        justifyContent: "center",
                        p: 2
                    }}
                >
                    <RouterLink to="/">
                        <Logo
                            sx={{
                                height: 40,
                                width: 40
                            }}
                        />
                    </RouterLink>
                </Box>
                <Box sx={{p: 2}}>
                    <Box
                        sx={{
                            alignItems: "center",
                            backgroundColor: "background.default",
                            borderRadius: 1,
                            display: "flex",
                            overflow: "hidden",
                            p: 2
                        }}
                    >
                        <RouterLink to="/dashboard/account">
                            <Avatar
                                // src={user.avatar}
                                src="/static/img/user.jpg"
                                sx={{
                                    cursor: "pointer",
                                    height: 48,
                                    width: 48
                                }}
                            />
                        </RouterLink>
                        <Box sx={{ml: 2}}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                {user ? user.name : "Guest"}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                Your plan:
                                {" "}
                                <Link
                                    color="primary"
                                    component={RouterLink}
                                    to="/pricing"
                                >
                                    {/*{user.plan}*/}
                                    Founder
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider/>
                <Box sx={{p: 2}}>
                    {sections.map((section) => (
                        <NavSection
                            key={section.title}
                            pathname={location.pathname}
                            sx={{
                                "& + &": {
                                    mt: 3
                                }
                            }}
                            {...section}
                        />
                    ))}
                </Box>
            </Scrollbar>
        </Box>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: "background.paper",
                        height: "calc(100% - 64px) !important",
                        top: "64px !Important",
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onMobileClose}
            open={openMobile}
            PaperProps={{
                sx: {
                    backgroundColor: "background.paper",
                    width: 280
                }
            }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

export default DashboardSidebar;
