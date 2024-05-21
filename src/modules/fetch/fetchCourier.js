import { instance } from "../axios";

const findAll = async () => {
    try {
        const response = await instance.get("/couriers");
        return response.data;
    } catch (error) {
        console.error("Error fetching courier data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const findOne = async (id) => {
    try {
        const response = await instance.get(`/couriers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching courier data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export { findAll, findOne };