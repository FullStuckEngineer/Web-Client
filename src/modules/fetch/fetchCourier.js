import instance from "@/libs/axios/axiosInstance";

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

export { findAllCourier, findOneCourier };
