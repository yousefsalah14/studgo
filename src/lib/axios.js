import axios from "axios";

export const BaseUrl = "https://studgo-hweme6ccepbvd6hs.canadacentral-01.azurewebsites.net";
export const ChatBaseUrl = "http://localhost:8000";

export const axiosInstance = () => {
    // Get the token from localStorage
    const token = localStorage.getItem('accessToken');
    
    return axios.create({
        // Use a relative URL that will be proxied
        baseURL: "https://studgo-hweme6ccepbvd6hs.canadacentral-01.azurewebsites.net/api",
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

export const chatAxiosInstance = () => {
    // Get the token from localStorage
    const token = localStorage.getItem('accessToken');
    
    return axios.create({
        baseURL: ChatBaseUrl,
        headers: token ? { 
            'Authorization': token,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
        },
    });
};
