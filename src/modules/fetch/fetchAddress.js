import { instance } from "../axios";

const findAllAddress = async () => {
    try {
        console.log('Sending request to /addresses')
        const response = await instance.get("/addresses");
        console.log('response received: ', response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching address data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const findOneAddress = async (id) => {  
    try {
        console.log('Finding Address id ...')
        const response = await instance.get(`/addresses/${id}`);
        console.log('Data Found: ', response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching address data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const createAddress = async (data) => {
    try {
        console.log('Sending request to /addresses')
        console.log(data, "<<<<DATA")
        const response = await instance.post("/addresses", data);
        console.log('response received: ', response.data)
        return response.data;
    } catch (error) {   
        console.error("Error creating address:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const updateAddress = async (id, data) => {
    try {
        console.log('Sending request to /addresses')
        const response = await instance.put(`/addresses/${id}`, data);
        console.log('response received: Address Updated ', response.data)
        return response.data;
    } catch (error) {
        console.error("Error updating address:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const destroyAddress = async (id) => {
    try {
        const response = await instance.delete(`/addresses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting address:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

export { findAllAddress, findOneAddress, createAddress, updateAddress, destroyAddress };
