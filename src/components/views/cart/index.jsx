"use client";

import React, { useEffect, useState, useRef } from "react";
import ChangeAddress from "./ChangeAddress";
import { updateCart, destroyCart, deleteAll } from "@/modules/fetch/fetchCart";
import { City, Minus, Trash } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { getShippingMethod } from "@/modules/fetch/fetchCourier";
import CheckoutPage from "@/app/checkouts/page";
import { Router } from "next/router";
import Link from "next/link";
// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function CartsView({
  cart,
  shopItems,
  dataProduct,
  addressData,
  citiesData,
  courierData,
}) {
  const [cartData, setCartData] = useState(null);
  const [courierDropdown, setCourierDropdown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [shippingMethodDropdown, setShippingMethodDropdown] = useState(false);

  const debouncedUpdateCart = useRef(
    debounce(async (cartId, updatedCartData) => {
      try {
        await updateCart(cartId, updatedCartData);
        alert("Cart updated successfully");
        window.location.reload();
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    }, 1000)
  ).current;

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

  useEffect(() => {
    const fetchShippingMethod = async () => {
      if (cart?.courier_id) {
        try {
          const data = await getShippingMethod(cart.courier_id);
          setShippingMethods(data.shippingMethods);
          setSelectedShippingMethod(data.shippingMethods[0]);
          console.log(data.shippingMethods, "Shipping methods fetched");
        } catch (err) {
          console.error(err);
          setError("Failed to fetch shipping methods");
        }
      }
    };
    fetchShippingMethod();
  }, [cart?.courier_id]);

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
    const productName = dataProduct.find((product) => product.id === productId);
    return productName ? productName.name : "Product Not Found";
  };

  const getAddressDetails = (addressId) => {
    const addressDetails = addressData.find(
      (address) => address.id === addressId
    );
    return addressDetails ? addressDetails : "Address Not Found";
  };

  const getCityName = (cityId) => {
    const city = citiesData.find((city) => city.id === cityId);
    return city ? city.name : "Unknown City";
  };

  const getCourierName = (courierId) => {
    const courier = courierData.find((courier) => courier.id === courierId);
    return courier ? courier.name : "Unknown Courier";
  };

  // --------------------------------------- HANDLE PROGRESS ---------------------------------------

  const handleSelectedAddress = async (addressId) => {
    console.log("Selected address from child component:", addressId);
    try {
      const updatedCartData = {
        ...cart,
        address_id: addressId,
      };
      const updatedCart = await updateCart(cart.id, updatedCartData);
      setCartData(updatedCart);
      alert("Address updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleSelectedCourier = async (courierId) => {
    console.log("Selected courier ID:", courierId);
    try {
      const data = await getShippingMethod(courierId);
      const updatedCartData = {
        ...cartData,
        courier_id: Number(courierId),
        shipping_method: data.shippingMethods[0],
      };
      const updatedCart = await updateCart(cartData.id, updatedCartData);
      setSelectedCourier(courierId);
      setShippingMethods(data.shippingMethods);
      setSelectedShippingMethod(data.shippingMethods[0]);
      setCartData(updatedCart);
      alert("Courier updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleShippingMethodChange = (method) => {
    setSelectedShippingMethod(method);
    handleSelectedShippingMethod(method);
  };

  const handleSelectedShippingMethod = async (method) => {
    const updatedCartData = {
      ...cartData,
      shipping_method: method,
    };
    try {
      const updatedCart = await updateCart(cartData.id, updatedCartData);
      setCartData(updatedCart);
      alert("Shipping method updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleresetCart = async (userId) => {
    try {
      const updatedCart = await destroyAll(userId);
      setCartData(updatedCart);
    } catch (error) {
      console.error("Failed to reset cart:", error);
    }
  };

  const handleShippingMethodDropdown = () => {
    setShippingMethodDropdown(!shippingMethodDropdown);
  };

  const handleUpdateCart = async () => {
    try {
      const updatedCart = await updateCart(cartData.id, cartData);
      setCartData(updatedCart);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const updateCartShopItems = (productId, quantity) => {
    const updatedItems = cartData.shopping_items.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
        : item
    );
    const updatedCartData = { ...cartData, shopping_items: updatedItems };
    setCartData(updatedCartData);
    debouncedUpdateCart(cartData.id, updatedCartData);
  };

  const handleIncreaseQuantity = (productId) => {
    updateCartShopItems(productId, 1);
  };

  const handleDecreaseQuantity = (productId) => {
    updateCartShopItems(productId, -1);
  };

  const handleRemoveItem = async (id) => {
    try {
      await destroyCart(id);
      setCartData((prevCartData) => ({
        ...prevCartData,
        shopping_items: prevCartData.shopping_items.filter(
          (item) => item.id !== id
        ),
      }));
    } catch (error) {
      console.log("Error removing shopping item", error);
    }
  };

  //make func to handle delete all shopping items
  const handleDeleteAll = async () => {
    try {
      await deleteAll(cart.user_id);
      alert("All shopping items deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error deleting all shopping items", error);
    }
  };

  if (!cartData) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
        <div className="flex justify-between">
          <h1 className="md:text-[32px] text-[22px] font-medium mb-6">
            <span className="text-color-green font-bold">BabyBoo </span>{" "}
            Keranjang Belanja
          </h1>
          {/* Still bug */}
          {/* <button 
          className="border rounded p-1 hover:text-color-primary hover:bg-color-red hover:transition-all" 
          onClick={handleDeleteAll}>Delete All Product</button> */}
        </div>
        <div className=" w-auto flex justify-between">
          <div className="border rounded shadow-md p-4 flex flex-col mb-10 w-1/2">
            <p className="font-semibold text-lg">Alamat Pengiriman</p>
            {cartData && (
              <div>
                {addressData &&
                cartData.address_id &&
                getAddressDetails(cartData.address_id) ? (
                  <>
                    <p>
                      Nama Penerima:{" "}
                      {getAddressDetails(cartData.address_id).receiver_name}
                    </p>
                    <p>
                      Telepon:{" "}
                      {getAddressDetails(cartData.address_id).receiver_phone}
                    </p>
                    <p>
                      Alamat:{" "}
                      {getAddressDetails(cartData.address_id).detail_address}
                    </p>
                    <p>
                      Kode Pos:{" "}
                      {getAddressDetails(cartData.address_id).postal_code}
                    </p>
                    <p>
                      Kota:{" "}
                      {getCityName(
                        getAddressDetails(cartData.address_id).city_id
                      )}
                    </p>
                    <p>
                      Provinsi:{" "}
                      {getAddressDetails(cartData.address_id).province}
                    </p>
                  </>
                ) : (
                  <p>Alamat tidak ditemukan.</p>
                )}
              </div>
            )}

            <p className="font-semibold text-lg">Kurir</p>
            {/* display courier name based on courier id from cart */}
            <p className="mb-14">{getCourierName(cartData?.courier_id)}</p>

            <div className="w-auto flex gap-2">
              <button
                className="border p-1 rounded hover:bg-color-gray-300"
                onClick={() => setModalVisible(true)}
              >
                Ganti Alamat
              </button>
              <div>
                <button
                  className="border p-1 rounded hover:bg-color-gray-300"
                  onClick={() => setCourierDropdown(!courierDropdown)}
                >
                  Ganti Kurir
                </button>
                {courierDropdown && (
                  <div className=" border text-center border-color-gray-200 shadow-md p-2 rounded-md mt-2 bg-color-primary w-full">
                    {courierData.map((courier) => (
                      <button
                        key={courier.id}
                        className="flex p-2 hover:bg-color-gray-200 w-full border border-color-gray-300 text-left rounded shadow-md mb-2"
                        onClick={() => handleSelectedCourier(courier.id)}
                      >
                        {courier.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  className="border p-1 rounded hover:bg-color-gray-300"
                  onClick={() =>
                    setShippingMethodDropdown(!shippingMethodDropdown)
                  }
                >
                  Ganti Metode Pengiriman
                </button>
                {shippingMethodDropdown && (
                  <div className=" border text-center border-color-gray-200 shadow-md p-2 rounded-md mt-2 bg-color-primary w-full">
                    {shippingMethods.map((method, index) => (
                      <button
                        key={index}
                        className="flex p-2 hover:bg-color-gray-200 w-full border border-color-gray-300 text-left rounded shadow-md mb-2"
                        onClick={() => handleShippingMethodChange(method)}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" w-1/2 items-center flex flex-col">
            <div className="border p-3 ">
              <p className="font-semibold text-lg">Detail Checkout</p>
              <p className="font-semibold text-lg">Net Price</p>
              <p>{formatCurrency(cartData?.net_price)}</p>
              <p className="font-semibold text-lg">Shipping Cost</p>
              <p>{formatCurrency(cartData?.shiping_cost)}</p>
              <p className="font-semibold text-lg">Shipping Method</p>
              <p>{cartData?.shipping_method}</p>
              <p className="font-semibold text-lg">Total Cost</p>
              <p>{formatCurrency(cartData?.total_cost)}</p>
              <p className="font-semibold text-lg">Total Weight</p>
              <p>{formatWeight(cartData?.total_weight)}</p>
              <div className="flex border rounded-md bg-color-accent hover:bg-color-gold">
                <Link href="/checkouts" className="w-full p-2">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ul>
          {cartData.shopping_items.map((item) => (
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
              <p className="font-semibold text-lg">Item weight</p>
              <label>{formatWeight(item.weight)}</label>
              <div className="flex justify-end gap-2">
                <button
                  className="hover:text-color-red"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash size={32} />
                </button>
                <div className="flex w-auto font-medium items-center rounded hover:bg-color-accent">
                  <button
                    onClick={() => handleIncreaseQuantity(item.product_id)}
                  >
                    <Plus size={32} />
                  </button>
                </div>
                <div className="flex w-auto p-1 font-medium text-xl items-center">
                  <p>{item.quantity}</p>
                </div>
                <div className="flex w-auto font-medium items-center rounded hover:bg-color-red">
                  <button
                    onClick={() => handleDecreaseQuantity(item.product_id)}
                  >
                    <Minus size={32} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </header>
      <ChangeAddress
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddressSelect={handleSelectedAddress}
        addressData={addressData}
        cityData={citiesData}
      />
    </>
  );
}
