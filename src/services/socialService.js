
import { privateApi } from "./privateApi";

export async function createSocial(data) {
    const response = await privateApi.post('/social', data);
    return response.data;
}

export async function getSocial() {
    const response = await privateApi.get('/social');
    return response.data;
}

export async function updateSocial(data, id) {
    const response = await privateApi.patch(`/social/${id}`, data);
    return response.data;
}