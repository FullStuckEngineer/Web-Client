"use client";

import { useEffect, useState } from "react";
import CardProduct from "@/components/ui/CardProduct";
import Carousel from "@/components/ui/Carousel";
import CardCategory from "@/components/ui/CardCategory";
import ReviewCard from "@/components/ui/ReviewCard";
import { findAllProduct } from "@/modules/fetch/fetchProduct";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const listProducts = await findAllProduct();
        setProducts(listProducts);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col px-24 py-32">
      <Carousel />
      <div className="flex flex-row gap-4">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
      <div className="flex flex-row gap-4">
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
        <CardCategory />
      </div>
      <div className="flex flex-row gap-4">
        <CardProduct products={products} />
        <CardProduct products={products} />
        <CardProduct products={products} />
        <CardProduct products={products} />
        <CardProduct products={products} />
        <CardProduct products={products} />
      </div>
      <div flex flex-row>
        <div className="flex flex-col justify-center items-center mb-10 text-color-gray-700">
          <h3 className="text-2xl font-semibold text-color-dark">
            Review with Love
          </h3>
          <p className="text-sm">
            <span className="font-medium text-color-dark">+100 customer</span>{" "}
            satisfied with our service
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
