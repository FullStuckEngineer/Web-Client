import { instance } from "@/libs/axios/instance";

const getUser = async () => {
  try {
    console.log("Sending request to /users");

    const response = await instance.get(`/users`);
    console.log("response users received: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const updateUser = async (userData) => {
  try {
    console.log("Sending request to PUT /users");
    const response = await instance.put(`/users`, userData);
    console.log("response update users received: ", response.data);
    console.log("Data Updated");
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const uploadImage = async (formData) => {
  try {
    console.log("Sending request to /users/uploads");
    const response = await instance.post("/users/uploads", formData);
               console.log("response users/uploads received: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const deleteImage = async (id) => {
  try {
    const response = await instance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting image:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { getUser, updateUser, uploadImage, deleteImage };
