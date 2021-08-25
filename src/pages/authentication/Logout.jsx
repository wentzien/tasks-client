import {useEffect} from "react";
import useAuth from "../../hooks/useAuth";
import {Navigate} from "react-router-dom";
import toast from "react-hot-toast";

const Logout = () => {
    const {logout} = useAuth();

    useEffect(async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
            toast.error("Unable to logout.");
        }
    }, []);

    return (<Navigate to="/"/>);
};

export default Logout;

