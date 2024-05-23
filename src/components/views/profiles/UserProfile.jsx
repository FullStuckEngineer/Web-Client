// components/views/profiles/DetailProfile.js
import React from "react";
import Button from "@/components/ui/Button";

const UserProfile = ({ user, enterEditMode }) => {
  return (
    <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Personal Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <p className="shadow appearance-none border rounded w-full h-10 py-2 px-3 text-gray-700 leading-tight">
          {user.name}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <p className="shadow appearance-none border rounded w-full h-10 py-2 px-3 text-gray-700 leading-tight">
          {user.email}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <p className="shadow appearance-none border rounded w-full h-10 py-2 px-3 text-gray-700 leading-tight">
          {user.phone_number}
        </p>
      </div>
      <Button
        onClick={enterEditMode}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default UserProfile;
