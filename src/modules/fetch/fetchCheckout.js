import  instance  from "@/libs/axios/instance";

const findAllCheckout = async () => {
    try {
        const response = await instance.get("/checkouts");
        return response.data;
    } catch (error) {
        console.error("Error fetching checkout data:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

const findOneCheckout = async (id) => {
    try {
        const response = await instance.get(`/checkouts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching checkout data:", error.response ? error.response.data : error.message);
        throw error;
    }
};  

const createCheckout = async (data) => {
    try {
        const response = await instance.post("/checkouts", data);
        return response.data;
    } catch (error) {
        console.error("Error creating checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const pay = async (id) => {
    try {
        //Not done yet
        const response = await instance.post(`/checkouts/${id}/pay`);
        return response.data;
    } catch (error) {
        console.error("Error paying checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const updateCheckout = async (id, data) => {
    try {
        const response = await instance.put(`/checkouts/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating checkout:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export { findAllCheckout, findOneCheckout, createCheckout, pay, updateCheckout };
