import http from "./httpService";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL + "/search";

async function getHits(searchTerm) {
    const response = await http.get(apiUrl + "/" + searchTerm);
    return response.data;
}

export default {
    getHits
};