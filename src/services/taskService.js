import {apiUrl} from "../config.json";
import http from "./httpService";

async function getAll(tasklistId) {
    const response = await http.get(apiUrl + "/tasklists/" + tasklistId + "/tasks");
    return response.data;
}

async function getById(tasklistId, taskId) {
    const response = await http.get(apiUrl + "/tasklists/" + tasklistId + "/tasks" + taskId);
    return response.data;
}

async function create(tasklistId, task) {
    const response = await http.post(apiUrl + "/tasklists/" + tasklistId + "/tasks", task);
    return response.data;
}

async function remove(tasklistId, taskId) {
    const response = await http.post(apiUrl + "/tasklists/" + tasklistId + "/tasks" + taskId);
    return response.data;
}

export default {
    getAll,
    getById,
    create,
    remove
};
