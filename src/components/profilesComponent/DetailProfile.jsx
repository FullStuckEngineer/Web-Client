import React, { useState } from "react";
import { uploadImage } from "@/modules/fetch/fetchUser";

const DetailProfile = ({ user, enterEditMode, setCurrentComponent }) => {
  const [profileImage, setProfileImage] = useState(
    user.photo || "https://via.placeholder.com/150"
  );
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleChangePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPicture = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await uploadImage(formData);
      setProfileImage(response.photo);
      setImageUploaded(true);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
      alert("Error uploading image");
    }
  };

  const handleDeletePicture = async () => {
    const formDataDelete = new FormData();
    formData.append("image", "");

    try {
      const response = await uploadImage(formDataDelete);
      setProfileImage("https://via.placeholder.com/150");
      setImage(null);
      setImageUploaded(false);
      alert("Image deleted successfully");
    } catch (error) {
      console.error(
        "Error Delete Image: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex flex-row items-center p-8 bg-gradient-to-br from-color-emerald-3 00 to-white w-full py-20">
      <div className="w-4/12 h-screen p-10">
        <button
          onClick={() => setCurrentComponent("detailProfile")}
          className="flex flex-row text-2xl font-bold mb-20"
        >
          Account Setting
        </button>
        <div className="flex flex-col items-start">
          <button
            onClick={() => setCurrentComponent("addressList")}
            className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2 hover:bg-color-secondary"
          >
            List Address
          </button>
          <button
            onClick={() => setCurrentComponent("changePassword")}
            className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2 hover:bg-color-secondary"
          >
            Change Password
          </button>
          <button
            onClick={() => setCurrentComponent("checkoutList")}
            className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2  hover:bg-color-secondary"
          >
            Checkout List
          </button>
        </div>
      </div>

      <div className="w-full h-screen bg-white shadow-md bg-gradient-to-br from-color-emerald-300 to-color-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 p-2">Personal Profile</h2>

        <div className="flex justify-center gap-4">
          <img
            className="w-36 h-36 rounded-full"
            src={profileImage}
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleChangePicture}
            style={{ display: "none" }}
            id="upload-input"
          />
          {imageUploaded ? (
            <button
              className="w-full font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white my-2 shadow-sm hover:bg-color-secondary"
              onClick={() => document.getElementById("upload-input").click()}
            >
              Change Picture
            </button>
          ) : (
            <button
              className="w-full font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white my-2 shadow-sm hover:bg-color-green"
              onClick={() => document.getElementById("upload-input").click()}
            >
              Upload Picture
            </button>
          )}
          {image && !imageUploaded && (
            <button
              className="w-full font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white shadow-sm hover:bg-color-green my-2"
              onClick={handleUploadPicture}
            >
              Upload Picture
            </button>
          )}
          {imageUploaded && (
            <button
              className="w-full font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white shadow-sm hover:bg-color-red"
              onClick={handleDeletePicture}
            >
              Delete Picture
            </button>
          )}
        </div>

        <form className="py-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <p
              className="w-1/3 bg-color-grey-200 shadow-md p-3"
              aria-placeholder="User Data Here"
            >
              {user.name}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <p
              className="w-1/3 bg-color-grey-200 shadow-md p-3"
              aria-placeholder="User Email Here"
            >
              {user.email}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <p
              className="w-1/3 bg-color-grey-200 shadow-md p-3"
              aria-placeholder="User Phone Nmber Here"
            >
              {user.phone_number}
            </p>
          </div>
          <div className="mb-4 flex justify-center items-center ">
            <button
              onClick={enterEditMode}
              className="w-1/4 font-bold rounded-lg h-10 bg-color-secondary hover:transition-all text-white my-2 shadow-md hover:bg-color-primary"
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailProfile;
