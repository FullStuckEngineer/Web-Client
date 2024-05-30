import instance  from "@/libs/axios/axiosInstance";

const findAll = async () => {
  try {
    console.log("categories response data :")
    const response = await instance.get("/categories");
    console.log("categories response data :", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching categories data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const findOne = async (id) => {
  try {
    console.log("categories response data :");

    const response = await instance.get(`/categories/${id}`);
    console.log("categories response data :", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { findAll, findOne};
