import http from "./httpService";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL + "/generallists";

async function getMyDay() {
    const response = await http.get(apiUrl + "/myday");
    return response.data;
}

async function important() {
    const response = await http.get(apiUrl + "/important");
    return response.data;
}

async function planned() {
    const response = await http.get(apiUrl + "/planned");
    return response.data;
}

async function all() {
    const response = await http.get(apiUrl + "/all");
    return response.data;
}

async function done() {
    const response = await http.get(apiUrl + "/done");
    return response.data;
}

async function assignedToMe() {
    const response = await http.get(apiUrl + "/assignedtome");
    return response.data;
}

export default {
    getMyDay,
    important,
    planned,
    all,
    done,
    assignedToMe
};
