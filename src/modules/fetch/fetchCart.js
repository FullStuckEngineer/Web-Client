import instance  from "@/libs/axios/axiosInstance";

const findOneCart = async (data) => {
  try {
    console.log(`Sending request to /carts`, data);
    const response = await instance.get(`/carts`, data);
    console.log("response find one cart received: ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching cart data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getShippingCost = async (data) => {
  try {
    const response = await instance.post(`/carts/shipping-cost`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching shipping cost data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const updateCart = async (id, data) => {
  try {
    const response = await instance.put(`/carts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating cart:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const destroyCart = async (id) => {
  try {
    const response = await instance.delete(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting cart:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { findOneCart, getShippingCost, updateCart, destroyCart };
