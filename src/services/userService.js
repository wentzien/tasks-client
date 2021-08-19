import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

function register(user) {
    return http.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        name: user.name
    });
}

export default {
    register
}