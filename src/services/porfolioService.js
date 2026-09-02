import { publicApi } from "./publicApi";

const username = import.meta.env.VITE_PORTFOLIO_USERNAME;

export async function getPortfilio() {
    const response = await publicApi.get(`/public/users/${username}/portfolio`);
    return response;
}

export async function getProject(slug) {
    const response = await publicApi.get(`/public/users/${username}/project/${slug}`);
    return response.data;    
}