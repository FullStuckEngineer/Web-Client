import  instance  from "@/libs/axios/axiosInstance";

const findAll = async () => {
  try {
           console.log("Sending request to /stores");

    const response = await instance.get(`/stores`);
        console.log("response stores received: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching store data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const findOne = async () => {
  try {
           console.log(`Sending request to /stores/${id}`);
    const response = await instance.get(`/stores/${id}`);
        console.log("response stores/:id received: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching store data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { findAll, findOne };
