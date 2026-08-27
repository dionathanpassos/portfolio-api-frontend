

import { publicApi } from "./publicApi";

export async function login(data) {
    const response = await publicApi.post('/auth/login', data);
    return response.data;
    
}

