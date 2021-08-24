import axios from "axios";
import {toast} from "react-toastify";

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        console.log(error);
        toast.error("An unexpected error occurrred.");
    }

    return Promise.reject(error);
});

const setTokenHeader = (jwt) => {
    axios.defaults.headers.common["x-auth-token"] = jwt || "";
}

const getTokenHeader = () => {
    return axios.defaults.headers.common["x-auth-token"];
}

const removeTokenHeader = () => {
    axios.defaults.headers.common["x-auth-token"] = "";
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setTokenHeader,
    removeTokenHeader,
    getTokenHeader
};
