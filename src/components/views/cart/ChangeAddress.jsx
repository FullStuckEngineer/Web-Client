import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import React, { useState } from "react";

const ChangeAddress = ({
  isVisible,
  onClose,
  addressData,
  cityData,
  onAddressSelect,
}) => {
  if (!isVisible) return null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const addresses = addressData;
  console.log(addresses, "<<< addresses");

  const getCityName = (cityId) => {
    const city = cityData.find((city) => city.id === cityId);
    return city ? city.name : "Unknown City";
  };

  const handleAddressCLick = (id) => {
    onAddressSelect(id);
    console.log("Selected address:", id);
    onClose();
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const validAddresses = addresses || [];
  const startPage = (currentPage - 1) * itemsPerPage;
  const selectedAddress = validAddresses.slice(
    startPage,
    startPage + itemsPerPage
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="fixed inset-0 bg-color-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="border bg-color-primary text-color-gray-600 rounded-lg p-8 shadow-lg w-1/2 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-transparent hover:bg-color-gray-300 rounded-full"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl mb-4 font-semibold text-color-dark">
          Ganti Alamat
        </h2>
        <ul>
          {selectedAddress.map((address) => (
            <li
              key={address.id}
              className="flex flex-col gap-2 border text-xs border-color-gray-200 shadow-md rounded-lg px-8 py-4 mb-5 hover:bg-color-gray-200 hover:cursor-pointer"
              onClick={() => handleAddressCLick(address.id)}
            >
              <div>
                <label className="text-md text-color-dark font-semibold">
                  Nama Penerima
                </label>
                <p>{address.receiver_name}</p>
              </div>
              <div>
                <label className="text-md text-color-dark font-semibold">
                  No. Telp Penerima
                </label>
                <p>{address.receiver_phone}</p>
              </div>
              <div>
                <label className="text-md text-color-dark font-semibold">
                  Detail Alamat
                </label>
                <p>{address.detail_address}</p>
              </div>
              <div>
                <label className="text-md text-color-dark font-semibold">
                  Kode Pos
                </label>
                <p>{address.postal_code}</p>
              </div>
              <div>
                <label className="text-md text-color-dark font-semibold">
                  Kota
                </label>
                <p>{getCityName(address.city_id)}</p>
              </div>
              <div>
                <label className="text-md text-color-dark font-semibold">
                  Provinsi
                </label>
                <p>{address.province}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 bg-color-gray-300 shadow-md border border-color-gray-200 hover:bg-color-gray-500 hover:text-color-primary transition-all rounded disabled:bg-color-gray-100 disabled:text-color-gray-400"
          >
            <CaretLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={startPage + itemsPerPage >= addresses.length}
            className="p-2 bg-color-gray-300 shadow-md border border-color-gray-200 hover:bg-color-gray-500 hover:text-color-primary transition-all rounded disabled:bg-color-gray-100 disabled:text-color-gray-400"
          >
            <CaretRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAddress;
