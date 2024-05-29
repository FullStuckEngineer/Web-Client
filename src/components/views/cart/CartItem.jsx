import React from "react";
import Button from "@/components/ui/Button";
import { Trash } from "@phosphor-icons/react";

export default function CartItem({ shopItems, getProductName, handleRemoveItem }) {
  return (
    <>
      {shopItems?.map((item) => {
        <div
          key={item.id}
          className="flex justify-between md:flex-row flex-col gap-2 md:px-10 px-3 md:py-10 py-4 bg-color-primary shadow-md w-full rounded-lg"
        >
          <div className="flex flex-row gap-2">
            <input
              className="custom-checkbox"
              type="checkbox"
              checked={selectedItems.includes(getProductName(item.product_id))}
              onChange={(e) =>
                handleSelectItem(e, getProductName(item.product_id))
              }
            />
            <div className="flex items-center gap-3 w-full">
              <img
                src={item.image}
                alt={getProductName(item.product_id)}
                className="border md:w-[100px] w-[60px]"
              />
              <div className="w-full">
                <div className="font-normal text-lg w-48 line-clamp-2">
                  {getProductName(item.product_id)}
                </div>
                <span className="font-normal text-[12px] text-color-green border px-1 rounded-sm border-color-green">
                  Bebas pengembalian
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end md:gap-5 gap-2">
            <h4 className="text-xl font-bold">Rp. {item.price}</h4>
            <h4 className="text-md font-medium">
              <span className="text-md font-normal">Berat barang</span>
              {item.weight}
            </h4>
            <div className="flex flex-row gap-3">
              <Button
                className="text-color-gray hover:text-color-red"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash size={20} />
              </Button>
              <div className="flex flex-row relative items-center justify-center ">
                <Button
                  className="w-7 h-7 absolute start-0 rounded-md hover:text-color-green"
                  onClick={() => handleDecreaseQuantity(item.product_id)}
                >
                  -
                </Button>
                <input
                  className="border border-color-gray focus:outline-none focus:border-color-green text-center w-20 h-7 py-2 px-6 rounded-lg text-color-dark"
                  value={item.quantity}
                  onChange={(e) => setQuantity(item, parseInt(e.target.value))}
                />
                <Button
                  className="w-7 h-7 absolute end-0 rounded-md hover:text-color-green"
                  onClick={() => handleIncreaseQuantity(item.product_id)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>;
      })}
    </>
  );
}
