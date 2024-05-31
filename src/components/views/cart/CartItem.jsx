import React from "react";
import Button from "@/components/ui/Button";
import { City, Minus, Trash } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export default function CartItem({
  shopItems,
  getProductName,
  handleRemoveItem,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  formatCurrency,
  formatWeight,
}) {
  return (
    <>
      <ul>
        {shopItems.map((item) => (
          <li
            key={item.id}
            className=" shadow-md p-4 mb-5 mt-5 w-1/2 bg-color-primary md:px-10 px-3 py-5 rounded-lg"
          >
            <p className="font-semibold text-lg">Nama Produk</p>
            <label>{getProductName(item.product_id)}</label>
            <p className="font-semibold text-lg">Item Quantity</p>
            <label>{item.quantity}</label>
            <p className="font-semibold text-lg">Item Price</p>
            <label>{formatCurrency(item.price)}</label>
            <p className="font-semibold text-lg">Item weight</p>
            <label>{formatWeight(item.weight)}</label>
            <div className="flex justify-end gap-2">
              <button
                className="hover:text-color-red"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash size={32} />
              </button>
              <div className="flex w-auto font-medium items-center rounded hover:bg-color-accent">
                <button onClick={() => handleIncreaseQuantity(item.product_id)}>
                  <Plus size={32} />
                </button>
              </div>
              <div className="flex w-auto p-1 font-medium text-xl items-center">
                <p>{item.quantity}</p>
              </div>
              <div className="flex w-auto font-medium items-center rounded hover:bg-color-red">
                <button onClick={() => handleDecreaseQuantity(item.product_id)}>
                  <Minus size={32} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
