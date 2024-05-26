"use client";

import CheckoutActions from "@/components/views/checkouts/CheckoutActions";
import CheckoutItem from "@/components/views/checkouts/CheckoutItem";
import CheckoutSummary from "@/components/views/checkouts/CheckoutSummary";
import React, { useState } from "react";

export default function CheckoutView({ setCheckout }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const checkout = [
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
    return checkout?.reduce(
      (sum, { cost, quantity }) => sum + cost * quantity,
      0
    );
  };


  return (
    <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
      <h1 className="md:text-[32px] text-[22px] font-medium mb-6">
        <span className="text-color-green font-bold">BabyBoo </span> Pengiriman
      </h1>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
          <CheckoutActions
          />
          {checkout?.map((product, idx) => (
            <CheckoutItem
              key={idx}
              product={product}
            />
          ))}
        </div>

        <CheckoutSummary totalCost={getTotalCost()} />
      </div>
    </header>
  );
}
