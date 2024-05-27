"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";

const CardProduct = ({ products }) => {
  const [lovedProducts, setLovedProducts] = useState({});

  const handleLoveClick = (productId) => {
    setLovedProducts((prevLovedProducts) => ({
      ...prevLovedProducts,
      [productId]: !prevLovedProducts[productId],
    }));
  };

  return (
    <div className="flex flex-wrap md:flex-row flex-col justify-between gap-4">
      {products?.data &&
        products?.data.products &&
        products?.data.products.length > 0 &&
        products?.data.products.map((product) => (
          <div
            key={product.id}
            className="md:w-[24%] w-full bg-color-secondary border border-color-gray-200 rounded-lg shadow-md flex flex-col justify-between p-5"
          >
            <Link href={`/products/${product.slug}`}>
              <img
                src={product.photo || "/placeholder.jpg"}
                className="rounded-t-md h-72 w-full object-cover"
                alt={product.name}
                loading="lazy"
              />
              <div className="pt-5 pb-5 w-full">
                <h5 className="text-xl font-semibold tracking-tight text-white">
                  {product.name}
                </h5>
                <p className="text-sm text-white w-full line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>
            <div className="flex flex-col pb-5">
              <h5 className="text-xl font-bold text-white">
                Rp. <span>{product.price}</span>
              </h5>
              <div className="flex justify-end gap-4">
                <Button
                  className={`flex ${
                    lovedProducts[product.id]
                      ? "text-color-red"
                      : "text-color-gray-300"
                  } border border-color-gray-300 justify-center items-center text-color-gray-200 bg-color-primary gap-2 py-2 px-2 rounded-lg`}
                  onClick={() => handleLoveClick(product.id)}
                >
                  <Heart size={25} weight="fill" />
                </Button>
                <Button className="flex bg-color-green justify-center items-center text-color-primary gap-2 py-2 px-2 rounded-lg">
                  <ShoppingCart size={25} />
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardProduct;
