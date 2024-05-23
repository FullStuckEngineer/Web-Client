import React from "react";

const AddressList = () => {
    return (
        <div className="w-full max-w-md mb-4 p-4 border border-gray-200 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Addresses</h2>
            <ul className="list-none p-0">
                List Address Disini
            </ul>
        </div>
    );
};

export default AddressList;


// const AddressList = ({ address }) => {
//     return (
//         <div className="w-full max-w-md mb-4 p-4 border border-gray-200 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">Addresses</h2>
//             <ul className="list-none p-0">
//                 {address.map((address, index) => {
//                     <li key={index} className="bg-gray-100 p-4 border border-gray-200 rounded-lg mb-2">
//                         <p>{address.receiver_name}, {address.receiver_phone}, {address.detail_address}, {address.city.name}</p>
//                     </li>
//                 })}
//             </ul>
//         </div>
//     );
// };