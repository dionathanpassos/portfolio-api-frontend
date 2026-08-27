
import { privateApi } from "./privateApi";

export async function createAbout(data) {
    const response = await privateApi.post('/about', data);
    return response.data;
}

export async function getAbout() {
    const response = await privateApi.get('/about');
    return response.data;
}

export async function updateAbout(data, id) {
    const response = await privateApi.patch(`/about/${id}`, data);
    return response.data;
}