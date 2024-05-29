"use client";

import React, { useEffect, useState } from "react";
import { findAllAddress, destroyAddress } from "@/modules/fetch/fetchAddress";
import UpdateAddress from "./UpdateAddress";
import { findAllCities } from "@/modules/fetch/fetchCity";
import Button from "@/components/ui/Button";
import { CaretLeft, CaretRight, Circle } from "@phosphor-icons/react";

const AddressList = ({ setCurrentComponent }) => {
  const [addresses, setAddresses] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await findAllAddress();
        setAddresses(data);
        const cityData = await findAllCities();
        setCities(cityData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const getCityName = (cityId) => {
    const city = cities.find((city) => city.id === cityId);
    return city ? city.name : "Unknown City";
  };

  const handleDeleteAddress = async (id) => {
    try {
      await destroyAddress(id);
      setAddresses(addresses.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleUpdateAddress = (id) => {
    setSelectedId(id);
    setShowUpdateAddress(true);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const validAddresses = addresses?.data?.addresses || [];
  const totalPages = Math.ceil(addresses.length / itemsPerPage);
  const startPage = (currentPage - 1) * itemsPerPage;
  const selectedAddress = validAddresses.slice(
    startPage,
    startPage + itemsPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-row bg-color-secondary w-full md:px-5">
      <div className="flex flex-row items-center bg-color-primary border border-color-gray-200 md:py-10 py-5 md:px-20 px-6 w-full h-full md:shadow-md md:rounded-md">
        <div className="w-full h-auto">
          <h2 className="text-xl font-semibold pb-3">Daftar Alamat</h2>
          <div className="flex flex-row justify-between items-end md:text-sm text-xs pb-4">
            <h2 className="flex flex-col text-md font-medium">
              <span>Total Alamat:</span> {addresses.length} alamat
            </h2>
            <Button
              onClick={() => setCurrentComponent("addAddress")}
              className="p-2 md:w-52 w-40 bg-color-green hover:bg-color-greenhover text-color-primary hover:text-color-gray-100 hover:transition-all rounded-md"
            >
              + Tambah Alamat Baru
            </Button>
          </div>
          <ul className="flex flex-col">
            {selectedAddress.map((address) => (
              <div
                key={address.id}
                className="flex flex-col gap-3 border border-color-gray-300 rounded-md px-8 py-4 mb-5"
              >
                <div className="flex flex-col gap-[0.15rem] md:text-sm text-xs">
                  <p className="text-lg font-semibold">
                    {address.receiver_name}
                  </p>
                  <p>{address.receiver_phone}</p>
                  <p>{address.detail_address}</p>
                  <p>Kode Pos {address.postal_code}</p>
                  <p>{getCityName(address.city_id)}</p>
                  <p>Provinsi {address.province}</p>
                </div>
                <div className="flex-row flex gap-0 md:text-[0.8rem] text-xs font-semibold">
                  <button
                    className="text-red-500 shadow-sm px-4 border-x-2 border-color-gray-200 text-color-gray-500 hover:text-color-greenhover hover:transition-all disabled:bg-gray-100 disabled:text-gray-400"
                    onClick={() => handleUpdateAddress(address.id)}
                  >
                    Ubah
                  </button>
                  <button
                    className="text-red-500 shadow-sm px-4 border-r-2 border-color-gray-200 hover:transition-all text-color-gray-500 hover:text-color-red"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </ul>

          <div className="flex justify-between items-center gap-1">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bottom-2/4 left-5 p-2 bg-color-primary shadow-md border border-color-gray-500 text-color-gray-500 hover:bg-color-gray-300 hover:transition-all rounded-full disabled:bg-color-gray-100 disabled:text-color-gray-400 disabled:border-color-gray-400"
            >
              <CaretLeft size={24} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <Circle
                  key={index}
                  size={10}
                  weight={currentPage === index + 1 ? "fill" : "regular"}
                  className={`cursor-pointer ${
                    currentPage === index + 1
                      ? "text-color-gray-500"
                      : "text-color-gray-400"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                />
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={startPage + itemsPerPage >= addresses.length}
              className="p-2 bottom-2/4 right-5 bg-color-primary shadow-md border border-color-gray-500 text-color-gray-500 hover:bg-color-gray-300 hover:transition-all rounded-full disabled:bg-color-gray-100 disabled:text-color-gray-400 disabled:border-color-gray-400"
            >
              <CaretRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {showUpdateAddress && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UpdateAddress
              addressId={selectedId}
              onClose={() => setShowUpdateAddress(false)}
              setCurrentComponent={setCurrentComponent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressList;
