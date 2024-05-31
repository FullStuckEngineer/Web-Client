import  instance  from "@/libs/axios/axiosInstance";

const findAll = async () => {
    try {
        const response = await instance.get("/checkouts");
        return response.data;
    } catch (error) {
        console.error("Error fetching checkout data:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

const findOne = async (id) => {
    try {
        const response = await instance.get(`/checkouts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching checkout data:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

const create = async (data) => {
    try {
        const response = await instance.post("/checkouts", data);
        return response.data;
    } catch (error) {
        console.error("Error creating checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const payMidtrans = async (params) => {
    try {
     
        const {id, bank} = params
        const response = await instance.post(`/checkouts/pay/${id}`,{bank});
        return response.data;
    } catch (error) {
        console.error("Error paying checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};
const payManual = async (params) => {
    const {body, id} = params
    try {
        const response = await instance.post(`/checkouts/uplouds/${id}`, {body});
        return response.data;
    } catch (error) {
        console.error("Error paying checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const update = async (id, data) => {
    try {
        const response = await instance.put(`/checkouts/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export { findAll, findOne, create, payMidtrans,payManual, update };
