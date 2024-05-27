import  instance  from "@/libs/axios/axiosInstance";

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

export { findAllCourier, findOneCourier };
