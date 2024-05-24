import React, { useState } from "react";
import Button from "@/components/ui/Button";
import PaymentModal from "@/components/views/checkouts/PaymentModal"; // Adjust the import based on your folder structure

export default function CheckoutSummary({ totalCost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex fixed lg:flex-col flex-row gap-5 items-start h-auto lg:bottom-auto bottom-0 lg:right-24 right-0 bg-color-primary lg:shadow-md shadow-inner w-full lg:w-1/4 px-6 pt-8 pb-10 rounded-lg">
      <h2 className="font-semibold lg:text-lg text-xl">Ringkasan belanja</h2>
      <div className="flex flex-col lg:w-full w-1/2 gap-4">
        <h3 className="flex flex-row items-center justify-between">
          Total
          <span className="font-semibold truncate">${totalCost}</span>
        </h3>
        <hr className="text-color-gray-200 my-2" />
        <Button className="w-full bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-8">
          Checkout
        </Button>
      </div>
    </div>
  );
}
