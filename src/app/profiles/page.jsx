"use client"

import React, { useState, useEffect } from "react";
import ProfileView from "@/components/views/profiles/DetailProfile";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ProfilesPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return <div>{loading ? <LoadingSpinner /> : <ProfileView />}</div>;
};

export default ProfilesPage;
