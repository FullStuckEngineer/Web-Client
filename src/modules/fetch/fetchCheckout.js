import axios from "axios";

const findAll = async () => {
    try {
        const response = await axios.get("/checkouts");
        return response.data;
    } catch (error) {
        console.error("Error fetching checkout data:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

const findOne = async (id) => {
    try {
        const response = await axios.get(`/checkouts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching checkout data:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

const create = async (data) => {
    try {
        const response = await axios.post("/checkouts", data);
        return response.data;
    } catch (error) {
        console.error("Error creating checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const pay = async (id) => {
    try {
        //Not done yet
        const response = await axios.post(`/checkouts/${id}/pay`);
        return response.data;
    } catch (error) {
        console.error("Error paying checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const update = async (id, data) => {
    try {
        const response = await axios.put(`/checkouts/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export { findAll, findOne, create, pay, update}