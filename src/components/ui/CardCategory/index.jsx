import { findAll, findAllCategories } from "@/modules/fetch/fetchCategory";
import Image from "next/image";
import { useEffect, useState } from "react";

const CardCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const listCategories = await findAllCategories();
        setCategories(listCategories);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-row w-48 gap-5">
      <a
        href="#"
        className="flex flex-col items-center bg-color-primary border border-color-gray-200 rounded-md shadow hover:bg-color-gray-100"
      >
        <Image
          className="object-cover h-auto w-44"
          width={50}
          height={50}
          alt="image"
        />
        <div className="flex flex-col justify-between p-2 leading-normal">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-color-gray-900 ">
            Cloth
          </h5>
        </div>
      </a>
    </div>
  );
};

export default CardCategory;
