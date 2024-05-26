import Image from "next/image";
import authImage from "@/assets/images/AuthImage.svg";

const CardCategory = () => {
  return (
    <div className="flex flex-row w-50 gap-5">
      <a
        href="#"
        className="flex flex-col items-center bg-color-primary border border-color-gray-200 rounded-md shadow hover:bg-color-gray-100"
      >
        <Image
          className="object-cover w-full h-96 md:h-auto md:w-48"
          src={authImage}
          width={50}
          height={50}
          alt="AuthImage"
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
