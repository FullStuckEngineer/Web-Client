import React, { useEffect, useState } from "react";
import { updateUser } from "@/modules/fetch/fetchUser";

const ChangePassword = ({ user, setCurrentComponent, setRefresh }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Reset form data
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

    // Check confirm password
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
    <div className="flex flex-row items-center p-8 w-full max-w-lg bg-white shadow-md rounded-lg">
      <div className="w-full h-auto max-w-lg p-8 bg-white shadow-md rounded-lg border border-color-grey-600">
        <form onSubmit={handleChangePassword} className="border p-3">
          <h2 className="text-xl font-semibold p-3">Change Password</h2>
          <label className="block p-2">Enter Old Password</label>
          <input
            type="password"
            placeholder="Enter Old Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md w-full"
          />
          {error.message && (
            <p className="text-red-500 text-xs mt-1">{error.message}</p>
          )}
          <label className="block p-2">Enter New Password</label>
          <input
            type="password"
            placeholder="Enter New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md w-full"
          />
          {error.newPassword && (
            <p className="text-red-500 text-xs mt-1">{error.newPassword}</p>
          )}
          <label className="block p-2">Enter Confirm Password</label>
          <input
            type="password"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 rounded-md w-full"
          />
          {error.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{error.confirmPassword}</p>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
