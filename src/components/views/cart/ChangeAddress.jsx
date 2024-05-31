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
  // const [selectedAddressId, setSelectedAddressId] = useState(null);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50">
      <div className="border bg-color-gray-500 text-color-primary rounded-lg p-8 shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Ganti Alamat</h2>
        <ul>
          {selectedAddress.map((address) => (
            <li
              key={address.id}
              className="border border-gray-700 shadow-md rounded-lg p-4 mb-5 hover:cursor-pointer"
              onClick={() => handleAddressCLick(address.id)}
            >
              <label className="text-lg font-semibold mb-3">
                Nama Penerima
              </label>
              <p>{address.receiver_name}</p>
              <label className="text-lg font-semibold mb-3">
                No. Telp Penerima
              </label>
              <p>{address.receiver_phone}</p>
              <label className="text-lg font-semibold mb-3">
                Detail Alamat
              </label>
              <p>{address.detail_address}</p>
              <label className="text-lg font-semibold mb-3">Kode Pos</label>
              <p>{address.postal_code}</p>
              <label className="text-lg font-semibold mb-3">Kota</label>
              <p>{getCityName(address.city_id)}</p>
              <label className="text-lg font-semibold mb-3">Provinsi</label>
              <p>{address.province}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 bg-gray-300 shadow-md border border-gray-800 hover:bg-gray-500 hover:text-white transition-all rounded disabled:bg-gray-100 disabled:text-gray-400"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={startPage + itemsPerPage >= addresses.length}
            className="p-2 bg-gray-300 shadow-md border border-gray-800 hover:bg-gray-500 hover:text-white transition-all rounded disabled:bg-gray-100 disabled:text-gray-400"
          >
            Next
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-gray-300 shadow-md border border-gray-800 hover:bg-gray-500 hover:text-white transition-all rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAddress;
