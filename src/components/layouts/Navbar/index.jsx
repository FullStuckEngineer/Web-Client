"use client";

import React, { useState, useEffect } from "react";
import InputSearch from "@/components/layouts/Navbar/InputSearch";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { BellSimple, ShoppingCart, User } from "@phosphor-icons/react";
import { getUser } from "@/modules/fetch/fetchUser";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = await getUser();
          setUser(user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  const handleStorageChange = (event) => {
    if (event.key === "token") {
      const token = event.newValue;
      if (token) {
        getUser()
          .then((user) => {
            setUser(user);
            setIsLoggedIn(true);
          })
          .catch((error) => {
            console.error("Error fetching user after token change:", error);
            setIsLoggedIn(false);
          });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="fixed md:px-10 px-2 bg-color-primary z-10 navbar-border w-full shadow-sm">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
        <Link
          href="/"
          className="font-bold text-color-green hover:text-color-greenhover text-2xl"
        >
          BabyBoo
        </Link>
        <div
          className={`flex md:flex-row  ${
            isLoggedIn ? "flex-row" : "flex-col"
          }  justify-between md:items-center md:gap-8 gap-4`}
        >
          <div className="flex flex-row justify-between md:gap-8 gap-1 items-center w-full">
            <InputSearch className="border-[2px] border-color-gray focus:border-color-greenhover sm:text-md text-sm focus:outline-none sm:w-[450px] md:w-[300px] lg:w-[500px] w-full" />
            <div className="flex flex-row justify-center items-center md:gap-2 gap-1">
              <Link href="/notif">
                <Button className="hover:bg-color-greenhover hover:text-color-primary text-color-gray p-1 rounded-lg">
                  <BellSimple size={26} />
                </Button>
              </Link>
              <Link href="/carts">
                <Button className="hover:bg-color-greenhover hover:text-color-primary text-color-gray p-1 rounded-lg">
                  <ShoppingCart size={26} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex sm:flex-row justify-between items-center md:items-center gap-3">
            {isLoggedIn ? (
              <div className="relative ">
                <Button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="hover:bg-color-greenhover hover:text-color-primary text-color-gray p-1 rounded-lg"
                >
                  <User size={26} />
                </Button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-color-primary rounded-md shadow-lg z-50">
                    <Link href="/profiles">
                      <Button className="block px-4 py-2 text-sm text-color-gray hover:bg-color-greenhover hover:text-color-primary w-full text-left">
                        Profile
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-color-gray hover:bg-color-greenhover hover:text-color-primary w-full text-left"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button className="border border-color-green hover:border-color-greenhover text-color-green rounded-lg h-10 md:w-32 w-40 ">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-lg h-10 md:w-32 w-40 ">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
