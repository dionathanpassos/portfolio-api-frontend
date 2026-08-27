
import { privateApi } from "./privateApi";

export async function createHero(data) {
    const response = await privateApi.post('/hero', data);
    return response.data;
}

export async function getHero() {
    const response = await privateApi.get('/hero');
    return response.data;
}

export async function updateHero(data, id) {
    const response = await privateApi.patch(`/hero/${id}`, data);
    return response.data;
}