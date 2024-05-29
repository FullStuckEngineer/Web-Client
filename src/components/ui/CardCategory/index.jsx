import { findAll } from "@/modules/fetch/fetchCategory";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const CardCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isHovered, setIsHovered] = useState(false); // State untuk menentukan apakah kumpulan kartu disentuh atau tidak
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
  const startIndex = (page - 1) * perPage;
  const currentCategories = validCategories.slice(
    startIndex,
    startIndex + perPage
  );
  const totalPages = Math.ceil(validCategories.length / perPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
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

  return (
    <div
      className="flex flex-row w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full flex flex-wrap md:flex-row flex-col justify-between gap-4">
        {currentCategories.length > 0 &&
          currentCategories.map((category) => (
            <a
              key={category.id}
              href="#"
              className="relative flex flex-col items-center bg-color-primary border border-color-gray-200 rounded-md shadow hover:bg-color-gray-100 w-48"
            >
              <div className="mt-10">
                <Image
                  src={category.photo || "/placeholder.jpg"}
                  alt={category.name}
                  width={50}
                  height={50}
                  className="object-cover h-auto w-full"
                />
              </div>
              <div className="flex flex-col justify-between p-2 leading-normal">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-color-gray-900 ">
                  {category.name}
                </h5>
              </div>
            </a>
          ))}
      </div>
      {isHovered && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="absolute bottom-20 text-color-gray-400 hover:text-color-gray-600 left-20 p-2 bg-color-primary shadow-md rounded-full transition-transform transform-gpu hover:bg-color-gray-100"
          >
            <CaretLeft size={32} />
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="absolute bottom-20 text-color-gray-400 hover:text-color-gray-600 right-20 p-2 bg-color-primary shadow-md rounded-full transition-transform transform-gpu hover:bg-color-gray-100"
          >
            <CaretRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardCategory;
