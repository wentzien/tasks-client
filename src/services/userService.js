import http from "./httpService";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL + "/users";

const register = async (user) => {
    const {data: token} = await http.post(apiUrl, {
        email: user.email,
        password: user.password,
        name: user.name
    });

    return token;
}

export default {
    register
}
