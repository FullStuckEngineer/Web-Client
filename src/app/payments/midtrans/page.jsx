"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PaymentIntructions from "@/components/views/payments/PaymentIntructions";
import { useRouter } from "next/navigation";
import useStore from "@/libs/zustand";
import { findOne } from "@/modules/fetch/fetchCheckout";

const MidtransPayment = () => {
  const router = useRouter();
  const paymentMidtrans = useStore((state) => state.paymentMidtrans);
  const newParams = useStore((state) => state.newParams);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const myCheckout = await findOne(+newParams);
        setResponse(myCheckout);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCheckout();
  }, [response.data]);

  const handleCopy = () => {
    const vaNumber = paymentMidtrans?.data?.[0]?.va_number || "";
    navigator.clipboard
      .writeText(vaNumber)
      .then(() => {
        alert("Nomor Virtual Account disalin");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-center w-full md:pt-28 pt-36 bg-color-primary ">
        <div className="flex flex-col  justify-between  items-center mb-4 gap-2">
          <h2 className="md:text-2xl text-lg font-bold  ">
            Selesaikan pembayaran dalam
          </h2>
          <div className=" md:text-2xl text-xl font-semibold text-color-green"></div>
          <div className=" w-full flex flex-col justify-center items-center px-5 pb-3">
            <h3 className="text-md font-normal">Batas Akhir</h3>
            <p
              className={`text-lg font-semibold ${
                paymentMidtrans?.message ? "text-color-green" : "text-color-red"
              }`}
            >
              {String(paymentMidtrans?.message || "Terjadi kesalahan")}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start mx-auto md:w-1/3 w-full">
          <div className="flex flex-col  w-full px-5 gap-7 border border-color-gray-200 shadow-md rounded-md">
            <div className="text-center mb-4">
              <div className=" text-2xl font-semibold text-color-green">
                {response && response.data.status}
              </div>
            </div>
            {paymentMidtrans?.data?.length > 0 ? (
              paymentMidtrans?.data.map((payment, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold">{payment.bank}</h3>
                  <div className="flex flex-col gap-2">
                    <p className="">Nomor Virtual Account</p>
                    <div className="flex justify-between text-lg font-semibold">
                      <p id="va-number" className="font-mono">
                        {payment.va_number}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="text-color-green text-sm font-normal underline"
                      >
                        Salin
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h3 className="text-lg font-bold"></h3>
                <div className="flex flex-col gap-2">
                  <p className="">Nomor Virtual Account</p>
                  <div className="flex justify-between text-lg font-semibold">
                    <p id="va-number" className="font-mono">
                      Tidak ada nomor
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="text-center"></div>
          </div>
          <div className="flex md:flex-row flex-col w-full items-center justify-between md:gap-0 gap-3 md:items-center py-10 px-4">
            <Link
              href="/profiles"
              className="w-full flex flex-row justify-start"
            >
              <Button className="border border-color-green hover:border-color-greenhover text-color-green rounded-lg h-10 md:w-56 w-full">
                Cek Status Pembayaran
              </Button>
            </Link>
            <Link href="/" className="w-full flex flex-row justify-end">
              <Button className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 md:w-56 w-full">
                Beli Lagi
              </Button>
            </Link>
          </div>
          <PaymentIntructions />
        </div>
      </div>
    </div>
  );
};

export default MidtransPayment;
