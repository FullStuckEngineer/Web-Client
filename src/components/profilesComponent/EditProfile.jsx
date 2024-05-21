import React, { useState } from "react";
import authImage from "@/assets/images/AuthImage.svg";
import Image from "next/image";

const EditProfile = ({ user, handleUpdateUser, cancelEdit }) => {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdateUser(formData);
  };

  return (
    <>
     <div className="w-full flex flex-row my-20 gap-4">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 flex flex-col h-auto mb-4 p-10 rounded-lg shadow-lg bg-gradient-to-br from-color-emerald-300 to-color-secondary "
      >
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <div className="mb-4 w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4 w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4 w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="number"
            name="phone_number"
            pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
            placeholder="xxxx-xxxx-xxxx"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md w-full outline-0"
          />
        </div>
        <div className="flex flex-row gap-4 w-1/3">
          <button
            type="submit"
            className="w-1/3 rounded-lg h-10 border border-color-emerald-600 hover:transition-all hover:text-color-emerald-600 hover:bg-color-dark text-white my-2 shadow-md"
          >
            Save
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="w-1/3 rounded-lg h-10 border border-color-emerald-600 hover:transition-all hover:text-color-emerald-600 hover:bg-color-dark text-white my-2 shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>
      <div className=" w-1/2 items-center justify-center flex">
      <Image
          src={authImage}
          width={500}
          height={300}
          className="rounded-xl p-5"
          alt="Auth Image"
        />
    </div>
    </div>
   
    </>
   
  );
};

export default EditProfile;
