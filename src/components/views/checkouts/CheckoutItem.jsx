import CartData from "@/components/views/cart/CartData";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import React, { useEffect, useState } from "react";

export default function CheckoutItem({ getProductName, cartData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await findAllProduct();
        const productMap = {};
        data.data.products.forEach((product) => {
          productMap[product.id] = product.stock;
        });
        setProducts(data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getProductDetails = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product : { name: "Product Not Found", photo: "" };
  };

  return (
    <>
      {cartData?.shopping_items?.map((item) => {
        const productDetails = getProductDetails(item.product_id);
        return (
          <div
            key={item.id}
            className="flex justify-between md:flex-row flex-col gap-2 md:px-10 px-3 md:py-10 py-4 bg-color-primary shadow-md w-full rounded-lg"
          >
            <div className="flex flex-row gap-2">
              <div className="flex items-center gap-3 w-full">
                <img
                  src={productDetails.photo}
                  alt={item.id}
                  className="border md:w-[100px] w-[60px]"
                />
                <div className="w-full">
                  <div className="font-medium text-lg w-48 line-clamp-2">
                    {productDetails.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end md:gap-5 gap-2">
              <h4 className="text-xl font-bold">
                {formatCurrency(item.price)}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
}
