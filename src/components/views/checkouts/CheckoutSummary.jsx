import React, { useState } from "react";
import Button from "@/components/ui/Button";
import PaymentModal from "@/components/views/checkouts/PaymentModal";

export default function CheckoutSummary({ totalCost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex fixed lg:flex-col flex-row gap-5 items-start h-auto lg:bottom-auto bottom-0 lg:right-24 right-0 bg-color-primary lg:shadow-md shadow-inner w-full lg:w-1/4 px-6 pt-8 pb-10 rounded-lg">
      <h2 className="font-semibold lg:text-lg text-xl">Ringkasan belanja</h2>
      <div className="flex flex-col lg:w-full w-1/2 gap-4">
        <div className="flex flex-col gap-1 text-[0.9rem]">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-color-gray-500">Total Harga </h3>
            <span className="font-normal text-color-dark truncate">
              ${totalCost}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-color-gray-500">Total Ongkos Kirim </h3>
            <span className="font-normal text-color-dark truncate">
              ${totalCost}
            </span>
          </div>
        </div>
        <hr className="text-color-gray-200 my-2" />
        <h3 className="flex flex-row items-center justify-between">
          Total Belanja
          <span className="font-semibold truncate">${totalCost}</span>
        </h3>
        <hr className="text-color-gray-200 my-2" />
        <Button
          className="w-full bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-8"
          onClick={openModal}
        >
          Pilih Pembayaran
        </Button>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        totalCost={totalCost}
      />
    </div>
  );
}
