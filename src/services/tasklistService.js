import http from "./httpService";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL + "/tasklists";

async function getAll() {
    const response = await http.get(apiUrl);
    return response.data;
}

async function getById(tasklistId) {
    const response = await http.get(apiUrl + "/" + tasklistId);
    return response.data;
}

async function create(tasklist) {
    const response = await http.post(apiUrl, tasklist);
    return response.data;
}

async function update(tasklistId, tasklist) {
    const response = await http.put(apiUrl + "/" + tasklistId, tasklist);
    return response.data;
}

async function remove(tasklistId) {
    const response = await http.delete(apiUrl + "/" + tasklistId);
    return response.data;
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
};
