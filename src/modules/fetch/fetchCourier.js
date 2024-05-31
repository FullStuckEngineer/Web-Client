import instance from "@/libs/axios/axiosInstance";
import { Cormorant_Unicase } from "next/font/google";

const findAllCourier = async () => {
  try {
    console.log("Sending request to /couriers");
    const response = await instance.get("/couriers");
    console.log("response couriers received: ", response.data);
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
    console.log(`Sending request to /couriers/${id}`);
    const response = await instance.get(`/couriers/${id}`);
    console.log("response couriers received: ", response.data);
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
