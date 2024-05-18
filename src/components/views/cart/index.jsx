"use client";

import React, { useState } from "react";
import CartItem from "@/components/views/cart/CartItem";
import CartSummary from "@/components/views/cart/CartSummary";
import CartActions from "@/components/views/cart/CartActions";

export default function CartsView({ setCart }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const cart = [
    {
      category: "asd",
      name: "Batre",
      cost: 2.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5-QAul_NfAs-s0XW9M087xWyPOGWvbfYjmqSl0QXabZRSYoid47i7kISiAteyIh0YOci5mtQ&usqp=CAc",
      quantity: 10,
    },
    {
      category: "asdasd",
      name: "Blanket",
      cost: 19.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSpwdYDmUL_ZEqhLV7ZWRdQAU7DGcGaxtCt7SrTlL9umrQs2Un7rj9Nbb9Vq01RtEfA0eAVmdt-&usqp=CAc",
      quantity: 10,
    },
  ];

  const getTotalCost = () => {
    return cart?.reduce((sum, { cost, quantity }) => sum + cost * quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    setSelectedItems([]);
    setSelectAll(false);
  };

  const setQuantity = (product, amount) => {
    if (amount < 1) return;
    const newCart = cart.map((item) =>
      item.name === product.name ? { ...item, quantity: amount } : item
    );
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
    setSelectedItems((prevSelected) =>
      prevSelected.filter((name) => name !== productToRemove.name)
    );
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedItems(cart.map((product) => product.name));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (e, productName) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems((prevSelected) => [...prevSelected, productName]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((name) => name !== productName)
      );
    }
  };

  return (
    <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
      <h1 className="md:text-[32px] text-[22px] font-medium mb-6">
        <span className="text-color-green font-bold">BabyBoo </span> Keranjang
        Belanja
      </h1>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
          <CartActions
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            clearCart={clearCart}
            selectedItems={selectedItems}
          />
          {cart?.map((product, idx) => (
            <CartItem
              key={idx}
              product={product}
              selectedItems={selectedItems}
              handleSelectItem={handleSelectItem}
              removeFromCart={removeFromCart}
              setQuantity={setQuantity}
            />
          ))}
        </div>

        <CartSummary totalCost={getTotalCost()} />
      </div>
    </header>
  );
}
