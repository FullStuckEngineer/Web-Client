"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import useStore from "@/libs/zustand";
import { payManual, findOne } from "@/modules/fetch/fetchCheckout";
import UploadFile from "@/components/ui/UploadFile";

const PaymentView = () => {
  const [error, setError] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [file, setFile] = useState();
  const [response, setResponse] = useState();
  const newParams = useStore((state) => state.newParams);

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const myCheckout = await findOne(+newParams);

        setCheckout(myCheckout.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchCheckout();
  }, []);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const inputed = {
      body: file,
      id: +newParams,
    };

    try {
      const post = await payManual(inputed);
      setResponse(post);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full md:pt-28 pt-36 bg-color-primary ">
      <div className="text-center mb-2">
        <h2 className="md:text-2xl text-lg font-bold">Transfer Manual</h2>
      </div>
      <div className="flex flex-col justify-center items-center w-full mb-4">
        <h3 className="md:text-2xl text-lg font-bold">Bank BCA A.N Yanto</h3>
        <p className="font-mono md:text-lg text-md font-medium">09284021942</p>
      </div>
      <div className="md:w-1/3 w-[400px] flex flex-col justify-between items-center mx-auto ">
        <div className="flex flex-col w-full p-10 gap-7 border border-color-gray-200 shadow-md rounded-md">
          <h3 className="text-lg font-bold"></h3>
          <div className="flex flex-col gap-2"></div>
          <div className="text-center">
            <div className=" text-2xl font-semibold text-color-green pb-10">
              {JSON.stringify(response && response.message)}
            </div>
            <div className="flex flex-col gap-5 pb-3">
              <h3 className="md:text-lg text-lg font-bold">
                Upload Bukti Pembayaran
              </h3>
              <h3 className="md:text-lg text-md font-normal">Total Tagihan</h3>
              <p className="text-2xl font-semibold text-color-green">
                {checkout && checkout.net_price}
              </p>
            </div>
            <form onSubmit={handleUpload}>
              <div className="flex flex-row gap-6">
                <UploadFile onChange={handleFile} />
                {/* <input type="file" name="file" onChange={handleFile}></input> */}
                <Button
                  onClick={handleUpload}
                  className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 w-64"
                >
                  Upload
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex md:flex-row flex-col w-full items-center justify-between md:gap-0 gap-3 md:items-center py-10 px-4">
          <Link href="/profiles" className="w-full flex flex-row justify-start">
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
      </div>
    </div>
  );
};

export default PaymentView;
