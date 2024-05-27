import React, { useEffect, useState } from "react";
import { findAllAddress, destroyAddress } from "@/modules/fetch/fetchAddress";
import UpdateAddress from "./UpdateAddress";
import { findWithNoLimit } from "@/modules/fetch/fetchCity";
import Button from "@/components/ui/Button";

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
        const cityData = await findWithNoLimit();
        setAddresses(data);
        setCities(cityData);
        setLoading(false);
        console.log("INI DATA CITY", cityData);
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

  const handleUpdateAddress = async (id) => {
    setSelectedId(id);
    console.log("Selected ID:", id);
    setShowUpdateAddress(true);
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
        <div className="flex flex-row items-center border border-color-gray-300 p-8 w-full h-full shadow-md rounded-md">
          <div className=" w-full h-auto">
            <h2 className="text-xl font-semibold">Daftar Alamat</h2>
            <div className="flex flex-row justify-between items-end text-sm pb-4">
              <h2 className="text-md font-medium">Total Alamat  :  {addresses.length} alamat</h2>
              <Button
                onClick={() => setCurrentComponent("addAddress")}
                className="p-2 w-52 bg-color-green hover:bg-color-greenhover text-color-primary hover:text-color-gray-100 hover:transition-all rounded-md"
              >
                + Tambah Alamat Baru
              </Button>
            </div>
            <ul>
              {selectedAddress.map((address) => (
                <div
                  key={address.id}
                  className="flex flex-col gap-3 border bg-color-primary border-color-gray-300 rounded-md px-8 py-4 mb-5"
                >
                  <div className="flex flex-col gap-[0.15rem] text-sm">
                    <p className="text-lg font-semibold">
                      {address.receiver_name}
                    </p>

                    <p className="">{address.receiver_phone}</p>

                    <p>{address.detail_address}</p>
                    <p>Kode Pos {address.postal_code}</p>
                    <p>{getCityName(address.city_id)}</p>
                    <p>Provinsi {address.province}</p>
                  </div>
                  <div className="flex-row flex gap-0 text-[0.8rem] font-semibold">
                    <button
                      className="text-red-500 shadow-sm px-4  border-x-2 border-color-gray-200 text-color-gray-500 hover:text-color-greenhover hover:transition-all disabled:bg-gray-100 disabled:text-gray-400"
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

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 bg-gray-300 shadow-md border border-color-dark hover:bg-color-gray-500 hover:text-color-primary hover:transition-all rounded disabled:bg-gray-100 disabled:text-gray-400"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={startPage + itemsPerPage >= addresses.length}
                className="p-2 bg-gray-300 shadow-md border border-color-dark hover:bg-color-gray-500 hover:text-color-primary hover:transition-all rounded disabled:bg-gray-100 disabled:text-gray-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {showUpdateAddress && (
        <UpdateAddress
          addressId={selectedId}
          onClose={() => setShowUpdateAddress(false)}
          setCurrentComponent={setCurrentComponent}
        />
      )}
    </>
  );
};

export default AddressList;
