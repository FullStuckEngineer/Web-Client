import React from "react";

const CheckoutList = () => {
  return (
    <div className="w-full max-w-md mb-4 p-4 border border-color-grey-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Purchased Items</h2>
      <ul className="list-none p-0">List Checkout Disini</ul>
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
