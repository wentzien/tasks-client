import jwtDecode from "jwt-decode";
import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

const login = async (user) => {
    const {data: token} = await http.post(apiEndpoint, {
        email: user.email,
        password: user.password
    });

    return token;
};

const me = (token) => {
    http.setJwt(token);
    return jwtDecode(token);
}

const getToken = () => window.localStorage.getItem(tokenKey);

const setToken = (token) => window.localStorage.setItem(tokenKey, token);

const removeToken = () => window.localStorage.removeItem(tokenKey);

export default {
    login,
    me,
    getToken,
    setToken,
    removeToken
};
