
import { privateApi } from "./privateApi";

export async function createTimeline(data) {
    const response = await privateApi.post('/timeline', data);
    return response.data;
}
export async function getTimeline() {
    const response = await privateApi.get('/timeline');
    return response.data;
}

export async function updateTimeline(data, id) {
    const response = await privateApi.patch(`/timeline/${id}`, data);
    return response.data;
}

export async function deleteTimeline(id) {
  await privateApi.patch(`/timeline/${id}/delete`);
}