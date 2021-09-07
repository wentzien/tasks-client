import {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import { experimentalStyled } from "@material-ui/core/styles";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import tasklistService from "../../../services/tasklistService";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import TodayRoundedIcon from "@material-ui/icons/TodayRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import EventRoundedIcon from "@material-ui/icons/EventRounded";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import useAuth from "../../../hooks/useAuth";
import userService from "../../../services/userService";

const DashboardLayoutRoot = experimentalStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%"
}));

const DashboardLayoutWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: "64px",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: "280px"
  }
}));

const DashboardLayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden"
});

const DashboardLayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
  position: "relative",
  WebkitOverflowScrolling: "touch"
});

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
        path: "/tasklists/myday",
        icon: <TodayRoundedIcon fontSize="small"/>
      },
      {
        title: "Important",
        path: "/tasklists/important",
        icon: <StarBorderRoundedIcon fontSize="small"/>
      },
      {
        title: "Planned",
        path: "/tasklists/planned",
        icon: <EventRoundedIcon fontSize="small"/>
      },
      {
        title: "All",
        path: "/tasklists/all",
        icon: <AllInclusiveIcon fontSize="small"/>
      },
      {
        title: "Done",
        path: "/tasklists/done",
        icon: <DoneRoundedIcon fontSize="small"/>
      },
      {
        title: "Assigned to me",
        path: "/tasklists/assignedtome",
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

const DashboardLayout = () => {
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const location = useLocation();
  const {user} = useAuth();
  const [sections, setSections] = useState(basicSections);
  const [invites, setInvites] = useState([]);

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
  }, [user, location.pathname, invites]);

  useEffect(async () => {
    if (user) {
      try {
        const invites = await userService.getAllInvites();
        setInvites(invites);
      } catch (ex) {
        console.error(ex);
      }
    }
  }, [user]);


  const handleAcceptInvite = async (collaboratorId) => {
    try {
      const {TasklistId} = await userService.acceptInvite(collaboratorId);

      const invitesCache = invites.filter(i => i.id !== collaboratorId);
      setInvites(invitesCache);
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleDeclineInvite = async (collaboratorId) => {
    try {
      const {TasklistId} = await userService.declineInvite(collaboratorId);

      const invitesCache = invites.filter(i => i.id !== collaboratorId);
      setInvites(invitesCache);
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar
          onSidebarMobileOpen={() => setIsSidebarMobileOpen(true)}
          invites={invites}
          onAccept={handleAcceptInvite}
          onDecline={handleDeclineInvite}
      />
      <DashboardSidebar
        onMobileClose={() => setIsSidebarMobileOpen(false)}
        openMobile={isSidebarMobileOpen}
        sections={sections}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
