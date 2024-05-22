"use client";

import React, { useState, useEffect } from "react";
import InputSearch from "@/components/layouts/Navbar/InputSearch";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { BellSimple, ShoppingCart, User } from "@phosphor-icons/react";

const Navbar = () => {
  // State untuk simulasi login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulasikan pengecekan status login
    const checkLoginStatus = () => {
      // Misalnya menggunakan localStorage untuk menyimpan token
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    // Logout logika (misalnya menghapus token dari localStorage)
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.replace("/"); // Redirect setelah logout
  };

  return (
    <header className="fixed md:px-10 px-2 bg-color-primary z-10 navbar-border w-full shadow-sm">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
        <Link
          href="/"
          className="font-bold text-color-green hover:text-color-greenhover text-2xl"
        >
          BabyBoo
        </Link>
        <div className="flex md:flex-row flex-col justify-between md:items-center md:gap-8 gap-4">
          <div className="flex flex-row justify-between md:gap-8 gap-1 items-center w-full">
            <InputSearch className="border-[2px] border-color-grey focus:border-color-greenhover sm:text-md text-sm focus:outline-none sm:w-[450px] md:w-[300px] lg:w-[500px] w-full" />
            <div className="flex flex-row justify-center items-center md:gap-2 gap-1">
              <Link href="/notif">
                <Button className="hover:bg-color-greenhover hover:text-color-primary text-color-grey p-1 rounded-lg">
                  <BellSimple size={26} />
                </Button>
              </Link>
              <Link href="/carts">
                <Button className="hover:bg-color-greenhover hover:text-color-primary text-color-grey p-1 rounded-lg">
                  <ShoppingCart size={26} />
                </Button>
              </Link>
              <Link href="/profiles">
                <Button className="hover:bg-color-greenhover hover:text-color-primary text-color-grey p-1 rounded-lg">
                  <User size={26} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex sm:flex-row justify-between items-center md:items-center gap-3">
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="border border-color-green hover:border-color-greenhover text-color-green rounded-lg h-10 md:w-32 w-40 "
              >
                Logout
              </Button>
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
