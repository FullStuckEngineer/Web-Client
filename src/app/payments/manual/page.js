"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PaymentIntructions from "@/components/views/payments/PaymentIntructions";
import useStore from "@/libs/zustand";
import { payManual, findOne } from '@/modules/fetch/fetchCheckout'

const PaymentView = () => {
  const [error, setError] = useState(null)
  const [checkout, setCheckout] = useState(null)
  const [file , setFile] = useState()
  const[response,setResponse] = useState()
  const newParams = useStore((state)=> state.newParams)

  useEffect(()=> {
    const fetchCheckout = async () => {
     
      try {
                         
          const myCheckout = await findOne(+newParams)

      setCheckout(myCheckout.data)

  } catch (error) {
      console.log(error)
    setError(error)
  }

}
fetchCheckout()
  },[])

const handleFile = (event) => {
    setFile(event.target.files[0])
} 


const handleUpload = async ()  => {




const  inputed = {
  body: file,
  id: +newParams
}

try {
    const post = await payManual(inputed)
    setResponse(post)

    
} catch (error) {
  console.log(error)
  setError(error)
}

}

return (
    <div className="flex flex-col justify-center w-full pt-40 bg-color-primary ">
      <div className="text-center mb-4">
              
        <h2 className="text-2xl font-bold">Transfer Manual</h2>
        <div className="text-red-500 text-2xl font-semibold text-color-green">
       
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full mb-4">
        <h3 className="text-lg font-bold">Bank BCA A.N Yanto</h3>
        <p>09284021942</p>
      </div>
      <div className="flex flex-col justify-between items-start mx-auto ">
        <div className="flex flex-col w-full p-10 gap-7 shadow-md rounded-md">
          <h3 className="text-lg font-bold"></h3>
          <div className="flex flex-col gap-2">

           
          </div>
          <div className="text-center">
          <div className="text-red-500 text-2xl font-semibold text-color-green">
        {JSON.stringify(response && response.message)} 
       
       </div>
        <br></br>
        <br></br>
            <h3 className="text-lg font-bold">UPLOAD BUKTI PEMBAYARAN</h3>
            <br></br>
            <h3 className="text-lg font-bold">TOTAL TRANSFER</h3>
            <p className="text-2xl font-semibold text-green-600">{checkout && (checkout.net_price)}</p>
            <br></br>
            <form onSubmit={handleUpload}>
            <input type="file" name="file"  onChange={handleFile}></input>
            <Button onClick={handleUpload}  className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 w-64">
             UPLOAD
            </Button>
           
            </form>
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
  );
}

export default PaymentView;