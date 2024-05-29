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
      name: "Sepatu Kelinci",
      cost: 90000,
      image:
        "https://i.pinimg.com/564x/38/76/44/38764450a8fbcb2780e8e476c74a3166.jpg",
      quantity: 10,
    },
    {
      category: "asdasd",
      name: "Sepatu Hijau",
      cost: 90000,
      image:
        "https://i.pinimg.com/564x/f8/aa/d0/f8aad094d464c662b1a798a4517b3b41.jpg",
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
