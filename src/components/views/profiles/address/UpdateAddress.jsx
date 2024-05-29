import React, { useEffect, useState, useCallback } from "react";
import { updateAddress, findOneAddress } from "@/modules/fetch/fetchAddress";
import Input from "@/components/ui/Input";
import { CheckCircle, X, XCircle } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import { findAllCities, findCities } from "@/modules/fetch/fetchCity";
import debounce from "lodash.debounce";

const UpdateAddress = ({ addressId, onClose, setCurrentComponent }) => {
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [cityId, setCityId] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getAddressId = async () => {
      try {
        const address = await findOneAddress(addressId);
        setReceiverName(address.receiver_name);
        setReceiverPhone(address.receiver_phone);
        setDetailAddress(address.detail_address);
        const cityData = await findCities();
        const cityName =
          cityData.find((city) => city.id === address.city_id)?.name || "";
        setCity(cityName);
        setCityId(address.city_id);
        setProvince(address.province);
        setPostalCode(address.postal_code);
      } catch (error) {
        setError("Error fetching address");
      }
    };

    getAddressId();
  }, [addressId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setIsLoading(true);
    if (
      !receiverName ||
      !receiverPhone ||
      !detailAddress ||
      !cityId ||
      !province ||
      !postalCode
    ) {
      setError("Tolong isikan semua form.");
      setIsLoading(false);
      return;
    }
    try {
      await updateAddress(addressId, {
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
        detail_address: detailAddress,
        city_id: Number(cityId),
        province: province,
        postal_code: Number(postalCode),
      });
      setSuccessMessage("Alamat berhasil diubah.");
      setTimeout(() => {
        setCurrentComponent("addressList");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating address:", error);
      setError("Error mengubah alamat. Coba lakukan kembali.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="fixed w-[435px] bg-color-primary flex flex-row justify-center">
          <button onClick={onClose} className="close-button">
            <X size={27} className="text-color-gray-600" />
          </button>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Ubah Alamat
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
              label="Receiver Name"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nomor HP</label>
            <Input
              label="Receiver Phone"
              value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Alamat</label>
            <Input
              label="Detail Address"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
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
            <label className="text-sm font-medium">Provinsi</label>
            <Input
              label="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Kode Pos</label>
            <Input
              label="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            {isLoading ? (
              <Button
                disabled
                type="button"
                className="w-full rounded-lg h-10 bg-color-green hover:bg-color-greenhover text-color-primary"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full rounded-md h-10 bg-color-green hover:bg-color-greenhover text-color-primary my-2"
              >
                Simpan
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
