"use client";

import InputSearch from "@/components/layouts/Navbar/InputSearch";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="px-10 bg-transparent z-10 navbar-border w-full">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
        <Link href="/" className="font-bold text-color-dark text-2xl">
          SmartBaby
        </Link>
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-32">
          <InputSearch />
          <div className="flex md:flex-row flex-col justify-between md:items-center gap-3">
            <Link href="/auth/login">
              <Button
                className="border border-color-green text-color-green"
                onClick={() => (session ? signOut() : signIn())}
              >
                {session ? "Logout" : "Login"}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-color-green text-color-primary">
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
