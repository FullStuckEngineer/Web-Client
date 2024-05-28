"use client"

import React, { useEffect, useState } from "react";
import { updateUser } from "@/modules/fetch/fetchUser";
import Button from "@/components/ui/Button";
import { XCircle } from "@phosphor-icons/react";

const ChangePassword = ({ user, setCurrentComponent, setRefresh }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [setRefresh((prev) => !prev)]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess("");

    // Check password length
    if (formData.newPassword.length < 6) {
      setError((prevErrors) => ({
        ...prevErrors,
        newPassword: "Password must be at least 6 characters",
      }));
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Password does not match",
      }));
      return;
    }

    try {
      const data = {
        id: user.id,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };

      const response = await updateUser(data);

      if (response.success) {
        setSuccess("Password successfully changed!");
        setCurrentComponent("detailProfile");
      } else {
        setError({ oldPassword: response.message });
      }
    } catch (error) {
      setError({ general: error.message });
    }
  };

  //logic untuk cek password lama
  //jika password lama benar maka lanjut
  //cek password baru
  //akan error jika: pass yg dimasukan sama dengan pass lama, panjang karakter pass kurang dari 6
  //cek konfirmasi password
  //jika tidak sama dengan password baru, akan error
  //jika sama maka password akan terubah

  return (
    <div className="w-full h-auto max-w-lg p-8 bg-color-primary border border-color-gray-200 rounded-md shadow-md">
      <form
        onSubmit={handleChangePassword}
        className="w-full flex flex-col h-auto md:p-10 p-6  "
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <label className="text-color-dark text-sm">
              Enter Old Password
            </label>
            <input
              type="password"
              placeholder="********"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
              className="mt-2 py-2 px-3 rounded-md w-full ring-1 ring-color-gray-300 focus:ring-color-greenhover focus:outline-none shadow-sm"
            />
            {error.message && (
              <p className="flex gap-2 items-center border rounded-md border-color-red p-3 mb-5 text-color-red text-xs bg-color-red bg-opacity-10">
                <XCircle size={20} />
                {error.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-color-dark text-sm">
              Enter New Password
            </label>
            <input
              type="password"
              placeholder="********"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="mt-2 py-2 px-3 rounded-md w-full ring-1 ring-color-gray-300 focus:ring-color-greenhover focus:outline-none shadow-sm"
            />
            {error.newPassword && (
              <p className="flex gap-2 items-center border rounded-md border-color-red p-3 mb-5 text-color-red text-xs bg-color-red bg-opacity-10">
                <XCircle size={20} />
                {error.newPassword}
              </p>
            )}
          </div>
          <div className="">
            <label className="text-color-dark text-sm">
              Enter Confirm Password
            </label>
            <input
              type="password"
              placeholder="********"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-2 py-2 px-3 rounded-md w-full ring-1 ring-color-gray-300 focus:ring-color-greenhover focus:outline-none shadow-sm"
            />{" "}
          </div>
          {error.confirmPassword && (
            <p className="flex gap-2 items-center border rounded-md border-color-red p-3 mb-5 text-color-red text-xs bg-color-red bg-opacity-10">
              <XCircle size={20} />
              {error.confirmPassword}
            </p>
          )}
        </div>
        <Button
          className="bg-color-green hover:bg-color-greenhover text-color-primary font-bold my-4 py-2 px-4 w-full rounded-md focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
