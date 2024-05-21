"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/layouts/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const callbackUrl = "/"; // Sesuaikan URL tujuan setelah login

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };

    try {
      const result = await fetch("http://localhost:8000/v1/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await result.json();
      console.log(resData, "<<<<<RES DATA")

      if (result.ok) {
        localStorage.setItem("token", resData.accessToken );
        setIsLoading(false);
        form.reset();
        router.push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(resData.message || "Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText=" Belum punya akun? "
      linkName=" Register"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input label="Email" name="email" type="email" placeholder="Email" />
        <Input label="Role" name="role" type="text" placeholder="Role" />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button
          type="submit"
          className="w-full rounded-lg h-10 bg-color-green hover:bg-color-greenhover text-color-primary mt-2 mb-8"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </AuthLayout>
  );
};

export default LoginView;
