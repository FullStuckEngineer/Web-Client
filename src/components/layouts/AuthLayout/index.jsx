import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authImage from "@/assets/images/AuthImage.svg";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getUser } from "@/modules/fetch/fetchUser";

const AuthLayout = (props) => {
  const { error, title, children, link, linkText, linkName, className } = props;
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = await getUser();
          if (user) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/"); 
    }
  }, [isLoggedIn, router]);

  return (
    <header className="flex flex-wrap justify-center items-center bg-color-secondary w-full min-h-screen md:pt-16 pt-28 md:px-10 px-5">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
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
                <span className="text-color-green font-bold">BabyBoo</span>{" "}
                {title}
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
        </>
      )}
    </header>
  );
};

export default AuthLayout;
