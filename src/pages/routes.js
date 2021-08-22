import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import LoadingScreen from "../components/general/LoadingScreen";
import MainLayout from "../components/general/MainLayout";

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen/>}>
        <Component {...props} />
    </Suspense>
);

// Main Pages

const Home = Loadable(lazy(() => import("../pages/Home")));

// Authentication pages

const Login = Loadable(lazy(() => import("../pages/accounts/login")));
const Register = Loadable(lazy(() => import("../pages/accounts/register")));

// Error pages

const AuthorizationRequired = Loadable(lazy(() => import("../pages/AuthorizationRequired")));
const NotFound = Loadable(lazy(() => import("../pages/NotFound")));
const ServerError = Loadable(lazy(() => import("../pages/ServerError")));

// Other pages


const routes = [
    {
        path: "*",
        element: <MainLayout/>,
        children: [
            {
                path: "authentication",
                children: [
                    {
                        path: "login",
                        element: (
                            <Login/>
                        )
                    },
                    {
                        path: "register",
                        element: (
                            <Register/>
                        )
                    },
                ]
            },
            {
                path: "/",
                element: (
                    <Navigate
                        to="/home"
                        replace
                    />
                )
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
                element: <NotFound/>
            }
        ]
    }
];

export default routes;
