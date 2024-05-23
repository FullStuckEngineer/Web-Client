import { CaretCircleDown, CaretCircleUp } from "@phosphor-icons/react";
import React, { useState } from "react";

const SidebarProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`w-full md:w-4/12 p-10 bg-color-grey-200 ${
        isDropdownOpen ? "md:fixed" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">Account Setting</h2>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-color-secondary"
          onClick={toggleDropdown}
        >
          {isDropdownOpen ? (
            <CaretCircleUp size={32} />
          ) : (
            <CaretCircleDown size={32} />
          )}
        </button>
      </div>
      <div className={isDropdownOpen ? "md:hidden" : "hidden"}>
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-secondary">
          List Address
        </button>
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-secondary">
          Change Password
        </button>
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-secondary">
          Checkout List
        </button>
      </div>
      <div className="hidden md:block">
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-secondary">
          List Address
        </button>
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-secondary">
          Change Password
        </button>
        <button className="w-full text-left p-2 rounded-lg h-10 hover:bg-color-secondary">
          Checkout List
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;
