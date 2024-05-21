import { instance } from "../axios";

const findAll = async () => {
    try {
        const response = await instance.get("/cities");
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const findOne = async (id) => {
    try {
        const response = await instance.get(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const create = async (data) => {
    try {
        const response = await instance.post("/cities", data);
        return response.data;
    } catch (error) {   
        console.error("Error creating city:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const update = async (id, data) => {
    try {
        const response = await instance.put(`/cities/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating city:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const destroy = async (id) => {
    try {
        const response = await instance.delete(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting city:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

export { findAll, findOne, create, update, destroy };
