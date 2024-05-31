'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PaymentIntructions from "@/components/views/payments/PaymentIntructions";
import { useRouter } from "next/navigation";
import useStore from "@/libs/zustand";
import { findOne } from "@/modules/fetch/fetchCheckout";

const MidtransPayment = () => {
  const router = useRouter()
  const paymentMidtrans = useStore((state)=> state.paymentMidtrans)
  const newParams = useStore ((state)=> state.newParams)
  const [response, setResponse] = useState('')


useEffect(()=> {
const fetchCheckout = async () => {

  try {
      const myCheckout = await findOne(+newParams)
      setResponse(myCheckout)
  } catch (error) {
    console.log(error)
  }
}
fetchCheckout()
},[response.data])







  const handleCopy = () => {
    navigator.clipboard.writeText("80777100048738922");
    alert("Nomor Virtual Account disalin");
  };


  return (
    <div>
       <div className="flex flex-col justify-center w-full pt-40 bg-color-primary ">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Selesaikan pembayaran dalam</h2>
        <div className="text-red-500 text-2xl font-semibold text-color-green">

      
        {JSON.stringify(paymentMidtrans.message)}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full mb-4">
        <h3 className="text-lg font-bold">Batas Akhir Pembayaran</h3>
        <p>Rabu, 22 Mei 2024 13:00</p>
      </div>
      <div className="flex flex-col justify-between items-start mx-auto ">
        <div className="flex flex-col w-full p-10 gap-7 shadow-md rounded-md">


            <div className="text-center mb-4">
<div className="text-red-500 text-2xl font-semibold text-color-green">

            {response && response.data.status}
  </div>
 </div>


          <h3 className="text-lg font-bold">BCA Virtual Account</h3>
          <div className="flex flex-col gap-2">
            <p className="">Nomor Virtual Account</p>
            <div className="flex justify-between text-lg font-semibold">
              <p id="va-number" className="font-mono">
              {JSON.stringify(paymentMidtrans.data)}
              </p>
              <button
                onClick={handleCopy}
                className="text-color-green text-sm font-normal underline"
              >
                Salin
              </button>
            </div>
          </div>
          <div className="text-center">
          </div>
        </div>
        <div className="flex flex-row w-full justify-between items-center gap-4 md:items-center py-10">
          <Link href="/profiles">
            <Button className="border border-color-green hover:border-color-greenhover text-color-green rounded-lg h-10 w-64">
              Cek Status Pembayaran
            </Button>
          </Link>
          <Link href="/products/:id">
            <Button className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 w-64">
              Beli Lagi
            </Button>
          </Link>
        </div>
      <PaymentIntructions />
      </div>
    </div>
    </div>
  );
}

export default MidtransPayment;
