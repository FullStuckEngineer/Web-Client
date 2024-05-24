import { CaretDown, CaretUp } from "@phosphor-icons/react";
import React, { useState } from "react";

const SidebarProfile = ({ setCurrentComponent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full md:w-4/12 p-10 bg-color-grey-300 md:rounded-md">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentComponent("detailProfile")}
          className="flex flex-row text-2xl font-bold mb-20"
        >
          Account Setting
        </button>
        <button
          className="md:hidden bg-color-primary bg-opacity-70 p-2 rounded-full hover:bg-color-primary"
          onClick={toggleDropdown}
        >
          {isDropdownOpen ? <CaretUp size={20} /> : <CaretDown size={20} />}
        </button>
      </div>
      <div className={isDropdownOpen ? "md:hidden" : "hidden"}>
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-grey-100">
          List Address
        </button>
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-grey-100">
          Change Password
        </button>
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-grey-100">
          Checkout List
        </button>
      </div>
      <div className="hidden pt-2 md:block">
        <button
          onClick={() => setCurrentComponent("addressList")}
          className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-grey-100"
        >
          List Address
        </button>
        <button
          onClick={() => setCurrentComponent("changePassword")}
          className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-grey-100"
        >
          Change Password
        </button>
        <button
          onClick={() => setCurrentComponent("checkoutList")}
          className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-grey-100"
        >
          Checkout List
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;
