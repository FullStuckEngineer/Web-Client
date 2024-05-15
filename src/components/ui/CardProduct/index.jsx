"use client";

import Button from "@/components/ui/Button";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";
export const CardProduct = () => {
  return (
    <header className="w-full max-w-xs bg-slate-800 border border-slate-600 rounded-lg shadow flex flex-col justify-between mx-3 my-2">
      <Link href={"/product"}>
        <img
          src=""
          className="p-8 rounded-t-lg h-60 w-full object-cover"
          alt="product"
          loading="lazy"
        />
        <span className="">New</span>

        <div className="">
          <h5 className="">123</h5>
          <p className="">123</p>
        </div>
      </Link>
      <div className="flex flex-col px-8 pb-5">
        <h5 className="text-xl font-bold text-white">
          Rp : <span>1000</span>
        </h5>
        <div className="flex justify-end">
          <Button className="flex bg-color-primary justify-center items-center text-color-red gap-2 py-2 px-2 w-auto">
            <Heart size={32} weight="fill" />
          </Button>
          <Button className="flex bg-color-green justify-center items-center text-color-primary gap-2 py-2 px-2 w-auto">
            <ShoppingCart size={32} />
          </Button>
        </div>
      </div>
    </header>
  );
};
