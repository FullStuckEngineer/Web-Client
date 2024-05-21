"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";
import axiosInstance from "@/libs/axios/axiosInstance";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    const form = event.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };

    try {
      const result = await axiosInstance.post("/v1/api/auth/register", data);

      if (result.status === 200 && result.data.success) {
        form.reset();
        setSuccessMessage("Registration successful. Redirecting to login...");
        setTimeout(() => {
          window.location.replace("/auth/login");
        }, 2000);
      } else {
        setIsLoading(false);
        setError(result.data.message || "Email is already registered");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setError(
          error.response.data.message ||
            "Something went wrong. Please try again."
        );
      } else if (error.request) {
        setError("No response received from server. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Sudah punya akun? "
      linkName="Login"
    >
      {error && (
        <p className=" flex gap-2 items-center border rounded-md border-color-red p-3 mb-5 text-color-red text-xs bg-color-red bg-opacity-10 ">
          <XCircle size={20} /> {error}
        </p>
      )}
      {successMessage && (
        <p className="flex gap-2 items-center border border-color-green rounded-md p-3 mb-5 text-color-green text-xs bg-color-green bg-opacity-10">
          <CheckCircle size={20} />
          {successMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input label="Name" name="name" type="text" placeholder="Name" />
        <Input label="Email" name="email" type="email" placeholder="Email" />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <Input label="Role" name="role" type="text" placeholder="Role" />
        <Button
          type="submit"
          className="w-full rounded-lg h-10 bg-color-green hover:bg-color-greenhover text-color-primary"
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
        <p className="text-color-dark font-normal text-[12px] text-center my-1">
          Dengan mendaftar, saya menyetujui Syarat dan Ketentuan serta Kebijakan
          Privasi
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
