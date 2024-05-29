"use client";

import React, { useEffect, useState } from "react";
import CartItem from "@/components/views/cart/CartItem";
import CartSummary from "@/components/views/cart/CartSummary";
import ChangeAddress from "./ChangeAddress";
import { updateCart, destroyCart, deleteAll } from "@/modules/fetch/fetchCart";
import { City, Minus, Trash } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import CartData from "@/components/views/cart/CartData";

export default function CartsView({
  cart,
  shopItems,
  dataProduct,
  addressData,
  citiesData,
  courierData,
}) {
  const [cartData, setCartData] = useState(null);
  // const [showAddressList, setShowaddressList] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [courier, setCourier] = useState(null);
  const [courierDropdown, setCourierDropdown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 2;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart) {
        setCartData(cart);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [cart]);

  const getProductName = (productId) => {
    const productName = dataProduct.find((product) => product.id === productId);
    return productName ? productName.name : "Product Not Found";
  };

  //get address data based address_id from cart
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

  const handleSelectedAddress = async (addressId) => {
    console.log("Selected address from child component:", addressId);
    try {
      const updatedCartData = {
        ...cart,
        address_id: addressId,
      };
      const updatedCart = await updateCart(cart.id, updatedCartData);
      setCartData(updatedCart);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const deleteItem = await destroyCart(id);
      setCartData(cartData);
      if (deleteItem.status === 200) {
        console.log("Item deleted successfully");
      } else {
        console.log("Failed to delete item");
      }
    } catch (error) {
      console.log("Error removing shopping Item", error);
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

  const handleSelectedCourier = async (courierId) => {
    try {
      const updatedCartData = {
        ...cart,
        courier_id: courierId,
      };
      const updatedCart = await updateCart(cart.id, updatedCartData);
      setCartData(updatedCart);
      setCourierDropdown(false);
    } catch (error) {
      console.error("Failed to update cart:", error);
      setCourierDropdown(false);
    }
  };

  const updateCartShopItems = async (productId, quantity) => {
    try {
      const updatedCart = await updateCart(cart.id, {
        address_id: cart.address_id,
        courier_id: cart.courier_id,
        shipping_method: cart.shipping_method,
        shopping_items: shopItems?.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
            : item
        ),
      });
      setCartData(updatedCart);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    updateCartShopItems(productId, 1);
  };

  const handleDecreaseQuantity = (productId) => {
    updateCartShopItems(productId, -1);
  };

  // console.log(courierData, "<<<<<<<<<<<< INI DATA COURIER DATA");
  // console.log(cartData, "<<<<<<<<<<<<<<<< INI CART DATA");
  // console.log(dataProduct, "<<<<<<<<<<<< INI DATA PRODUCT");
  // console.log(addressData, "<<<<<<<<<<<< INI DATA ADDRESS DATA");
  // console.log(citiesData, "<<<<<<<<<<<< INI DATA CITIES DATA");

  if (!cartData) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
        <h1 className="md:text-[32px] text-[22px] font-medium mb-6">
          <span className="text-color-green font-bold">BabyBoo </span> Keranjang
          Belanja
        </h1>
        <div className="flex flex-wrap justify-between">
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
            />
          </div>
          <CartSummary
            netPrice={cartData?.net_price}
            shipingCost={cartData?.shiping_cost}
            shipingMethod={cartData?.shipping_method}
            totalCost={cartData?.total_cost}
            totalWeight={cartData?.total_weight}
          />
        </div>

        <CartItem
          shopItems={shopItems}
          getProductName={getProductName}
          handleRemoveItem={handleRemoveItem}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
        />
        <ul>
          {shopItems?.map((item) => (
            <li
              key={item.id}
              className="border border-color-grey-700 shadow-md rounded-lg p-4 mb-5 w-1/2"
            >
              <p className="font-semibold text-lg">Nama Produk</p>
              <label>{getProductName(item.product_id)}</label>
              <p className="font-semibold text-lg">Item Quantity</p>
              <label>{item.quantity}</label>
              <p className="font-semibold text-lg">Item Price</p>
              <label>{item.price}</label>
              <p className="font-semibold text-lg">Item weight</p>
              <label>{item.weight}</label>
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
                  <p className="">{item.quantity}</p>
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

// const handleNextPage = () => {
//   setCurrentPage((prevPage) => prevPage + 1);
// };

// const handlePreviousPage = () => {
//   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
// };

// const startPage = (currentPage - 1) * itemsPerPage;

// const selectedShopItems = shopItems.slice(
//   startPage,
//   startPage + itemsPerPage
// );
