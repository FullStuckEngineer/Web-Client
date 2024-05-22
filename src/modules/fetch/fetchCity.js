import { instance } from "../axios";

const findAllCity = async (search) => {
    try {
        console.log('Sending request to /cities')
        const response = await instance.get(`/cities?search=${search}&limit=5`);
        console.log('response received: ', response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const findOneCity = async (id) => {
    try {
        const response = await instance.get(`/cities/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

export { findAllCity, findOneCity};