import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import LoadingScreen from "../components/general/LoadingScreen";
import MainLayout from "../components/general/main/MainLayout";
import DashboardLayout from "../components/general/dashboard/DashboardLayout";
import GuestGuard from "../components/guards/GuestGuard";
import AuthGuard from "../components/guards/AuthGuard";

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen/>}>
        <Component {...props} />
    </Suspense>
);

// Main Pages

const Welcome = Loadable(lazy(() => import("./Welcome")));

// Tasklist Pages

const GeneralListOverview = Loadable(lazy(() => import("../pages/tasklists/GeneralListsOverview")));
const TasklistOverview = Loadable(lazy(() => import("../pages/tasklists/TasklistOverview")));
const CreateTasklist = Loadable(lazy(() => import("./tasklists/CreateTasklist")));
const TaskView = Loadable(lazy(() => import("./tasklists/TaskView")));

// Authentication pages

const Login = Loadable(lazy(() => import("./authentication/Login")));
const Register = Loadable(lazy(() => import("./authentication/Register")));
const Logout = Loadable(lazy(() => import("./authentication/Logout")));

// Error pages

const AuthorizationRequired = Loadable(lazy(() => import("../pages/AuthorizationRequired")));
const NotFound = Loadable(lazy(() => import("../pages/NotFound")));
const ServerError = Loadable(lazy(() => import("../pages/ServerError")));

// Other pages

const routes = [
    {
        path: "authentication",
        children: [
            {
                path: "login",
                element:
                    <GuestGuard>
                        <Login/>
                    </GuestGuard>
            },
            {
                path: "register",
                element:
                    <GuestGuard>
                        <Register/>
                    </GuestGuard>
            },
            {
                path: "logout",
                element: <Logout/>
            },
        ]
    },
    {
        path: "tasklists",
        element:
            <AuthGuard>
                <DashboardLayout/>
            </AuthGuard>,
        children: [
            {
                path: "/",
                element: "My Tasklists Dashboard"
            },
            {
                path: "new",
                element: <CreateTasklist/>
            },
            {
                path: "myday",
                element: <GeneralListOverview type="myday" title="My day"/>
            },
            {
                path: "important",
                element: <GeneralListOverview type="important" title="Important"/>
            },
            {
                path: "planned",
                element: <GeneralListOverview type="planned" title="Planned"/>
            },
            {
                path: "all",
                element: <GeneralListOverview type="all" title="All"/>
            },
            {
                path: "done",
                element: <GeneralListOverview type="done" title="Done"/>
            },
            {
                path: "assignedtome",
                element: <GeneralListOverview type="assignedtome" title="Assigned to me"/>
            },
            {
                path: ":tasklistId",
                children: [
                    {
                        path: "/",
                        element: <TasklistOverview/>
                    },
                    {
                        path: "tasks/:taskId",
                        element: <TaskView/>
                    },
                ]
            },
        ]
    },
    {
        path: "*",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element:
                    <GuestGuard>
                        <Welcome/>
                    </GuestGuard>
            },
            {
                path: "401",
                element: <AuthorizationRequired/>
            },
            {
                path: "404",
                element: <NotFound/>
            },
            {
                path: "500",
                element: <ServerError/>
            },
            {
                path: "*",
                element: <Navigate to="/404" replace/>
            },
        ]
    }
];

export default routes;
