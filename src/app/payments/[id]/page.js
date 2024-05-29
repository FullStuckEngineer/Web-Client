'use client'
import React, { useEffect, useState } from 'react'
import { useRouter,useParams } from 'next/navigation'
import { payMidtrans, findOne } from '@/modules/fetch/fetchCheckout'
import Link from "next/link";
import Button from "@/components/ui/Button";
import PaymentIntructions from "@/components/views/payments/PaymentIntructions";


const Payments = () => {
  const [error, setError] = useState(null)
  const [newParams, setNewParams] = useState(null)
  const [checkout, setCheckout] = useState(null)
  const [selectedBank, setSelectedBank] = useState(null)
  const [paymentResponse, setPaymentResponse] = useState(null)
  const params = useParams()

  useEffect(() => {
    setNewParams(params)
  }, [params])

  useEffect(() => {
    const fetchCheckout = async () => {
      if (newParams) {
        try {
          const newParamsId = +newParams.id
          const myCheckout = await findOne(newParamsId)
          setCheckout(myCheckout)
        } catch (error) {
          setError(error)
        }
      }
    }
    fetchCheckout()
  }, [newParams])




  const handleMidtrans = async () => {
    const inputed = {
      id: parseInt(newParams.id),
      bank: selectedBank,
    };
    try {
      const post = await payMidtrans(inputed);
      setPaymentResponse(post); 
   
console.log(paymentResponse, " <<<<<<<<<")

    } catch (error) {
      setError(error);
    }
  };



  return (
    <div className="flex flex-col justify-center w-full pt-40 bg-color-primary">
      <div className="flex flex-col justify-between items-start mx-auto w-full max-w-screen-lg">
        {error && <p>Error: {error.message}</p>}
        {checkout ? (
            
            <div className="flex flex-col justify-between items-start mx-auto " >
                
            <div className="flex flex-col justify-center w-full pt-40 bg-color-primary ">
            <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">PILIH PEMBAYARAN</h2>
            </div>
              <div className="flex flex-col w-full p-10 gap-7 shadow-md rounded-md">
              
              <div className="text-center">
            <h3 className="text-lg font-bold">Jenis Pengiriman</h3>
            <p className="text-2xl font-semibold text-green-600">{checkout.shipping_method}</p>
          </div>
              <div className="text-center">
            <h3 className="text-lg font-bold">Biaya Pengiriman</h3>
            <p className="text-2xl font-semibold text-green-600">{checkout.shipping_cost}</p>
          </div>
              <div className="text-center">
            <h3 className="text-lg font-bold">Tagihan</h3>
            <p className="text-2xl font-semibold text-green-600">{checkout.total_cost}</p>
          </div>
              <div className="text-center">
            <h3 className="text-lg font-bold">Total Tagihan</h3>
            <p className="text-2xl font-semibold text-green-600">{checkout.net_price}</p>
          </div>



<div className="bg-color-primary w-full flex flex-col p-4">
            <h3 className="text-color-gray-700 font-semibold mb-2">
              Metode Pembayaran
            </h3>
            <div className="flex flex-col gap-1">

              <button
                className={`flex justify-between items-center w-full py-2 ${
                  selectedBank === "bca" ? "bg-green-200" : ""
                }`}
                onClick={() => setSelectedBank("bca")}
              >
                Bank BCA{" "}
                <input
                  type="radio"
                  checked={selectedBank === "bca"}
                  className="custom-checkbox form-radio h-5 w-5"s
                />
              </button>

              <hr className="text-color-gray-200" />

              <button
                className={`flex justify-between items-center w-full py-2 ${
                  selectedBank === "bri" ? "bg-green-200" : ""
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
                className={`flex justify-between items-center w-full py-2 ${
                  selectedBank === "bni" ? "bg-green-200" : ""
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
                className={`flex justify-between items-center w-full py-2 ${
                  selectedBank === "cimb" ? "bg-green-200" : ""
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


                <br></br>
                <br></br>
                <div className="text-center mb-4">
            <div className="text-color-gray-700 font-semibold mb-2">VIRTUAL ACCOUNT NUMBER</div>
                {paymentResponse?.data.length > 0 &&
                paymentResponse.data.map((payment)=> (

                <div> <h1>{payment.bank}</h1> 
                        <p>{payment.va_number}</p>               
                </div>
                ))}
 </div>




            </div>
          </div>







{/*  */}





   <div className="flex flex-row w-full justify-between items-center gap-4 md:items-center py-10">
           
          <Link href="/payments/manual">
          <Button onClick={handleMidtrans} className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 w-64">BANK LAINNYA</Button>
          </Link>

          
          <Link href="/profiles">
            <Button className="border border-color-green hover:border-color-greenhover text-color-green rounded-lg h-10 w-64">
              Cek Status Pembayaran
            </Button>
          </Link>
          
          {/* <Link href="/payments/midtrans">   */}
          <Button onClick={(e)=>handleMidtrans(selectedBank) }  className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 w-64">CHECKOUT</Button>
          {/* </Link> */}


        </div>
      <PaymentIntructions />
            </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Payments
