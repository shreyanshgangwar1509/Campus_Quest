// src/utils/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: "http:/localhost:3000/api/auth", // Set your API base URL here
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
    return config
},
    async function (error) {
        const originalreuest = error.config;

        if (error.response.status === 403 && !originalreuest._retry) {
            originalreuest._retry = true;
            try {
                await generaterefereshtoken();
                return api(originalreuest);
            } catch (error) {
                console.error("token referesh failed : ", error);
            }
        }
        return Promise.reject(error);
    }
);

export const generaterefereshtoken = async () => {
    try {
        await api.get(`/generate-token`, {
            withCredentials:true,
        })
    } catch (error) {
        console.log(error);
        
    }
}


