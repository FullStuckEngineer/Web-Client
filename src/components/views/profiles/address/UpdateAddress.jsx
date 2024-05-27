import React, { useEffect, useState } from "react";
import { updateAddress, findOneAddress } from "@/modules/fetch/fetchAddress";
import { findAllCity } from "@/modules/fetch/fetchCity";

const UpdateAddress = ({ addressId, onClose, setCurrentComponent }) => {
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [cityId, setCityId] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const getAddressId = async () => {
      try {
        const address = await findOneAddress(addressId);
        console.log("Address ID in UpdateAddress:", addressId);
        setReceiverName(address.receiver_name);
        setReceiverPhone(address.receiver_phone);
        setDetailAddress(address.detail_address);
        setCityId(address.city_id);
        setProvince(address.province);
        setPostalCode(address.postal_code);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    getAddressId();
  }, []);

  const handleCityChange = async (e) => {
    const search = e.target.value;
    setCity(search);
    if (search.length > 1) {
      const cities = await findAllCity(search);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedAddress = await updateAddress(addressId, {
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
        detail_address: detailAddress,
        city_id: Number(cityId),
        province: province,
        postal_code: Number(postalCode),
      });
      console.log("Address updated:", updatedAddress);
      setCurrentComponent("addressList");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="flex flex-row items-center p-8 w-full max-w-lg bg-white shadow-md rounded-lg">
      <div className="w-full h-auto max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Update Address</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
          <label>Receiver Name</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            placeholder="Enter receiver name"
            className="p-2 border rounded-lg"
          />

          <label>Receiver Phone</label>
          <input
            type="text"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            placeholder="Enter receiver phone number"
            className="p-2 border rounded-lg"
          />

          <label>Detail Address</label>
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="Enter address"
            className="p-2 border rounded-lg"
          />

          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter your city"
            className="p-2 border rounded-lg"
          />
          {cityOptions.length > 0 && (
            <ul className="border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
              {cityOptions.map((city) => (
                <li
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
          <label>Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
            className="p-2 border rounded-lg"
          />

          <label>Province</label>
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="Enter province"
            className="p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="p-2 bg-gray-300 shadow-md border border-color-dark hover:bg-color-gray-500 hover:text-color-primary hover:transition-all rounded disabled:bg-gray-100 disabled:text-gray-400 ml-3"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-gray-300 shadow-md border border-color-dark hover:bg-color-gray-500 hover:text-color-primary hover:transition-all rounded disabled:bg-gray-100 disabled:text-gray-400 ml-3"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
