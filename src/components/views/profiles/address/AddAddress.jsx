import React, { useState } from "react";
import { createAddress } from "@/modules/fetch/fetchAddress";
import { findCities } from "@/modules/fetch/fetchCity";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CheckCircle, X, XCircle } from "@phosphor-icons/react";

const AddAddress = ({
  onClose,
  setCurrentComponent,
  addresses,
  setAddresses,
}) => {
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [city, setCity] = useState("");
  const [cityId, setCityId] = useState(null);
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setIsLoading(true);
    const newAddress = {
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
      detail_address: detailAddress,
      city_id: cityId,
      postal_code: Number(postalCode),
      province: province,
    };

    try {
      const createdAddress = await createAddress(newAddress);
      setAddresses([...addresses, createdAddress]);
      console.log("Address created:", createdAddress);
      setSuccessMessage("Alamat berhasil diubah.");
      setTimeout(() => {
        setCurrentComponent("addressList");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error creating address:", error);
      setError("Error mengubah alamat. Coba lakukan kembali.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCityChange = async (e) => {
    const search = e.target.value;
    setCity(search);
    if (search.length > 1) {
      const cities = await findCities(search);
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  };

  const handleCitySelect = (city) => {
    setCity(city.name);
    setCityId(city.id);
    setCityOptions([]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="fixed w-[435px] bg-color-primary flex flex-row justify-center">
          <button onClick={onClose} className="close-button">
            <X size={27} className="text-color-gray-600" />
          </button>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Tambah Alamat
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 pt-14">
          {successMessage && (
            <p className="flex gap-2 items-center border border-color-green rounded-md p-3 mb-5 text-color-green text-xs bg-color-green bg-opacity-10">
              <CheckCircle size={20} />
              {successMessage}
            </p>
          )}
          {error && (
            <p className="flex gap-2 items-center border rounded-md border-color-red p-3 mb-5 text-color-red text-xs bg-color-red bg-opacity-10">
              <XCircle size={20} /> {error}
            </p>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nama Penerima</label>
            <Input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="Masukkan Nama Penerima"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nomor HP</label>
            <Input
              type="text"
              value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
              placeholder="Masukkan Nomor HP"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Alamat</label>
            <Input
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="Masukkan Alamat"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <label className="text-sm font-medium">Kota</label>
            <Input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Masukkan Nama Kota"
              className="p-2 border rounded-md"
            />
            {cityOptions.length > 0 && (
              <ul className="absolute top-16 z-10 w-full text-sm text-color-gray-900 bg-color-gray-300 border border-color-gray-300 rounded-md max-h-60 overflow-y-auto">
                {cityOptions.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className="p-2 cursor-pointer hover:bg-color-gray-200"
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Kode Pos</label>
            <Input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Masukkan Kode Pos"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Provinsi</label>
            <Input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="Masukkan Nama Provinsi"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              className="w-full h-10 bg-color-green hover:bg-color-greenhover text-color-primary rounded-md"
            >
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
