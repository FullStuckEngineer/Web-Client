import Image from "next/image";
import authImage from "@/assets/images/AuthImage.svg";

const Carousel = () => {
  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <Image
            src={authImage}
            layout="fill"
            objectFit="cover"
            alt="AuthImage"
          />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <Image
            src={authImage}
            layout="fill"
            objectFit="cover"
            alt="AuthImage"
          />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <Image
            src={authImage}
            layout="fill"
            objectFit="cover"
            alt="AuthImage"
          />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <Image
            src={authImage}
            layout="fill"
            objectFit="cover"
            alt="AuthImage"
          />
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <Image
            src={authImage}
            layout="fill"
            objectFit="cover"
            alt="carousel-5"
          />
        </div>
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button
          type="button"
          className="w-3 h-3 rounded-full"
          aria-current="true"
          aria-label="Slide 1"
          data-carousel-slide-to="0"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 2"
          data-carousel-slide-to="1"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 3"
          data-carousel-slide-to="2"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 4"
          data-carousel-slide-to="3"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 5"
          data-carousel-slide-to="4"
        ></button>
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-color-primary/30 dark:bg-color-gray-800/30 group-hover:bg-color-primary/50 dark:group-hover:bg-color-gray-800/60 group-focus:ring-4 group-focus:ring-color-primary dark:group-focus:ring-color-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-color-primary dark:text-color-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-color-primary/30 dark:bg-color-gray-800/30 group-hover:bg-color-primary/50 dark:group-hover:bg-color-gray-800/60 group-focus:ring-4 group-focus:ring-color-primary dark:group-focus:ring-color-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-color-primary dark:text-color-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
