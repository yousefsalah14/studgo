import axios from "axios";

export const BaseUrl = "https://studgo-hweme6ccepbvd6hs.canadacentral-01.azurewebsites.net";

export const axiosInstance = () => {
    // Get the token from localStorage
    const token = localStorage.getItem('accessToken');
    
    return axios.create({
        // Use a relative URL that will be proxied
        baseURL: `${BaseUrl}/api`,
        // Removing withCredentials for this API as it's causing CORS issues
        // withCredentials: true,
        headers: token ? { 
            'Authorization': token,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
        },
    });
};
