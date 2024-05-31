import { findAll } from "@/modules/fetch/fetchCategory";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";

const CardCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const perPage = 6;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const listCategories = await findAll();
        setCategories(listCategories);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategory();
  }, []);

  const validCategories = categories?.data?.categories || [];
  const totalItems = validCategories.length;

  const handleNextPage = () => {
    setPage((prevPage) => (prevPage + 1) % totalItems);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage - 1 + totalItems) % totalItems);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentCategories = [];
  for (let i = 0; i < perPage; i++) {
    currentCategories.push(validCategories[(page + i) % totalItems]);
  }

  return (
    <div
      className="relative flex flex-row w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full flex flex-wrap md:flex-row flex-col justify-between gap-4">
        {currentCategories.length > 0 &&
          currentCategories.map(
            (category, index) =>
              category && (
                <Link key={index} href={`/categories/${category.id}`}>
                  <div className="flex flex-col items-center bg-color-primary border border-color-gray-200 rounded-md shadow hover:bg-color-gray-100 w-48">
                    <div className="flex flex-col justify-center items-center py-8 leading-normal">
                      <h5 className="text-md font-semibold tracking-tight text-color-gray-900">
                        {category.name}
                      </h5>
                    </div>
                  </div>
                </Link>
              )
          )}
      </div>
      {isHovered && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handlePreviousPage}
            className={`absolute bottom-6 -left-5 text-color-gray-400 hover:text-color-gray-600 p-2 bg-color-primary shadow-md rounded-full transition-transform transform-gpu hover:bg-color-gray-100`}
          >
            <CaretLeft size={25} />
          </button>
          <button
            onClick={handleNextPage}
            className={`absolute bottom-6 -right-5 text-color-gray-400 hover:text-color-gray-600 p-2 bg-color-primary shadow-md rounded-full transition-transform transform-gpu hover:bg-color-gray-100`}
          >
            <CaretRight size={25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardCategory;