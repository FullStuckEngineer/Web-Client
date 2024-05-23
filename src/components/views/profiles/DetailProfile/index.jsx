"use client";

import React, { useEffect, useState } from "react";
import EditProfile from "@/components/views/profiles/DetailProfile/EditProfile";
import UserProfile from "@/components/views/profiles/DetailProfile/UserProfile";
import SidebarProfile from "@/components/views/profiles/DetailProfile/SidebarProfile";
import { getUser, updateUser } from "@/modules/fetch/fetchUser";
import { jwtDecode } from "jwt-decode";

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

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
    } else {
      setLoading(false);
      setError("No token found");
    }
  }, []);

  const handleUpdateUser = async (formData) => {
    try {
      await updateUser(formData);
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex md:flex-row flex-col items-center w-full md:py-[6rem] py-[7rem] pb-8 px-8 bg-color-grey-50 min-h-screen">
      <SidebarProfile />
      <div className="flex flex-col items-center w-full md:w-8/12">
        {editMode ? (
          <EditProfile
            user={user}
            handleUpdateUser={handleUpdateUser}
            cancelEdit={cancelEdit}
          />
        ) : (
          <UserProfile user={user} enterEditMode={enterEditMode} />
        )}
      </div>
    </div>
  );
};

export default ProfileView;
