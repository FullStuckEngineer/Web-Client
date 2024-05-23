import React, { useState } from "react";
import { instance } from "@/libs/axios/instance";

// assets\products\1716455168997-before-the-coffe-gets-cold-book.jpg

const DetailProfile = ({ user, enterEditMode, setCurrentComponent }) => {
  const profileImage = user.photo ? `http://localhost:8000/${user.photo}` : "https://via.placeholder.com/150";

  console.log(user.photo, "<<<<< INI PHOTO USER");

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
        <h2 className="text-2xl font-bold mb-4 p-2">Personal Profile</h2>

        <div className="flex justify-center gap-2 border">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Profile Picture
          </p>
          <img
            className="w-40 h-40 rounded-full"
            src={profileImage}
            alt="Profile"
          />
        </div>

        <form className="py-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <p
              className="w-1/3 bg-color-grey-200 shadow-md p-3"
              aria-placeholder="User Data Here"
            >
              {user.name}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <p
              className="w-1/3 bg-color-grey-200 shadow-md p-3"
              aria-placeholder="User Email Here"
            >
              {user.email}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <p
              className="w-1/3 bg-color-grey-200 shadow-md p-3"
              aria-placeholder="User Phone Nmber Here"
            >
              {user.phone_number}
            </p>
          </div>
          <div className="mb-4 flex justify-center items-center ">
            <button
              onClick={enterEditMode}
              className="w-1/4 font-bold rounded-lg h-10 bg-color-secondary hover:transition-all text-white my-2 shadow-md hover:bg-color-primary"
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailProfile;
