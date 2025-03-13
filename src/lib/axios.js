import axios from "axios";

export const axiosInstance = (token = null) => {
    return axios.create({
        baseURL: "https://studgov2.runasp.net/api",
        withCredentials: true,
        headers: token ? { Authorization: `bearer ${token}` } : {},
    });
};
