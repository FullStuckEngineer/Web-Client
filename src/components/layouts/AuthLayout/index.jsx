import Image from "next/image";
import Link from "next/link";
import authImage from "@/assets/images/AuthImage.svg";

const AuthLayout = (props) => {
  const { error, title, children, link, linkText, linkName, className } = props;
  return (
    <header className="flex flex-wrap justify-center items-center bg-color-secondary w-full min-h-screen md:pt-16 pt-28 md:px-10 px-5">
      <div className="hidden md:flex items-center justify-center md:w-1/2 w-full">
        <Image
          src={authImage}
          width={500}
          height={300}
          className="rounded-xl p-5"
          alt="Auth Image"
        />
      </div>
      <div className="flex flex-col items-center justify-center md:w-1/2 w-full h-max">
        {error && <p className="text-color-red mb-2">{error}</p>}
        <div className="w-full bg-color-primary md:w-2/3 px-10 md:py-14 py-10 shadow-xl rounded-lg">
          <h1 className="md:text-[32px] text-[25px] font-medium mb-2 ">
            <span className="text-color-green font-bold">BabyBoo</span> {title}
          </h1>
          {children}
          <p className="text-color-dark text-sm text-center mt-4">
            {linkText}
            <Link
              href={link}
              className="text-color-green hover:text-color-greenhover font-bold"
            >
              {linkName}
            </Link>
          </p>
        </div>
      </div>
    </header>
  );
};

export default AuthLayout;
