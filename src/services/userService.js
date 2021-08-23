import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/users";

const register = async (user) => {
    const {data: token} = await http.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        name: user.name
    });

    return token;
}

export default {
    register
}
