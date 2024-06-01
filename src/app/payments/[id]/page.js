"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { payMidtrans, findOne } from "@/modules/fetch/fetchCheckout";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PaymentIntructions from "@/components/views/payments/PaymentIntructions";
import useStore from "@/libs/zustand";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Payments = ({ params }) => {
  const [error, setError] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const router = useRouter();

  const setNewParams = useStore((state) => state.setNewParams);
  const setPaymentMidtrans = useStore((state) => state.setPaymentMidtrans);
  const { id } = params;

  setNewParams(id);

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const myCheckout = await findOne(+id);

        setCheckout(myCheckout.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchCheckout();
  }, []);

  const handleMidtrans = async () => {
    const inputed = {
      id: parseInt(id),
      bank: selectedBank,
    };
    try {
      const post = await payMidtrans(inputed);
      setPaymentResponse(post);
      setNewParams(id);
      setPaymentMidtrans(post);
      router.push("/payments/midtrans");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleManual = () => {
    setNewParams(id);
    router.push("/payments/manual");
  };

  return (
    <div className="flex flex-col justify-center w-full md:pt-24 pt-36 bg-color-primary">
      <div className="flex flex-col justify-between items-start mx-auto w-full max-w-screen-lg">
        {error && <p>Error: {error.message}</p>}
        {checkout ? (
          <div className="flex flex-col justify-between items-start mx-auto md:w-[500px] w-full ">
            <div className="flex flex-col justify-center w-full bg-color-primary ">
              <div className="flex flex-col font-medium w-full p-10 gap-5 border border-color-gray-200 shadow-md rounded-md">
                <h2 className="text-xl font-bold">Pilih Pembayaran</h2>
                <div className="flex flex-row justify-between ">
                  <h3 className="text-lg ">Jenis Pengiriman</h3>
                  <p className="text-xl font-semibold text-color-green">
                    {checkout.shipping_method}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <h3 className="text-lg ">Biaya Pengiriman</h3>
                  <p className="text-xl font-semibold text-color-green">
                    {checkout.shipping_cost}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <h3 className="text-lg">Tagihan</h3>
                  <p className="text-xl font-semibold text-color-green">
                    {checkout.total_cost}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <h3 className="text-lg">Total Tagihan</h3>
                  <p className="text-xl font-semibold text-color-green">
                    {checkout.net_price}
                  </p>
                </div>

                <div className="bg-color-primary w-full flex flex-col p-4">
                  <h3 className="text-color-gray-700 font-semibold mb-2">
                    Metode Pembayaran
                  </h3>
                  <div className="flex flex-col">
                    <button
                      className={`flex justify-between items-center w-full p-2 ${
                        selectedBank === "bca"
                          ? "bg-color-green rounded-md text-color-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedBank("bca")}
                    >
                      Bank BCA{" "}
                      <input
                        type="radio"
                        checked={selectedBank === "bca"}
                        className="custom-checkbox form-radio h-5 w-5"
                        s
                      />
                    </button>

                    <hr className="text-color-gray-200" />

                    <button
                      className={`flex justify-between items-center w-full p-2 ${
                        selectedBank === "bri"
                          ? "bg-color-green rounded-md text-color-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedBank("bri")}
                    >
                      Bank BRI{" "}
                      <input
                        type="radio"
                        checked={selectedBank === "bri"}
                        className="custom-checkbox form-radio h-5 w-5"
                      />
                    </button>

                    <hr className="text-color-gray-200" />

                    <button
                      className={`flex justify-between items-center w-full p-2 ${
                        selectedBank === "bni"
                          ? "bg-color-green rounded-md text-color-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedBank("bni")}
                    >
                      Bank BNI{" "}
                      <input
                        type="radio"
                        checked={selectedBank === "bni"}
                        className="custom-checkbox form-radio h-5 w-5"
                      />
                    </button>

                    <hr className="text-color-gray-200" />

                    <button
                      className={`flex justify-between items-center w-full p-2 ${
                        selectedBank === "cimb"
                          ? "bg-color-green rounded-md text-color-primary"
                          : ""
                      }`}
                      onClick={() => setSelectedBank("cimb")}
                    >
                      Bank CIMB{" "}
                      <input
                        type="radio"
                        checked={selectedBank === "cimb"}
                        className="custom-checkbox form-radio h-5 w-5"
                      />
                    </button>
                  </div>
                </div>

                {/*  */}

                <div className="flex flex-col justify-center w-full items-center gap-2 md:items-center py-10">
                  <Button
                    onClick={handleManual}
                    className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 w-full"
                  >
                    Bank Lainnya
                  </Button>

                  <Link href="/profiles" className="w-full">
                    <Button className="border border-color-green hover:border-color-greenhover text-color-green rounded-lg h-10 w-full ">
                      Cek Status Pembayaran
                    </Button>
                  </Link>

                  <Button
                    onClick={(e) => handleMidtrans(selectedBank)}
                    className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 w-full"
                  >
                    Checkout
                  </Button>
                </div>
                <PaymentIntructions />
              </div>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Payments;
