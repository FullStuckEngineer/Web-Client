import Image from "next/image";
import { Star } from "@phosphor-icons/react";

const ReviewCard = ({ photoReview }) => {
  return (
    <div className="w-80">
      <div className="flex flex-col w-full p-5 bg-color-primary border border-color-gray-200 rounded-lg shadow ">
        <div className="flex flex-row justify-start items-center gap-4">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
            src={photoReview}
            alt="Bonnie image"
          />
          <h5 className="text-xl font-medium text-color-gray-900 ">
            Bonnie Green
          </h5>
        </div>
        <div className="flex flex-row gap-1">
          <Star size={16} weight="fill" className="text-color-gold" />
          <p className="text-center text-sm">
            4.5 <span>(123 rating)</span>
          </p>
        </div>
        <p className="text-sm text-color-gray-500 dark:text-color-gray-400 truncate">
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit.”
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
