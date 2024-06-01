"use client";

import CartItem from "@/components/views/cart/CartItem";
import CartSummary from "@/components/views/cart/CartSummary";
import React, { useEffect, useState, useRef } from "react";
import ChangeAddress from "./ChangeAddress";
import { updateCart, destroyCart, deleteAll } from "@/modules/fetch/fetchCart";
import { City, Minus, Trash } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import CartData from "@/components/views/cart/CartData";
import { getShippingMethod } from "@/modules/fetch/fetchCourier";

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
  console.log(addressData, "addressdataaa");
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
      return number?.toLocaleString("id-ID", {
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
    if (!Array.isArray(addressData?.data)) {
      console.error("addressData is not an array", addressData?.data);
      return "Address Data is Invalid";
    }

    const addressDetails = addressData?.data.find(
      (address) => address.id === addressId
    );
    return addressDetails ? addressDetails : "Address Not Found";
  };

  console.log(getAddressDetails, "getaddressss");
  console.log(addressData, "addressData");
  const getCityName = (cityId) => {
    if (!Array.isArray(citiesData)) {
      console.error("citiesData is not an array", citiesData);
      return "City Data is Invalid";
    }
    const city = citiesData.find((city) => city.id === cityId);
    return city ? city.name : "Unknown City";
  };

  const getCourierName = (courierId) => {
    const courier = courierData.find((courier) => courier.id === courierId);
    return courier ? courier.name : "Unknown Courier";
  };

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

  console.log(shippingMethods, "shipping method");

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
        <h1 className="md:text-[32px] text-[22px] font-medium mb-6">
          <span className="text-color-green font-bold">BabyBoo </span> Keranjang
          Belanja
        </h1>
        <div className="flex flex-wrap mb-5 justify-between">
          <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
            <CartData
              cartData={cartData}
              addressData={addressData}
              getAddressDetails={getAddressDetails}
              getCityName={getCityName}
              getCourierName={getCourierName}
              setModalVisible={setModalVisible}
              setCourierDropdown={setCourierDropdown}
              handleSelectedCourier={handleSelectedCourier}
              courierDropdown={courierDropdown}
              courierData={courierData}
              shippingMethods={shippingMethods}
              shippingMethodDropdown={shippingMethodDropdown}
              setShippingMethodDropdown={setShippingMethodDropdown}
              handleShippingMethodChange={handleShippingMethodChange}
            />
          </div>
          <CartSummary
            netPrice={cartData?.net_price}
            shipingCost={cartData?.shiping_cost}
            shipingMethod={cartData?.shipping_method}
            totalCost={cartData?.total_cost}
            totalWeight={cartData?.total_weight}
            formatCurrency={formatCurrency}
            formatWeight={formatWeight}
          />
        </div>
        <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
          <CartItem
            shopItems={cartData.shopping_items}
            getProductName={getProductName}
            handleRemoveItem={handleRemoveItem}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            formatCurrency={formatCurrency}
            formatWeight={formatWeight}
          />
        </div>
      </header>
      <ChangeAddress
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddressSelect={handleSelectedAddress}
        addressData={addressData?.data}
        cityData={citiesData}
      />
    </>
  );
}
