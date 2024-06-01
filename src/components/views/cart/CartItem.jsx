import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { City, Minus, Trash } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { findAllProduct } from "@/modules/fetch/fetchProduct";

export default function CartItem({
  shopItems,
  handleRemoveItem,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  formatCurrency,
  formatWeight,
}) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [maxQuantities, setMaxQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await findAllProduct();
        const productMap = {};
        data.data.products.forEach((product) => {
          productMap[product.id] = product.stock;
        });
        setProducts(data.data.products);
        setMaxQuantities(productMap);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const initialQuantities = {};
    shopItems.forEach((item) => {
      initialQuantities[item.product_id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [shopItems]);

  const handleQuantityChange = (productId, value) => {
    const quantity = Math.max(
      1,
      Math.min(maxQuantities[productId], Number(value))
    );
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const getProductDetails = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product : { name: "Product Not Found", photo: "" };
  };

  return (
    <>
      {shopItems.map((item) => {
        const productDetails = getProductDetails(item.product_id);
        return (
          <div
            key={item.id}
            className="flex justify-between md:flex-row flex-col gap-2 md:px-10 px-3 md:py-10 py-4 bg-color-primary shadow-md w-full rounded-lg"
          >
            <div className="flex flex-row gap-2">
              <div className="flex items-center gap-3 w-full">
                <img
                  src={productDetails.photo}
                  alt={item.id}
                  className="border md:w-[100px] w-[60px]"
                />
                <div className="w-full">
                  <div className="font-medium text-lg w-48 line-clamp-2">
                    {productDetails.name}
                  </div>
                  <div className="font-normal text-sm w-48 line-clamp-2">
                    Berat barang {formatWeight(item.weight)}
                  </div>
                  <span className="font-normal text-[12px] text-color-green border px-1 rounded-sm border-color-green">
                    Bebas pengembalian
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end md:gap-5 gap-2">
              <h4 className="text-xl font-bold">
                {formatCurrency(item.price)}
              </h4>
              <div className="flex flex-row gap-3 text-color-gray-400 items-center">
                <Button
                  className="text-color-gray hover:text-color-red"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash size={20} />
                </Button>
                <div className="flex flex-row relative items-center justify-center">
                  <Button
                    className="w-7 h-7 absolute start-0 -top-[0.15rem] rounded-md hover:text-color-green"
                    onClick={() => handleDecreaseQuantity(item.product_id)}
                    disabled={quantities[item.product_id] <= 1}
                  >
                    -
                  </Button>
                  <div className="flex items-center justify-center border border-color-gray-400 focus:outline-none focus:border-color-green text-center w-20 h-7 py-2 px-6 rounded-lg text-color-dark">
                    <p>{quantities[item.product_id]}</p>
                  </div>
                  <Button
                    className=" w-7 h-7 absolute end-0 -top-[0.10rem] rounded-md hover:text-color-green"
                    onClick={() => handleIncreaseQuantity(item.product_id)}
                    disabled={
                      quantities[item.product_id] >=
                      maxQuantities[item.product_id]
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
