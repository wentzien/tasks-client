import {apiUrl} from "../config.json";
import http from "./httpService";

async function getAll() {
    try {
        const response = await http.get(apiUrl + "/tasklists");
        return response.data;

    } catch (ex) {
        console.log(ex);
    }
}

async function getById(tasklistId) {
    try {
        const response = await http.get(apiUrl + "/tasklists/" + tasklistId);
        return response.data;

    } catch (ex) {
        console.log(ex);
    }
}

async function create(data) {
    try {
        const response = await http.post(apiUrl + "/tasklists", data);
        return response.data;

    } catch (ex) {
        console.log(ex);
    }
}

async function remove(tasklistId) {
    try {
        const response = await http.post(apiUrl + "/tasklists/" + tasklistId);
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
