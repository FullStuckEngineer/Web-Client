import Button from "@/components/ui/Button";
import React from "react";

export default function CartData({
  cartData,
  addressData,
  getAddressDetails,
  getCityName,
  getCourierName,
  setModalVisible,
  setCourierDropdown,
  handleSelectedCourier,
  courierDropdown,
  courierData,
  shippingMethods,
  shippingMethodDropdown,
  setShippingMethodDropdown,
  handleShippingMethodChange
}) {
  console.log(
    cartData.address_id,
    "<<<<<<<<<<<< this is cart data in cartData.jsx"
  );
  return (
    <div className="flex flex-row bg-color-primary md:px-10 px-3 py-5 rounded-lg w-full justify-between items-center shadow-md">
      {cartData && (
        <div className="flex flex-col gap-2 items-start w-full">
          <h2 className="text-lg font-semibold text-color-gray-700">
            Alamat Pengiriman
          </h2>
          {addressData &&
          cartData.address_id &&
          getAddressDetails(cartData.address_id) ? (
            <div className="text-sm">
              <p>
                Nama Penerima:{" "}
                {getAddressDetails(cartData.address_id).receiver_name}
              </p>
              <p>
                Telepon: {getAddressDetails(cartData.address_id).receiver_phone}
              </p>
              <p>
                Alamat: {getAddressDetails(cartData.address_id).detail_address}
              </p>
              <p>
                Kode Pos: {getAddressDetails(cartData.address_id).postal_code}
              </p>
              <p>
                Kota:{" "}
                {getCityName(getAddressDetails(cartData.address_id).city_id)}
              </p>
              <p>Provinsi: {getAddressDetails(cartData.address_id).province}</p>
            </div>
          ) : (
            <p className="text-sm">Alamat tidak ditemukan</p>
          )}
          <div className="text-sm">
            {" "}
            <p className="font-semibold text-color-gray-700text-md">
              Pengiriman
            </p>
            <p className="mb-5">{getCourierName(cartData?.courier_id)}</p>
          </div>
          <div className="flex flex-row w-full gap-3 text-xs">
            <Button
              onClick={() => setModalVisible(true)}
              className="hover:bg-color-gray-100 bg-color-primary text-color-gray-500 border border-color-gray-500 hover:border-color-gray-700 hover:text-color-gray-700 px-2 py-1 w-32 font-medium rounded-md"
            >
              Ganti alamat
            </Button>
            <div className="relative">
              <Button
                onClick={() => setCourierDropdown(!courierDropdown)}
                className="hover:bg-color-gray-100 bg-color-primary text-color-gray-500 border border-color-gray-500 hover:border-color-gray-700 hover:text-color-gray-700 px-2 py-1 w-32 font-medium rounded-md"
              >
                Pilih Pengiriman
              </Button>

              {courierDropdown && (
                <div className="absolute top-4 border text-center border-color-gray-200 shadow-md p-2 rounded-md mt-2 bg-color-primary w-full">
                  {courierData.map((courier) => (
                    <Button
                      key={courier.id}
                      className="flex p-2 hover:bg-color-gray-200 w-full border border-color-gray-300 text-left rounded shadow-md mb-2"
                      onClick={() => handleSelectedCourier(courier.id)}
                    >
                      {courier.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                onClick={() =>
                  setShippingMethodDropdown(!shippingMethodDropdown)
                }
                className="hover:bg-color-gray-100 bg-color-primary text-color-gray-500 border border-color-gray-500 hover:border-color-gray-700 hover:text-color-gray-700 px-2 py-1 w-32 font-medium rounded-md"
              >
                Pilih Pengiriman
              </Button>

              {shippingMethodDropdown && (
                <div className="absolute top-4 border text-center border-color-gray-200 shadow-md p-2 rounded-md mt-2 bg-color-primary w-full">
                  {shippingMethods.map((method, index) => (
                    <Button
                      key={index}
                      className="flex p-2 hover:bg-color-gray-200 w-full border border-color-gray-300 text-left rounded shadow-md mb-2"
                      onClick={() => handleShippingMethodChange(method)}
                    >
                      {method}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
