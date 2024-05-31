"use client";

import { useEffect, useState } from "react";
import CardProduct from "@/components/ui/CardProduct";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { findOne } from "@/modules/fetch/fetchCategory";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const CategoriesView = ({ categoryId }) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await findOne(categoryId);
        setCategory([categoryData.data]);

        const productData = await findAllProduct();
        setProducts(productData.data.products);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  const getProductsForCategory = (categoryId) => {
    return products.filter((product) => product.category_id === categoryId);
  };

  return (
    <div className="flex flex-col md:px-24 px-10 py-32 md:py-[5.5rem]">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-col">
            {category &&
              category.map((categoryItem) => (
                <div key={categoryItem.id} className="category-section">
                  <div className="flex flex-col justify-center items-start md:my-10 my-4 text-color-gray-700">
                    <h3 className="text-xl font-semibold text-color-dark">
                      Kategori {categoryItem.name}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-evenly mb-4">
                    <CardProduct
                      products={getProductsForCategory(categoryItem.id).slice(
                        0,
                        5
                      )}
                    />
                  </div>
                  <hr className="my-12 text-color-gray-300" />
                </div>
              ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="md:hidden flex justify-end items-center w-full mt-4"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesView;
