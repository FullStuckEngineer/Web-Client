"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";
import axiosInstance from "@/libs/axios/axiosInstance";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

const LoginView = () => {
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
      email: form.email.value,
      role: form.role.value,
      password: form.password.value,
    };

    try {
      const result = await axiosInstance.post("/v1/api/auth/login", data);

      if (result.status === 201 && result.data.success) {
        form.reset();
        setSuccessMessage("Login successful. Redirecting...");
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      } else {
        setIsLoading(false);
        setError(result.data.message || "Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setError(
          error.response.data.message || "Email or password is incorrect"
        );
      } else if (error.request) {
        setError("No response received from server. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Belum punya akun? "
      linkName="Register"
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
          className="w-full rounded-lg h-10 bg-color-green hover:bg-color-greenhover text-color-primary my-2"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginView;
