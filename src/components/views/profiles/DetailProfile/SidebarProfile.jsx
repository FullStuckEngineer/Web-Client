import React, { useState } from "react";
import {
  CaretDown,
  CaretUp,
  ListDashes,
  Password,
  ShoppingBag,
} from "@phosphor-icons/react";
import { User } from "@phosphor-icons/react/dist/ssr";

const SidebarProfile = ({ setCurrentComponent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside
      className="md:relative fixed md:rounded-md border border-color-gray-200 shadow-md top-0 left-0 -z-1 md:w-64 w-full md:py-10 pt-24 px-2"
      aria-label="Sidebar"
    >
      <div className="px-3 pt-6 pb-4 overflow-y-auto bg-color-primary ">
        <ul className="font-medium">
          <li className="">
            {" "}
            <button
              onClick={() => toggleDropdown()}
              className="flex items-center justify-between gap-2 p-2 w-full text-color-dark rounded-lg hover:bg-color-gray-200 "
            >
              <div className="flex flex-row text-sm justify-start items-center gap-2">
                <span className="">Account Setting</span>
              </div>
              <span className="ml-3 md:hidden block">
                {isDropdownOpen ? (
                  <CaretUp size={20} />
                ) : (
                  <CaretDown size={20} />
                )}
              </span>
            </button>
            <div className={`${isDropdownOpen ? "block" : "hidden"} md:hidden`}>
              <button
                className="flex flex-row text-sm gap-2 font-normal justify-start items-center w-full text-left px-4 py-2 rounded-lg text-color-gray-600 hover:text-color-dark hover:bg-color-gray-200 "
                onClick={() => setCurrentComponent("detailProfile")}
              >
                Biodata Diri
              </button>
              <button
                className="flex flex-row text-sm gap-2 font-normal justify-start items-center w-full text-left px-4 py-2 rounded-lg text-color-gray-600 hover:text-color-dark hover:bg-color-gray-200 "
                onClick={() => setCurrentComponent("addressList")}
              >
                List Address
              </button>
              <button
                className="flex flex-row text-sm gap-2 font-normal justify-start items-center w-full text-left px-4 py-2 rounded-lg text-color-gray-600 hover:text-color-dark hover:bg-color-gray-200 "
                onClick={() => setCurrentComponent("changePassword")}
              >
                Change Password
              </button>
              <button
                className="flex flex-row text-sm gap-2 font-normal justify-start items-center w-full text-left px-4 py-2 rounded-lg text-color-gray-600 hover:text-color-dark hover:bg-color-gray-200"
                onClick={() => setCurrentComponent("checkoutList")}
              >
                Checkout List
              </button>
            </div>
          </li>
          <li className="hidden md:block">
            {" "}
            <button
              className="flex flex-row text-sm gap-2 font-normal justify-start items-center w-full text-left px-4 py-2 rounded-lg text-color-gray-600 hover:text-color-dark hover:bg-color-gray-200 "
              onClick={() => setCurrentComponent("detailProfile")}
            >
              Biodata Diri
            </button>
            <button
              className="flex flex-row text-sm gap-2 font-normal justify-start items-center w-full text-left px-4 py-2 rounded-lg text-color-gray-600 hover:text-color-dark hover:bg-color-gray-200 "
              onClick={() => setCurrentComponent("addressList")}
            >
              List Address
            </button>
            <button
              className="flex flex-row text-sm gap-2 font-normal justify-start items-center w-full text-left px-4 py-2 rounded-lg text-color-gray-600 hover:text-color-dark hover:bg-color-gray-200 "
              onClick={() => setCurrentComponent("changePassword")}
            >
              Change Password
            </button>
            <button
              className="flex flex-row text-sm gap-2 font-normal justify-start items-center w-full text-left px-4 py-2 rounded-lg text-color-gray-600 hover:text-color-dark hover:bg-color-gray-200 "
              onClick={() => setCurrentComponent("checkoutList")}
            >
              Checkout List
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarProfile;
