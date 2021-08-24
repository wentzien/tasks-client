import {apiUrl} from "../config.json";
import http from "./httpService";

async function getAll() {
    const response = await http.get(apiUrl + "/tasklists");
    return response.data;
}

async function getById(tasklistId) {
    const response = await http.get(apiUrl + "/tasklists/" + tasklistId);
    return response.data;
}

async function create(data) {
    const response = await http.post(apiUrl + "/tasklists", data);
    return response.data;
}

async function remove(tasklistId) {
    const response = await http.post(apiUrl + "/tasklists/" + tasklistId);
    return response.data;
}

export default {
    getAll,
    getById,
    create,
    remove
};
