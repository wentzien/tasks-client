import http from "./httpService";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL + "/tasklists";

async function getAll(tasklistId) {
    const response = await http.get(apiUrl + "/" + tasklistId + "/tasks");
    return response.data;
}

async function getById(tasklistId, taskId) {
    const response = await http.get(apiUrl + "/" + tasklistId + "/tasks/" + taskId);
    return response.data;
}

async function create(tasklistId, task) {
    const response = await http.post(apiUrl + "/" + tasklistId + "/tasks", task);
    return response.data;
}

async function update(tasklistId, taskId, task) {
    const response = await http.put(apiUrl + "/" + tasklistId + "/tasks/" + taskId, task);
    return response.data;
}

async function remove(tasklistId, taskId) {
    const response = await http.delete(apiUrl + "/" + tasklistId + "/tasks/" + taskId);
    return response.data;
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
