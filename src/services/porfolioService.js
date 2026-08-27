import { publicApi } from "./publicApi";


export async function getPortfilio() {
    const response = await publicApi.get("/public/users/dionathanpassos/portfolio");

    return response;
    
}