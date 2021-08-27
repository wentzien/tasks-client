import jwtDecode from "jwt-decode";
import http from "./httpService";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL + "/auth";
const tokenKey = "token";

const login = async (user) => {
    const {data: token} = await http.post(apiUrl, {
        email: user.email,
        password: user.password
    });

    return token;
};

const me = (token) => {
    http.setTokenHeader(token);
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
