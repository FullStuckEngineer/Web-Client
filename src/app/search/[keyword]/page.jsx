"use client"

import { useState, useEffect } from "react";
import CardProduct from "@/components/ui/CardProduct";
import { findProductBySearch } from "@/modules/fetch/fetchProduct";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const SearchPage = ({ params }) => {
  const { keyword } = params;
  const decodeKeyword = decodeURI(keyword);
  const [loading, setLoading] = useState(true); // State loading

  const [products, setProducts] = useState({ data: { products: [] } });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await findProductBySearch(decodeKeyword);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodeKeyword]);

  return (
    <div>
      <section className="flex flex-col md:px-24 px-10 py-32 md:py-[5.5rem]">
        <div className="text-xl font-semibold text-color-dark md:my-10 my-4">{`Pencarian untuk ${decodeKeyword}...`}</div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <CardProduct products={products.data.products} />
        )}
      </section>
    </div>
  );
};

export default SearchPage;
