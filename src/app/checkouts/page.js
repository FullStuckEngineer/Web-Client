"use client"

import CheckoutView from "@/components/views/checkouts";
import React, { useEffect, useState } from "react";
import { findOneCart } from "@/modules/fetch/fetchCart";
import { getUser } from "@/modules/fetch/fetchUser";
import { jwtDecode } from "jwt-decode";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { findAllCities } from "@/modules/fetch/fetchCity";
import { findAllAddress } from "@/modules/fetch/fetchAddress";
import { findAllCourier } from "@/modules/fetch/fetchCourier";

const CheckoutPage = () => {
  const [userId, setUserId] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [cities, setCities] = useState(null);
  const [courier, setCourier] = useState(null);
  const [cart, setCart] = useState(null);
  const [shopItems, setShopItems] = useState(null);
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
          const cartData = await findOneCart(userId);
          const productData = await findAllProduct()
          const addressData = await findAllAddress()
          const cityData = await findAllCities();
          const courierData = await findAllCourier();
          setCourier(courierData?.data.couriers)
          setCities(cityData)
          setAddressId(addressData)
          setCart(cartData?.data);
          setShopItems(cartData?.data.shopping_items);
          setProduct(productData?.data.products)
        } catch (err) {
          console.error("ERROR USER ID NOT FOUND", err.message);
        }
      }
    };
    fetchCartData();
  }, [userId]);

  return (
    <div>
      <CheckoutView cart={cart}
        shopItems={shopItems}
        dataProduct={product}
        addressData={addressId}
        citiesData={cities}
        courierData={courier} />
    </div>
  );
};

export default CheckoutPage;
