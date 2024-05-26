"use client";

import React, { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import EditProfile from "./EditProfile";
import UserProfile from "./DetailProfile";
import AddAddress from "../address/AddAddress";
import AddressList from "../address/AddressList";
import UpdateAddress from "../address/UpdateAddress";
import CheckoutList from "./CheckoutList";
import ChangePassword from "./ChangePassword";
import { getUser, updateUser } from "@/modules/fetch/fetchUser";
import { jwtDecode } from "jwt-decode";

const ProfileView = () => {
  const [currentComponent, setCurrentComponent] = useState("detailProfile");
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const enterEditMode = () => {
    setEditMode(true);
    setCurrentComponent("editProfile");
  };

  const cancelEdit = () => {
    setEditMode(false);
    setCurrentComponent("userProfile");
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "userProfile":
        return (
          <UserProfile
            user={user}
            enterEditMode={enterEditMode}
            setCurrentComponent={setCurrentComponent}
            refresh={refresh}
          />
        );
      case "editProfile":
        return (
          <EditProfile
            user={user}
            handleUpdateUser={handleUpdateUser}
            cancelEdit={cancelEdit}
            setCurrentComponent={setCurrentComponent}
            setRefresh={setRefresh}
          />
        );
      case "addressList":
        return (
          <AddressList
            user={user}
            setCurrentComponent={setCurrentComponent}
            refresh={refresh}
          />
        );
      case "changePassword":
        return (
          <ChangePassword
            user={user}
            setCurrentComponent={setCurrentComponent}
            setRefresh={setRefresh}
          />
        );
      case "checkoutList":
        return (
          <CheckoutList
            user={user}
            setCurrentComponent={setCurrentComponent}
            refresh={refresh}
          />
        );
      case "addAddress":
        return (
          <AddAddress
            onClose={() => {
              setCurrentComponent("addressList");
              setRefresh((prev) => !prev);
            }}
            setCurrentComponent={setCurrentComponent}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        );
      case "updateAddress":
        return (
          <UpdateAddress
            user={user}
            setCurrentComponent={setCurrentComponent}
            setRefresh={setRefresh}
          />
        );
      default:
        return (
          <UserProfile
            user={user}
            enterEditMode={enterEditMode}
            setCurrentComponent={setCurrentComponent}
            refresh={refresh}
          />
        );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const fetchUser = async () => {
        try {
          const userData = await getUser(userId);
          console.log("User Data:", userData);
          setUser(userData);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [refresh]);

  const handleUpdateUser = async (formData) => {
    try {
      await updateUser(formData);
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className=" bg-color-primary flex justify-center items-start gap-16 md:flex-row flex-col w-full py-[6rem] px-8 min-h-screen">
      <SidebarProfile setCurrentComponent={setCurrentComponent} />
      <div className="flex flex-col items-center pt-24 md:pt-0 w-full md:w-8/12">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProfileView;
