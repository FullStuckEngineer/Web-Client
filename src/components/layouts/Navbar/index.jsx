"use client";

import InputSearch from "@/components/layouts/Navbar/InputSearch";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  

  return (
    <header className="absolute md:px-10 px-5 bg-color-secondary z-10 navbar-border w-full shadow-sm">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
        <Link href="/" className="font-bold text-color-green text-2xl">
          BabyBoo
        </Link>
        <div className="flex md:flex-row flex-col justify-between md:items-center lg:gap-32 md:gap-4 gap-4">
          <InputSearch className="border-[2px] border-color-grey focus:border-color-green focus:outline-none lg:w-[500px] md:w-[300px] w-full" />
          <div className="flex sm:flex-row justify-between md:items-center gap-3">
            <Link href="/auth/login">
              <Button className="border border-color-green text-color-green rounded-lg h-10 md:w-32 w-36 ">
                {session ? "Logout" : "Login"}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-color-green text-color-primary rounded-lg h-10 md:w-32 w-36 ">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
