import Button from "@/components/ui/Button";
import React from "react";

export default function CheckoutActions({
  addressData,
  cartData,
  getCourierName,
  getAddressDetails,
}) {
  return (
    <div className="flex flex-row bg-color-primary md:px-10 px-3 py-5 rounded-lg w-full justify-between items-center shadow-md">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-xl font-semibold text-color-gray-700">
          Alamat Pengiriman
        </h2>
        {cartData && (
          <div>
            {addressData &&
            cartData.address_id &&
            getAddressDetails(cartData.address_id) ? (
              <>
                <div className="flex flex-col gap-2 items-start">
                  <h3 className="font-semibold">
                    <span>Rumah</span> -
                    {getAddressDetails(cartData.address_id).receiver_name}
                  </h3>
                  <p className="text-sm">
                    {getAddressDetails(cartData.address_id).receiver_phone}
                  </p>
                  <div>
                    <p>
                      Kode Pos:{" "}
                      {getAddressDetails(cartData.address_id).postal_code}
                    </p>
                  </div>
                  <div>
                    <p>
                      Kota:{" "}
                      {getCityName(
                        getAddressDetails(cartData.address_id).city_id
                      )}
                    </p>
                  </div>
                  <div>
                    <p>
                      Provinsi:{" "}
                      {getAddressDetails(cartData.address_id).province}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-lg">Kurir</p>
                <p className="mb-14">{getCourierName(cartData?.courier_id)}</p>
              </>
            ) : (
              <p>Alamat tidak ditemukan.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
