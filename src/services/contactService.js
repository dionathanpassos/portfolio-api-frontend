
import { publicApi } from "./publicApi";

export async function sendContact(data) {
    const response = await publicApi.post('/contact', data);
    return response.data;
    
}