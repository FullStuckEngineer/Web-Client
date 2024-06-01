"use client";

import React, { useEffect, useState } from "react";
import CartsView from "@/components/views/cart";
import { findOneCart } from "@/modules/fetch/fetchCart";
import { getUser } from "@/modules/fetch/fetchUser";
import { jwtDecode } from "jwt-decode";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { findCitiesNoLimit } from "@/modules/fetch/fetchCity";
import { findAllAddress } from "@/modules/fetch/fetchAddress";
import { findAllCourier } from "@/modules/fetch/fetchCourier";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Head from "next/head";

const CartsPage = () => {
  const [userId, setUserId] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [cities, setCities] = useState(null);
  const [courier, setCourier] = useState(null);
  const [cart, setCart] = useState(null);
  const [shopItems, setShopItems] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const pageTitle = "Halaman Keranjang - BabyBoo";

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
          const productData = await findAllProduct();
          const addressData = await findAllAddress();
          const cityData = await findCitiesNoLimit();
          const courierData = await findAllCourier();
          setCourier(courierData?.data.couriers);
          setCities(cityData);
          setAddressId(addressData);
          setCart(cartData?.data);
          setShopItems(cartData?.data.shopping_items);
          setProduct(productData?.data.products);
        } catch (err) {
          console.error("ERROR USER ID NOT FOUND", err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCartData();
  }, [userId]);

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CartsView
          cart={cart}
          shopItems={shopItems}
          dataProduct={product}
          addressData={addressId}
          citiesData={cities}
          courierData={courier}
        />
      )}
    </div>
  );
};

export default CartsPage;
