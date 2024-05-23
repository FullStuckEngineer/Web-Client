import { instance } from "@/libs/axios/instance";

const findAll = async () => {
    try {
        const response = await instance.get("/cities");
        return response.data;
    } catch (error) {
        console.error("Error fetching category data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const findOne = async (id) => {
    try {
        const response = await instance.get(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export { findAll, findOne}