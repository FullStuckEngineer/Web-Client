import instance from "@/libs/axios/axiosInstance";

const findAllProduct = async () => {
  try {
    console.log("Sending request to /products");
    const response = await instance.get("/products");
    console.log("response received: ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const findOneProduct = async (slug) => {
  try {
    console.log(`Sending request to /products/${slug}`);
    const response = await instance.get(`/products/${slug}`);
    console.log("response received: ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { findAllProduct, findOneProduct };
