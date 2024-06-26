"use client";

import { useEffect, useState } from "react";
import CardProduct from "@/components/ui/CardProduct";
import CardCategory from "@/components/ui/CardCategory";
import ReviewCard from "@/components/ui/ReviewCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { CaretRight } from "@phosphor-icons/react";
import Hero from "@/components/layouts/Hero";
import Head from "next/head";
import { findOneCart } from "@/modules/fetch/fetchCart";
import { getUser } from "@/modules/fetch/fetchUser";
import {jwtDecode} from "jwt-decode";
import photoReview1 from "@/assets/images/photo-review-1.jpeg";
import photoReview2 from "@/assets/images/photo-review-2.jpeg";
import photoReview3 from "@/assets/images/photo-review-3.jpeg";
import photoReview4 from "@/assets/images/photo-review-4.jpeg";
import photoReview5 from "@/assets/images/photo-review-5.jpeg";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const listProducts = await findAllProduct();
        setProducts(listProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const getUserId = decodedToken.id;
        try {
          const userData = await getUser(getUserId);
          setUserId(userData.id);
        } catch (err) {
          console.error(err.message);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchCartData = async () => {
        try {
          const cartData = await findOneCart(userId);
          setCart(cartData?.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchCartData();
    }
  }, [userId]);

  return (
    <div className="flex flex-col md:px-24 px-10 py-[5.5rem]">
      <Head>
        <title>BabyBoo</title>
      </Head>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Hero />
          <div className="bg-color-secondary flex flex-col gap-5 border rounded-md border-color-gray-300 shadow-md mb-8 mt-14 px-5 pt-6 pb-10">
            <div className="flex flex-col justify-center items-start text-color-gray-700">
              <h3 className="text-xl font-semibold text-color-dark">
                Kategori Pilihan
              </h3>
            </div>
            <div className="flex flex-row justify-between">
              <CardCategory />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start mb-4 mt-4 text-color-gray-700">
            <h3 className="text-xl font-semibold text-color-dark">
              Rekomendasi untukmu
            </h3>
          </div>
          <div className="flex flex-row justify-evenly mb-4">
            <CardProduct products={products} cartData={cart} />
          </div>
          <hr className="my-12 text-color-gray-300" />
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row w-full justify-between items-center md:mb-6 text-color-gray-700">
              <h3 className="md:text-2xl text-xl font-semibold text-color-dark">
                Review with Love
              </h3>
              <CaretRight
                size={24}
                className="text-color-dark w-7 h-7 p-1 border border-color-gray-400 bg-color-primary hover:bg-color-gray-300 rounded-full"
              />
            </div>
            <div className="md:hidden flex justify-end items-center w-full mt-4"></div>
            <div className="flex flex-row justify-start w-screen gap-4">
              <ReviewCard photoReview={photoReview1} />
              <ReviewCard photoReview={photoReview2} />
              <ReviewCard photoReview={photoReview3} />
              <ReviewCard photoReview={photoReview4} />
              <ReviewCard photoReview={photoReview5} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
