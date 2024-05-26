import React from "react";
import Button from "@/components/ui/Button";

const DetailProfile = ({ user, enterEditMode, setCurrentComponent }) => {
  const profileImage = user.photo
    ? `http://localhost:8000/${user.photo}`
    : "https://via.placeholder.com/150";

  const handleClick = () => {
    setCurrentComponent("detailProfile");
    enterEditMode();
  };

  return (
    <div className="w-full flex flex-col md:px-5 bg-color-primary">
      <div className="w-full flex flex-col h-auto md:p-10 p-6 border border-color-gray-200 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Personal Profile</h2>
        <div className="flex sm:flex-row md:flex-col lg:flex-row flex-col gap-4">
          <div className="sm:w-1/2 md:w-full lg:w-1/2 w-full flex flex-col justify-center items-center gap-2 border border-color-gray-200 shadow-sm p-6 rounded-md h-auto mr-10 ">
            <p className="block text-md font-semibold p-2">Profile Picture</p>
            <img
              className="w-full h-56 object-cover "
              src={profileImage}
              alt="Profile"
            />
          </div>
          <div className="flex flex-col gap-3 w-full text-sm">
            <div className="flex flex-row justify-start items-center gap-4 w-full">
              <label className="block text-color-dark text-sm w-1/5">
                Name
              </label>
              <p className="shadow-sm border border-color-gray-200 appearance-none rounded-md w-full h-9 mt-1 py-2 md:px-5 px-3 text-color-gray-700 leading-tight">
                {user.name}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center gap-4 w-full">
              <label className="block text-color-dark text-sm w-1/5">
                Email
              </label>
              <p className="shadow-sm border border-color-gray-200 appearance-none rounded-md  w-full h-9 mt-1 py-2 md:px-5 px-3 text-color-gray-700 leading-tight">
                {user.email}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center gap-4 w-full">
              <label className="block text-color-dark text-sm w-1/5">
                Phone
              </label>
              <p className="shadow-sm border border-color-gray-200 appearance-none rounded-md w-full h-9 py-2  md:px-5 px-3 text-color-gray-700 leading-tight">
                {user.phone_number}
              </p>
            </div>
            <Button
              onClick={handleClick}
              className="bg-color-green hover:bg-color-greenhover text-color-primary font-bold my-4 py-2 px-4 w-full rounded-md focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;
