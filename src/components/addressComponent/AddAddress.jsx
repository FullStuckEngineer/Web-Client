import React, { useState } from "react";
import { createAddress } from "@/modules/fetch/fetchAddress";
import { findAllCity } from "@/modules/fetch/fetchCity"; // Assume we have this function

const AddAddress = ({ onClose, setCurrentComponent, addresses, setAddresses }) => {
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [city, setCity] = useState("");
  const [cityId, setCityId] = useState(null);
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setCurrentComponent("addressList");
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

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

  return (
    <div className="w-full mt-20 h-screen bg-white shadow-md bg-gradient-to-br from-color-emerald-300 to-color-secondary rounded-lg p-6">
      <p>Add Address Here</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="font-bold">Receiver Name</label>
        <input
          type="text"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          placeholder="Enter your receiver name"
          className="p-2 border rounded-lg"
        />
        <label className="font-bold">Receiver Phone</label>
        <input
          type="text"
          value={receiverPhone}
          onChange={(e) => setReceiverPhone(e.target.value)}
          placeholder="Enter your receiver phone number"
          className="p-2 border rounded-lg"
        />
        <label className="font-bold">Detail Address</label>
        <input
          type="text"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          placeholder="Enter your address"
          className="p-2 border rounded-lg"
        />
        <label className="font-bold">City</label>
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
        <label className="font-bold">Postal Code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter your postal code"
          className="p-2 border rounded-lg"
        />
        <label className="font-bold">Province</label>
        <input
          type="text"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          placeholder="Enter your province"
          className="p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-color-primary text-white rounded-lg h-10 hover:bg-color-primary-dark"
        >
          Add Address
        </button>
      </form>
      <button
        onClick={onClose}
        className="w-full mt-4 bg-color-secondary text-white rounded-lg h-10 hover:bg-color-secondary-dark"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddAddress;
