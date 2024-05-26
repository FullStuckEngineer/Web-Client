import React, { useState } from "react";

export default function CheckoutItem({ product }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between md:flex-row flex-col gap-2 md:px-10 px-3 md:py-10 py-4 bg-color-primary shadow-md w-full rounded-lg">
      <div className="flex flex-row w-full gap-2">
        <img
          src={product.image}
          alt={product.name}
          className="border md:w-[100px] w-[60px]"
        />
        <div className="flex flex-col w-full justify-between px-5">
          <div className="flex flex-row justify-between w-full">
            <h3 className="font-normal text-lg w-48 line-clamp-2">
              {product.name}
            </h3>
            <h4 className="text-xl font-bold">${product.cost}</h4>
          </div>

          <div className="flex w-full relative">
            <button
              id="dropdown-button"
              onClick={toggleDropdown}
              className="flex-shrink-0 inline-flex items-center w-full py-2.5 px-4 text-sm font-medium text-center text-color-gray-900 bg-color-gray-100 border border-color-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-color-greenhover"
              type="button"
            >
              <h3 className="flex flex-row w-full justify-between items-center">
                Pilih Pengiriman{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </h3>
            </button>
            {isDropdownOpen && (
              <div
                id="dropdown"
                className="absolute my-10 z-10 bg-color-primary divide-y divide-color-gray-100 rounded-lg shadow w-full "
              >
                <ul
                  className="py-2 text-sm text-color-gray-700"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-color-gray-100 "
                    >
                      JNE{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-color-gray-100 "
                    >
                      JNT
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-color-gray-100 "
                    >
                      Tiki
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-color-gray-100 "
                    >
                      Antar Aja
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-color-gray-100 "
                    >
                      Antar Aja
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
