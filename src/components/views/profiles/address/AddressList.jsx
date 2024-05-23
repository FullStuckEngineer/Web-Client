import React, { useEffect, useState } from "react";
import { findAllAddress, destroyAddress } from "@/modules/fetch/fetchAddress";
import UpdateAddress from "./UpdateAddress";

const AddressList = ({ setCurrentComponent }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [showAddAddress, setShowAddAddress] = useState(false);
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await findAllAddress();
        setAddresses(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleDeleteAddress = async (id) => {
    try {
      await destroyAddress(id);
      setAddresses(addresses.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleUpdateAddress = async (id) => {
    setSelectedId(id);
    console.log("Selected ID:", id);
    setShowUpdateAddress(true)
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startPage = (currentPage - 1) * itemsPerPage;
  const selectedAddress = addresses.slice(startPage, startPage + itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {!showUpdateAddress && (
        <div className="flex flex-row items-center p-8 bg-gradient-to-br from-color-emerald-3 00 to-white w-full py-20">
        <div className="w-full h-screen bg-white shadow-md bg-gradient-to-br from-color-emerald-300 to-color-secondary rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Addresses</h2>
          <h2 className="font-bold mb-4">Total Address: {addresses.length}</h2>
          <ul>
            {selectedAddress.map((address) => (
              <div
                key={address.id}
                className="border border-color-secondary rounded-lg p-4 mb-5"
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
                <p>{address.city_id}</p>
                <label className="text-lg font-semibold mb-3">Provinsi</label>
                <p>{address.province}</p>
                <button
                  className="text-red-500 shadow-sm border p-2 rounded-md hover:bg-color-red hover:transition-all hover:text-color-primary"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Delete
                </button>
                <button
                  className=" shadow-sm border p-2 rounded-md "
                  onClick={() => handleUpdateAddress(address.id)}
                >
                  Update
                </button>
              </div>
            ))}
          </ul>
  
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={startPage + itemsPerPage >= addresses.length}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
          <button onClick={() => setCurrentComponent("addAddress")}>
            Add Address
          </button>
        </div>
      </div>
      )}
      {showUpdateAddress && <UpdateAddress addressId={selectedId} onClose={() => setShowUpdateAddress(false)} setCurrentComponent={setCurrentComponent}/>}
    </>
  );
};

export default AddressList;
