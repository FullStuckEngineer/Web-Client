import instance  from "@/libs/axios/axiosInstance";

const findAll = async () => {
  try {
    const response = await instance.get("/categories");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
const findAllCategories = async () => {
  try {
    console.log('fetching categories data:')
    const response = await instance.get("/categories/all-categories");
    console.log("fetching categories response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const findOne = async (id) => {
  try {
    const response = await instance.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { findAll, findOne, findAllCategories };
