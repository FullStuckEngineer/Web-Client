"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import { findOneProduct } from "@/modules/fetch/fetchProduct";
import { updateCart } from "@/modules/fetch/fetchCart";

const CardProduct = ({ products, cartData }) => {
  const [lovedProducts, setLovedProducts] = useState({});
  const [cart, setCart] = useState(cartData);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setCart(cartData);
  }, [cartData]);

  const handleLoveClick = (productId) => {
    setLovedProducts((prevLovedProducts) => ({
      ...prevLovedProducts,
      [productId]: !prevLovedProducts[productId],
    }));
  };

  const handleAddToCart = async (productId) => {
    try {
      let updatedItems = [...(cart?.shopping_items || [])];
      const productIndex = updatedItems.findIndex(
        (item) => item.product_id === productId
      );

      if (productIndex > -1) {
        updatedItems[productIndex].quantity += quantity;
      } else {
        updatedItems.push({
          product_id: productId,
          quantity: quantity,
        });
      }

      const newCart = await updateCart(cart?.id, {
        address_id: cart?.address_id,
        courier_id: cart?.courier_id,
        shipping_method: cart?.shipping_method,
        shopping_items: updatedItems,
      });

      setCart(newCart);
      console.log("Added to cart");
      alert(`Product Added to cart`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };


  return (
    <div className="grid lg:grid-cols-1 ">
      <div className="w-full flex flex-wrap md:flex-row flex-col gap-4">
        {products?.data?.products.length > 0 &&
          products?.data.products.map((product) => (
            <div
              key={product.id}
              className="md:w-[24%] w-full bg-color-secondary border border-color-gray-200 rounded-lg shadow-md flex flex-col justify-between p-5"
            >
              <Link href={`/products/${product.slug}`}>
                <img
                  src={product.photo || "/placeholder.jpg"}
                  className="rounded-t-md h-72 w-full object-cover"
                  alt={product.name}
                  loading="lazy"
                />
                <div className="pt-5 pb-5 w-full">
                  <h5 className="text-xl font-semibold tracking-tight text-white">
                    {product.name}
                  </h5>
                  <p className="text-sm text-white w-full line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col pb-5">
                <h5 className="text-xl font-bold text-white">
                  Rp. <span>{product.price}</span>
                </h5>
                <div className="flex justify-end gap-4">
                  <Button
                    className={`flex ${
                      lovedProducts[product.id]
                        ? "text-color-red"
                        : "text-color-gray-300"
                    } border border-color-gray-300 justify-center items-center text-color-gray-200 bg-color-primary gap-2 py-2 px-2 rounded-lg`}
                    onClick={() => handleLoveClick(product.id)}
                  >
                    <Heart size={25} weight="fill" />
                  </Button>
                  <Button
                    className="flex bg-color-green hover:bg-color-greenhover justify-center items-center text-color-primary gap-2 py-2 px-2 rounded-lg"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart size={25} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardProduct;
