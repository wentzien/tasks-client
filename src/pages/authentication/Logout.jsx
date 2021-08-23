import {useEffect} from "react";
import useAuth from "../../hooks/useAuth";
import {Navigate} from "react-router-dom";

const Logout = () => {
    const {logout} = useAuth();

    useEffect(() => {
        logout();
    }, []);

    return (<Navigate to="/home"/>);
};

export default Logout;

