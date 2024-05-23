"use client";

import Button from "@/components/ui/Button";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";

const CardProduct = ({ products }) => {
  return (
    <div className="flex flex-wrap mt-20">
      {products.data &&
        products.data.products &&
        products.data.products.length > 0 &&
        products.data.products.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-xs bg-color-secondary border border-color-secondary rounded-lg shadow-md flex flex-col justify-between mx-3 my-2"
          >
            <Link href={`/products/${product.id}`}>
              <img
                src={product.photo || "/placeholder.jpg"} // Ganti dengan placeholder jika photo null
                className="p-8 rounded-t-lg h-60 w-full object-cover"
                alt={product.name}
                loading="lazy"
              />
              <div className="px-8 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-white">
                  {product.name}
                </h5>
                <p className="text-sm text-white">{product.description}</p>
              </div>
            </Link>
            <div className="flex flex-col px-8 pb-5">
              <h5 className="text-xl font-bold text-white">
                Rp. <span>{product.price}</span>
              </h5>
              <div className="flex justify-end gap-2">
                <Button className="flex bg-color-primary justify-center items-center text-color-red gap-2 py-2 px-2 rounded-lg">
                  <Heart size={32} weight="fill" />
                </Button>
                <Button className="flex bg-color-green justify-center items-center text-color-primary gap-2 py-2 px-2 rounded-lg">
                  <ShoppingCart size={32} />
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardProduct;
