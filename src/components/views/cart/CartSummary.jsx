import React, { useState } from "react";
import Button from "@/components/ui/Button";
import PaymentModal from "@/components/views/checkouts/PaymentModal"; // Adjust the import based on your folder structure
import Link from "next/link";

export default function CheckoutSummary({
  netPrice,
  shipingCost,
  shipingMethod,
  totalCost,
  totalWeight,
  formatCurrency,
  formatWeight,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex fixed lg:flex-col flex-row gap-5 items-start h-auto lg:bottom-auto bottom-0 lg:right-24 right-0 bg-color-primary lg:shadow-md shadow-inner w-full lg:w-1/4 px-6 pt-8 pb-10 rounded-lg">
      <h2 className="font-semibold lg:text-lg text-xl">Ringkasan belanja</h2>
      <div className="flex flex-col lg:w-full w-1/2 gap-4">
        <h3 className="flex flex-row items-center justify-between">
          Total Harga
          <span className="font-semibold">{formatCurrency(netPrice)}</span>
        </h3>
        <h3 className="flex flex-row items-center justify-between">
          Total Berat
          <span className="font-semibold">{formatWeight(totalWeight)}</span>
        </h3>
        <h3 className="flex flex-row items-center justify-between">
          Pengiriman
          <span className="font-semibold">{shipingMethod}</span>
        </h3>
        <h3 className="flex flex-row items-center justify-between">
          Total Ongkos Kirim
          <span className="font-semibold">{formatCurrency(shipingCost)}</span>
        </h3>
        <h3 className="flex flex-row items-center justify-between">
          Total
          <span className="font-semibold">{formatCurrency(totalCost)}</span>
        </h3>
        <hr className="text-color-gray-200 my-2" />
        <div className="w-full">
          <Link href="/checkouts" className="w-full p-2">
            <Button className="w-full bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-8">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
