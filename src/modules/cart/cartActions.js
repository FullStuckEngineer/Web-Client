import axios from "axios";

export const addToCart = async (productId, quantity) => {
  try {
    await axios.post(`http://localhost:8000/v1/api/carts/${id}`, {
      productId,
      quantity,
    });
  } catch (error) {
    throw new Error("Failed to add to cart");
  }
};

export const buyNow = async (productId, quantity) => {
  try {
    await axios.post("http://localhost:8000/v1/api/checkouts", {
      productId,
      quantity,
    });
  } catch (error) {
    throw new Error("Failed to proceed to checkout");
  }
};
