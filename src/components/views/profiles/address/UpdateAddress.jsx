import React, { useEffect, useState } from "react";
import { updateAddress, findOneAddress } from "@/modules/fetch/fetchAddress";

const UpdateAddress = ({ addressId, onClose, setCurrentComponent }) => {
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [cityId, setCityId] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

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
    <div className="flex flex-row items-center p-8 bg-gradient-to-br from-color-emerald-3 00 to-white w-full py-20">
      <div className="w-4/12 h-screen p-10">
        <button
          onClick={() => setCurrentComponent("detailProfile")}
          className="flex flex-row text-2xl font-bold mb-20"
        >
          Account Setting
        </button>
        <div className="flex flex-col items-start">
          <button
            onClick={() => setCurrentComponent("addressList")}
            className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2 hover:bg-color-secondary"
          >
            List Address
          </button>
          <button
            onClick={() => setCurrentComponent("changePassword")}
            className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2 hover:bg-color-secondary"
          >
            Change Password
          </button>
          <button
            onClick={() => setCurrentComponent("checkoutList")}
            className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2  hover:bg-color-secondary"
          >
            Checkout List
          </button>
        </div>
      </div>

      <div className="w-full h-screen bg-white shadow-md bg-gradient-to-br from-color-emerald-300 to-color-secondary rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Update Address</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
          <label className="font-bold">Receiver Name</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            placeholder="Enter receiver name"
          />

          <label className="font-bold">Receiver Phone</label>
          <input
            type="text"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            placeholder="Enter receiver phone number"
          />

          <label className="font-bold">Detail Address</label>
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="Enter address"
          />

          <label className="font-bold">City</label>
          <input
            type="text"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            placeholder="Enter city ID"
          />

          <label className="font-bold">Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
          />

          <label className="font-bold">Province</label>
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="Enter province"
          />

          <button
            type="submit"
            className="w-1/5 rounded-lg h-10 border border-color-emerald-600 hover:transition-all hover:text-color-emerald-600 hover:bg-color-dark text-white my-2 shadow-md"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-1/5 rounded-lg h-10 border border-color-red-600 hover:transition-all hover:text-color-red-600 hover:bg-color-dark text-white my-2 shadow-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
