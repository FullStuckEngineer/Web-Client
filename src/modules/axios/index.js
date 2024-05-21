import axios from "axios";

const baseURL = 'http://localhost:8000/v1/api';
const instance = axios.create({ baseURL })

// add interceptor to automatically add token
instance.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { instance }
