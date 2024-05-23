import { instance } from "@/libs/axios/instance";

const findAll = async () => {
    try {
        const response = await instance.get(`/stores`);
        return response.data;
    } catch (error) {
        console.error('Error fetching store data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const findOne = async () => {
    try {
        const response = await instance.get(`/stores/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching store data:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export { findAll, findOne };
