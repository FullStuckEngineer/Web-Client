"use client";

import CardProduct from "@/components/ui/CardProduct/index";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { useEffect, useState } from "react";

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
    <div >
      <h1 className="pt-52">Welcome to the Home Page</h1>
      {error && <p>Error: {error}</p>}
      <CardProduct products={products}/>
    </div>
  );
}

export default HomePage
