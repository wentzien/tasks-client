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

const Home = Loadable(lazy(() => import("../pages/Home")));

// Tasklist Pages

const TasklistOverview = Loadable(lazy(() => import("../pages/tasklists/TasklistOverview")));
const TaskOverview = Loadable(lazy(() => import("../pages/tasklists/tasks/TaskOverview")));

// Authentication pages

const Login = Loadable(lazy(() => import("./authentication/Login")));
const Register = Loadable(lazy(() => import("./authentication/Register")));
const Logout = Loadable(lazy(() => import("./authentication/Logout")));

// Error pages

const AuthorizationRequired = Loadable(lazy(() => import("../pages/AuthorizationRequired")));
const NotFound = Loadable(lazy(() => import("../pages/NotFound")));
const ServerError = Loadable(lazy(() => import("../pages/ServerError")));

// Other pages

const Test = Loadable(lazy(() => import("../pages/Test")));


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
        element: <DashboardLayout/>,
        children: [
            {
                path: "/",
                element: <TasklistOverview/>
            },
            {
                path: ":tasklistId",
                element: <TaskOverview/>
            },
            {
                path: "test",
                element: <Test/>
            }
        ]
    },
    {
        path: "*",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" replace/>
            },
            {
                path: "/home",
                element: <Home/>
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
