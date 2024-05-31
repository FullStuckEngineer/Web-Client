import instance from "@/libs/axios/axiosInstance";
import { Cormorant_Unicase } from "next/font/google";

const findAllCourier = async () => {
  try {
    const response = await instance.get("/couriers");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching courier data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const findOneCourier = async (id) => {
  try {
    const response = await instance.get(`/couriers/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching courier data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getShippingMethod = async (courierId) => {
  try {
    console.log("Sending request to /shipping-methods with id", courierId);
    const response = await instance.get(`/couriers/shipping-methods/${courierId}`);
    console.log("response received from getShippingMethod: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching courier data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { findAllCourier, findOneCourier, getShippingMethod };
