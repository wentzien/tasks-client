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
};

const getAllInvites = async () => {
    const response = await http.get(apiUrl + "/invites");
    return response.data;
};

export default {
    register,
    getAllInvites
}
