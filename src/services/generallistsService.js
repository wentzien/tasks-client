import {apiUrl} from "../config.json";
import http from "./httpService";

async function getMyDay() {
    const response = await http.get(apiUrl + "/generallists/myday");
    return response.data;
}

async function important() {
    const response = await http.get(apiUrl + "/generallists/important");
    return response.data;
}

async function planned() {
    const response = await http.get(apiUrl + "/generallists/planned");
    return response.data;
}

async function all() {
    const response = await http.get(apiUrl + "/generallists/all");
    return response.data;
}

async function done() {
    const response = await http.get(apiUrl + "/generallists/done");
    return response.data;
}

async function assignedToMe() {
    const response = await http.get(apiUrl + "/generallists/assignedtome");
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
