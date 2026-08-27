
import { privateApi } from "./privateApi";

export async function createProject(data) {
    const response = await privateApi.post('/projects', data);
    return response.data;
}

export async function getProjects() {
    const response = await privateApi.get('/projects');
    return response.data;
}

export async function updateProject(data, id) {
    const response = await privateApi.patch(`/projects/${id}`, data);
    return response.data;
}

export async function deleteProject(id) {
  await privateApi.patch(`/projects/${id}/delete`);
}