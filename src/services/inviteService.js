import http from "./httpService";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL + "/tasklists";

async function getAllTasklistInvites(tasklistId) {
    const response = await http.get(apiUrl + "/" + tasklistId + "/invites");
    return response.data;
}

async function inviteUser(tasklistId, invite) {
    const response = await http.post(apiUrl + "/" + tasklistId + "/invites", invite);
    return response.data;
}

export default {
    getAllTasklistInvites,
    inviteUser
};
