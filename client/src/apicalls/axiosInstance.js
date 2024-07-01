import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
