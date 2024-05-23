import  instance  from "@/libs/axios/axiosInstance";

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

export { getUser, updateUser };
