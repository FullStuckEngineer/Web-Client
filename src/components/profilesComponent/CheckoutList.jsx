import React from "react";

const CheckoutList = ({ setCurrentComponent }) => {
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
        <h2 className="text-xl font-semibold mb-4">Purchased Items</h2>
        <ul className="">List Checkout Disini</ul>
        <p>haloo</p>
      </div>
    </div>
  );
};

export default CheckoutList;

// return (
//     <div className="w-full max-w-md mb-4 p-4 border border-gray-200 rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Purchased Items</h2>
//         <ul className="list-none p-0">
//             {checkouts.map((checkout, index) => (
//                 <li key={index} className="bg-gray-100 p-4 border border-gray-200 rounded-lg mb-2">
//                     <p>{checkout.productName} - ${checkout.price}</p>
//                 </li>
//             ))}
//         </ul>
//     </div>
// )
