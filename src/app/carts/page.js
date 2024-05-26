"use client";

import CartsView from "@/components/views/cart";
import React, { useEffect, useState } from "react";
import { findOne } from "@/modules/fetch/fetchCart";
import { getUser } from "@/modules/fetch/fetchUser";
import { jwtDecode } from "jwt-decode";
import { findAllProduct } from "@/modules/fetch/fetchProduct";

const CartsPage = () => {
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState(null);
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const getUserId = decodedToken.id;

        try {
          const userData = await getUser(getUserId);
          console.log("User Data from CART:", userData);
          setUserId(userData.id);
        } catch (err) {
          console.error(err.message);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      if (userId) {
        try {
          const cartData = await findOne(userId);
          const productData = await findAllProduct()
          // console.log("Cart Data:", cartData);
          // console.log("Product Data:", productData);
          setCart(cartData);
          setProduct(productData)
        } catch (err) {
          console.error("ERROR USER ID NOT FOUND", err.message);
        }
      }
    };

    fetchCartData();
  }, [userId]);


  return (
    <div>
      <CartsView data={cart} dataProduct={product} />
    </div>
  );
};

export default CartsPage;
