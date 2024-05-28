"use client";

import React, { useEffect, useState } from "react";
import CartItem from "@/components/views/cart/CartItem";
import CartSummary from "@/components/views/cart/CartSummary";
import CartActions from "@/components/views/cart/CartActions";
import ChangeAddress from "./ChangeAddress";
import { updateCart, destroyCart, deleteAll } from "@/modules/fetch/fetchCart";
import { City, Minus, Trash } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

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
        <div className=" w-auto flex justify-between">
          <div className="border rounded shadow-md p-4 flex flex-col mb-10 w-1/2">
            <p className="font-semibold text-lg">Alamat</p>
            {cartData && (
              <div>
                <h2>Alamat Pengiriman:</h2>
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
              <button
                className="border p-1 rounded hover:bg-color-gray-300"
                onClick={() => setCourierDropdown(!courierDropdown)}
              >
                Ganti Kurir
              </button>
            </div>
            {courierDropdown && (
              <div className="border p-2 rounded mt-2 bg-color-gray-200 shadow-md">
                {courierData.map((courier) => (
                  <button
                    key={courier.id}
                    className="flex p-2 hover:bg-color-gray-400 w-full border text-left rounded shadow-md mb-2"
                    onClick={() => handleSelectedCourier(courier.id)}
                  >
                    {courier.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className=" w-1/2 items-center flex flex-col">
            <div className="border p-3 ">
              <p className="font-semibold text-lg">Detail Checkout</p>
              <p className="font-semibold text-lg">Net Price</p>
              <p>{cartData?.net_price}</p>
              <p className="font-semibold text-lg">Shipping Cost</p>
              <p>{cartData?.shiping_cost}</p>
              <p className="font-semibold text-lg">Shipping Method</p>
              <p>{cartData?.shipping_method}</p>
              <p className="font-semibold text-lg">Total Cost</p>
              <p>{cartData?.total_cost}</p>
              <p className="font-semibold text-lg">Total Weight</p>
              <p>{cartData?.total_weight}</p>
              <div className="flex border rounded-md bg-color-accent hover:bg-color-gold">
                <button className="w-full p-2">Checkout</button>
              </div>
            </div>
          </div>
        </div>

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
