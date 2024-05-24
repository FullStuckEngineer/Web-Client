import Button from "@/components/ui/Button";
import React, { useState } from "react";

export default function PaymentModal({ isOpen, onClose, totalCost }) {
  const [selectedBank, setSelectedBank] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-color-dark bg-opacity-50">
      <div className="bg-color-gray-200 rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-color-primary p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-color-gray-700">
            Pilihan Pembayaran
          </h2>
          <button
            onClick={onClose}
            className="text-color-gray-500 text-xl hover:text-color-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col w-full h-full gap-2">
          <div className="bg-color-primary w-full flex flex-col p-4">
            <h3 className="text-color-gray-700 font-semibold mb-2">
              Metode Pembayaran
            </h3>
            <div className="flex flex-col gap-1">
              <button
                className={`flex justify-between items-center w-full py-2 ${
                  selectedBank === "BCA" ? "bg-green-200" : ""
                }`}
                onClick={() => setSelectedBank("BCA")}
              >
                Bank BCA{" "}
                <input
                  type="radio"
                  checked={selectedBank === "BCA"}
                  className="custom-checkbox form-radio h-5 w-5"
                />
              </button>
              <hr className="text-color-gray-200" />
              <button
                className={`flex justify-between items-center w-full py-2 ${
                  selectedBank === "BRI" ? "bg-green-200" : ""
                }`}
                onClick={() => setSelectedBank("BRI")}
              >
                Bank BRI{" "}
                <input
                  type="radio"
                  checked={selectedBank === "BRI"}
                  className="custom-checkbox form-radio h-5 w-5"
                />
              </button>
            </div>
          </div>
          <div className="bg-color-primary w-full flex flex-col p-4">
            <h3 className="text-gray-700 font-semibold mb-2">
              Ringkasan Pembayaran
            </h3>
            <div className="text-sm text-gray-700">
              <div className="flex justify-between mb-1">
                <span>Total Harga</span>
                <span>${totalCost}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Total Ongkos Kirim</span>
                <span>${totalCost}</span>
              </div>
            </div>
          </div>
          <div className="bg-color-primary w-full flex flex-col p-4">
            <h3 className="text-gray-700 font-semibold mb-2">Total Tagihan</h3>
            <div className="text-lg font-semibold text-gray-900">
              ${totalCost * 2}
            </div>
            <Button
              className="w-full bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg py-2"
              onClick={() => {
                onClose();
              }}
            >
              Bayar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
