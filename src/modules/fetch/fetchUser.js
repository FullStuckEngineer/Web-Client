import { instance } from "@/libs/axios/instance";

const getUser = async () => {
  try {
    const response = await instance.get(`/users`);
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
    const response = await instance.put(`/users`, userData);
    console.log("Data Updated")
    return response.data
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const uploadImage = async (formData) => {
  try {
    const response = await instance.post("/users/uploads", formData);
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
    console.error("Error deleting image:", error.response ? error.response.data : error.message);
    throw error;
  }
}

export { getUser, updateUser, uploadImage, deleteImage };
