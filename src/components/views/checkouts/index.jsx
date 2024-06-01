"use client";

import CheckoutActions from "@/components/views/checkouts/CheckoutActions";
import CheckoutItem from "@/components/views/checkouts/CheckoutItem";
import CheckoutSummary from "@/components/views/checkouts/CheckoutSummary";
import React, { useEffect, useState } from "react";

export default function CheckoutView({
  cart,
  dataProduct,
  shopItems,
  addressData,
  citiesData,
  courierData,
}) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [courierDropdown, setCourierDropdown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [shippingMethodDropdown, setShippingMethodDropdown] = useState(false);
  const [netPrice, setNetPrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalOngkir, setTotalOngkir] = useState(0);

  //console.log all params
  // console.log(cart, "<<<<<CART");
  // console.log(dataProduct, "<<<<<dataProduct");
  // console.log(shopItems, "<<<<<shopItems");
  // console.log(addressData, "<<<<<addressData");
  // console.log(citiesData, "<<<<<citiesData");
  // console.log(courierData, "<<<<<courierData");

  const getTotalCost = () => {
    return checkout?.reduce(
      (sum, { cost, quantity }) => sum + cost * quantity,
      0
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart) {
        setCartData(cart);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [cart]);

  const formatCurrency = (number) => {
    if (isNaN(number)) {
      console.error("Invalid number:", number);
      return "Invalid number";
    } else {
      return number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    }
  };

  const formatWeight = (weight) => {
    if (isNaN(weight)) {
      console.error("Invalid weight:", weight);
      return "Invalid weight";
    } else {
      return (weight / 1000).toFixed(1) + " kg";
    }
  };

  const getProductName = (productId) => {
    const productName = dataProduct?.find(
      (product) => product.id === productId
    );
    return productName ? productName.name : "Product Not Found";
  };

  const getAddressDetails = (addressId) => {
    // Check if addressData is an array
    if (!Array.isArray(addressData?.data)) {
      console.error("addressData is not an array", addressData?.data);
      return "Address Data is Invalid";
    }

    const addressDetails = addressData?.data.find(
      (address) => address.id === addressId
    );
    return addressDetails ? addressDetails : "Address Not Found";
  };

  console.log(citiesData, "citiesData from INDEX.JSX");

  const getCityName = (cityId) => {
    // check if cities data is an Array
    if (!Array.isArray(citiesData)) {
      console.error("citiesData is not an array", citiesData);
      return "City Data is Invalid";
    }
    const city = citiesData.find((city) => city.id === cityId);
    return city ? city.name : "Unknown City";
  };

  const getCourierName = (courierId) => {
    const courier = courierData?.find((courier) => courier.id === courierId);
    return courier ? courier.name : "Unknown Courier";
  };

  const getNetPrice = (price) => {
    return price - (price * 10) / 100;
  };

  return (
    <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
      <h1 className="md:text-[32px] text-[22px] font-medium mb-6">
        <span className="text-color-green font-bold">BabyBoo </span> Pengiriman
      </h1>
      <div className="flex flex-wrap mb-5 justify-between">
        <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
          <CheckoutActions
            addressData={addressData}
            cartData={cartData}
            getAddressDetails={getAddressDetails}
            getCourierName={getCourierName}
          />

          <CheckoutSummary
            netPrice={cartData?.net_price}
            shippingCost={cartData?.shiping_cost}
            totalCost={cartData?.total_cost}
            cartAddress={cartData?.address_id}
            cartCourier={cartData?.courier_id}
            cartItems={cartData?.shopping_items}
            shippingMethod={cartData?.shipping_method}
          />
        </div>
        <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
          <CheckoutItem cartData={cartData} getProductName={getProductName} />
        </div>
        <ul>
          {cartData?.shopping_items?.map((item) => (
            <li
              key={item.id}
              className="border border-color-grey-700 shadow-md rounded-lg p-4 mb-5 w-1/2"
            >
              <p className="font-semibold text-lg">Nama Produk</p>
              <label>{getProductName(item.product_id)}</label>
              <p className="font-semibold text-lg">Item Quantity</p>
              <label>{item.quantity}</label>
              <p className="font-semibold text-lg">Item Price</p>
              <label>{formatCurrency(item.price)}</label>
            </li>
          ))}
        </ul>

        {/* <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
          <CheckoutActions />
          {checkout?.map((product, idx) => (
            <CheckoutItem key={idx} product={product} />
          ))}
        </div> */}
      </div>
    </header>
  );
}
