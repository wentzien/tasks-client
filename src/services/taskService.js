import {apiUrl} from "../config.json";
import http from "./httpService";

async function getAll(tasklistId) {
    try {
        const response = await http.get(apiUrl + "/tasklists/" + tasklistId + "/tasks");
        return response.data;

    } catch (ex) {
        console.log(ex);
    }
}

async function getById(tasklistId, taskId) {
    try {
        const response = await http.get(apiUrl + "/tasklists/" + tasklistId + "/tasks" + taskId);
        return response.data;

    } catch (ex) {
        console.log(ex);
    }
}

async function create(tasklistId) {
    try {
        const response = await http.post(apiUrl + "/tasklists/" + tasklistId + "/tasks");
        return response.data;

    } catch (ex) {
        console.log(ex);
    }
}

async function remove(tasklistId, taskId) {
    try {
        const response = await http.post(apiUrl + "/tasklists/" + tasklistId + "/tasks" + taskId);
        return response.data;

    } catch (ex) {
        console.log(ex);
    }
}

export default {
    getAll,
    getById,
    create,
    remove
};