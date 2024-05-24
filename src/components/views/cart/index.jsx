"use client";

import React, { useEffect, useState } from "react";
import CartItem from "@/components/views/cart/CartItem";
import CartSummary from "@/components/views/cart/CartSummary";
import CartActions from "@/components/views/cart/CartActions";
import { findAllProduct } from "@/modules/fetch/fetchProduct";

export default function CartsView({ data, dataProduct }) {
  const [shopItems, setShopItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 2;

  console.log(data?.data.shopping_items, "INI DATA CART");
  console.log(dataProduct?.data, "INI DATA PRODUCT");

  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       const { data } = await findAllProduct();
  //       setShopItems(data?.data.shopping_items);
  //       set
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCartData();
  // }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getProductName = (productId) => {
    const product = dataProduct?.data.find((item) => item.id === productId);
    return product ? product.name : "Product Not Found";
  };

  const startPage = (currentPage - 1) * itemsPerPage;
  const selectedShopItems = shopItems.slice(
    startPage,
    startPage + itemsPerPage
  );

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
      <h1 className="md:text-[32px] text-[22px] font-medium mb-6">
        <span className="text-color-green font-bold">BabyBoo </span> Keranjang
        Belanja
      </h1>
      <ul>
        {selectedShopItems.map((item) => (
          <div
            key={item.id}
            className="border border-color-grey-700 shadow-md rounded-lg p-4 mb-5"
          >
            <p>Product ID</p>
            <label>{getProductName(item.product_id)}</label>
            <p>Item Quantity</p>
            <label>{item.quantity}</label>
            <p>Item Price</p>
            <label>{item.price}</label>
            <p>Item weight</p>
            <label>{item.weight}</label>
          </div>
        ))}
      </ul>
    </header>
  );
}

// MAPPING SHOPPING ITEMS
{
  /* <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
<h1 className="md:text-[32px] text-[22px] font-medium mb-6">
  <span className="text-color-green font-bold">BabyBoo </span> Keranjang
  Belanja
</h1>
<ul>
  {data?.data?.shopping_items?.map((item) => (
   <div key={item.id} className="border border-color-grey-700 shadow-md rounded-lg p-4 mb-5">
    <label>{item.product_id}</label>
    <p>Product ID</p>
    <label>{item.quantity}</label>
    <p>Item Quantity</p>
    <label>{item.price}</label>
    <p>Item Price</p>
    <label>{item.weight}</label>
    <p>Item weight</p>
   </div>
  ))}
</ul>
</header> */
}
