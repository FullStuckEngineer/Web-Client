"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Heart, ShareNetwork, ShoppingCart, Star } from "@phosphor-icons/react";
// import { addToCart, buyNow } from "@/modules/cart/cartActions";
import { updateCart, findOneCart } from "@/modules/fetch/fetchCart";
import { getUser } from "@/modules/fetch/fetchUser";
import { findOneProduct } from "@/modules/fetch/fetchProduct";
import { jwtDecode } from "jwt-decode";

const ProductView = ({ slug }) => {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const fetchProduct = async () => {
      try {
        const productData = await findOneProduct(slug);
        const cartData = await findOneCart(userId);
        setCart(cartData?.data);
        setProduct(productData.data);
      } catch (error) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleWishlistClick = () => {
    console.log("Added to wishlist");
  };

  const handleShareClick = () => {
    console.log("Shared product");
  };

  const handleAddToCart = async () => {
    try {
      // Clone the existing shopping items to avoid mutating the original state
      let updatedItems = [...(cart?.shopping_items || [])];
      // Check if the product is already in the cart
      const productIndex = updatedItems.findIndex(
        (item) => item.product_id === product.id
      );

      if (productIndex > -1) {
        // If product exists, increment the quantity
        updatedItems[productIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add a new product to the shopping items
        updatedItems.push({
          product_id: product.id,
          quantity: quantity,
        });
      }

      // Update the cart with the new shopping items
      const newCart = await updateCart(cart.id, {
        address_id: cart.address_id,
        courier_id: cart.courier_id,
        shipping_method: cart.shipping_method,
        shopping_items: updatedItems,
      });

      setCart(newCart);
      console.log("Added to cart");
      alert(`Product ${product.name} Added to cart`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleBuyNow = async () => {
    if (product) {
      try {
        await buyNow(product.id, quantity);
        console.log("Proceeding to checkout");
      } catch (error) {
        console.error("Error proceeding to checkout:", error);
      }
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <header className="flex justify-center w-full md:py-10 py-8 md:px-10 px-6 ">
      <div className="px-4 pt-4 pb-5 flex lg:flex-row flex-col justify-center md:gap-16 gap-6 w-full bg-color-primary border border-color-gray-200 shadow-md rounded-md">
        <Image
          width={500}
          height={500}
          className="md:rounded-l-md rounded-t-md"
          src={product.photo || "/placeholder.jpg"}
          alt={product.name}
        />
        <div className="flex flex-col justify-between py-0 md:py-10 md:pr-14 pr-0">
          <div className="flex flex-col md:gap-4 gap-3">
            <h1 className="md:text-3xl text-2xl font-bold">{product.name}</h1>
            <p className="text-justify text-sm">{product.description}</p>
            <div className="flex justify-start items-center gap-1">
              <div className="flex flex-row">
                <Star size={25} weight="fill" className="text-color-gold w-4" />
              </div>
              <p className="text-sm">4.5</p>
              <p className="text-sm text-color-gray-500">(7 review)</p>
            </div>
            <div className="flex justify-start gap-3">
              <Button
                className="border rounded-md border-color-gray-300 text-color-gray-300 flex justify-center items-center font-semibold p-2"
                onClick={handleWishlistClick}
              >
                <Heart size={20} weight="fill" />
              </Button>
              <Button
                className="border rounded-md border-color-gray-300 text-color-gray-300 flex justify-center items-center font-semibold p-2"
                onClick={handleShareClick}
              >
                <ShareNetwork size={20} weight="fill" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="md:text-3xl text-2xl font-bold pt-6">
              Rp. {product.price}
            </p>
            <div className="flex justify-between items-center gap-5">
              Kuantitas
              <div className="flex flex-row relative items-end justify-end ">
                <Button
                  className="w-7 h-7 absolute bottom-1 start-1 rounded-md bg-color-primary hover:bg-color-gray-200 hover:text-color-green"
                  onClick={handleDecrease}
                >
                  -
                </Button>
                <input
                  className="w-24 h-9 py-2 pl-4 border border-color-gray-300 focus:outline-none focus:border-color-green text-center rounded-lg text-color-dark"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <Button
                  className="w-7 h-7 absolute bottom-1 end-1 rounded-md bg-color-primary hover:bg-color-gray-200 hover:text-color-green"
                  onClick={handleIncrease}
                >
                  +
                </Button>
              </div>
              <p className="flex flex-row gap-3 items-end md:text-3xl text-2xl font-bold">
                <span className="text-lg font-medium">Total</span> Rp.{" "}
                {product.price * quantity}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center md:gap-5 gap-3 pt-5">
            <Button
              className="py-2 px-4 h-11 w-full bg-color-green hover:bg-color-greenhover text-color-primary font-semibold rounded-md"
              onClick={handleAddToCart}
            >
              + Keranjang
            </Button>
            <Button
              className="py-2 px-4 w-full h-11 bg-color-primary border-color-green border hover:border-color-greenhover text-color-green hover:text-color-greenhover font-semibold rounded-md"
              onClick={handleBuyNow}
            >
              Beli Langsung
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProductView;
