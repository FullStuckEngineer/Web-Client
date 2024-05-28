import instance from "@/libs/axios/axiosInstance";

const findCities = async (search, limit = 5) => {
  try {
    console.log('Sending request to /cities with limit')
    const response = await instance.get(`/cities?search=${search}&limit=${limit}`);
    console.log('Response received: ', response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching city data:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const findAllCities = async () => {
  try {
    console.log('Sending request to /cities ')
    const response = await instance.get(`/cities`);
    console.log('response received: ', response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching city data:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const findOneCity = async (id) => {
  try {
    const response = await instance.get(`/cities/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching city data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};



export { findCities, findAllCities, findOneCity };

// const findWithLimit = async (search) => {
//   try {
//       console.log('Sending request to /cities with limit')
//       const response = await instance.get(`/cities/limit/?search=${search}&limit=5`);
//       console.log('response received: ', response.data)
//       return response.data;
//   } catch (error) {
//       console.error("Error fetching city data:", error.response ? error.response.data : error.message);
//       throw error;
//   }
// };