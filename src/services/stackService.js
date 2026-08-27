import { privateApi } from "./privateApi";

export async function getStacks() {
  const response = await privateApi.get("/skills");
  return response.data;
}

export async function createStack(data) {
  const response = await privateApi.post("/skills", data);
  return response.data;
}

export async function updateStack(data, id) {
  const response = await privateApi.patch(`/skills/${id}`, data);
  return response.data;
}

export async function deleteStack(id) {
  await privateApi.patch(`/skills/${id}/delete`);
}