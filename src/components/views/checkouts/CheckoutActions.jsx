import Button from "@/components/ui/Button";
import React from "react";

export default function CheckoutActions() {
  return (
    <div className="flex flex-row bg-color-primary md:px-10 px-3 py-5 rounded-lg w-full justify-between items-center shadow-md">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-xl font-semibold text-color-gray-700">
          Alamat Pengiriman
        </h2>
        <h3 className="font-semibold">
          <span>Rumah</span> - Albet Surya Kembara
        </h3>
        <p className="text-sm">
          Jalan Abcd No. 123 Maju Mundur, Maju Jaya, Surabaya
        </p>
        <div>
          <Button className="bg-color-gray-100 text-color-gray-700 border border-color-gray-700 hover:border-color-gray-400 hover:text-color-gray-500 px-2 w-full text-sm font-medium rounded-md">
            Ganti alamat
          </Button>
        </div>
      </div>
    </div>
  );
}
