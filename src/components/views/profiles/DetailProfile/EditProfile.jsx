"use client";

import React, { useState } from "react";
import { uploadImage, deleteImage } from "@/modules/fetch/fetchUser";
import Button from "@/components/ui/Button";

const EditProfile = ({
  user,
  handleUpdateUser,
  cancelEdit,
  setCurrentComponent,
  setRefresh,
}) => {
  const defaultImage = "https://via.placeholder.com/150";
  const [profileImage, setProfileImage] = useState(
    user.photo
      ? `http://localhost:8000/${user.photo.replace(/\\/g, "/")}`
      : defaultImage
  );

  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(Boolean(user.photo));

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
      setRefresh((prev) => !prev);
      setCurrentComponent("detailProfile");
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
      alert("Error uploading image");
    }
  };

  const handleDeletePicture = async (id) => {
    try {
      await deleteImage(id);
      setProfileImage(defaultImage);
      setImageUploaded(false);
      alert("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting picture: ", error);
    }
  };

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateUser(formData);
  };

  return (
    <div className="w-full flex flex-col md:px-5 bg-color-secondary">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col h-auto md:p-10 p-6 bg-color-primary border border-color-gray-200 rounded-md shadow-md"
      >
        <div className="flex flex-col w-full ">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <div className="flex sm:flex-row md:flex-col lg:flex-row flex-col gap-4">
            <div className="sm:w-1/2 md:w-full lg:w-1/2 w-full flex flex-col justify-center items-center gap-2 border border-color-gray-200 shadow-sm p-6 rounded-md h-auto mr-10 ">
              <img
                className="w-full h-56 object-cover "
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
                <div className="flex flex-col w-full">
                  <Button
                    className="w-full p-2 rounded-lg bg-color-gray-100  border border-color-green hover:transition-all text-color-green shadow-sm hover:bg-color-primary hover:border-color-greenhover"
                    onClick={() =>
                      document.getElementById("upload-input").click()
                    }
                  >
                    Ubah Foto
                  </Button>
                  {image && (
                    <Button
                      className="w-full p-2  rounded-lg bg-color-green hover:transition-all text-color-primary shadow-sm hover:bg-color-greenhover"
                      onClick={handleUploadPicture}
                    >
                      Upload
                    </Button>
                  )}
                  <Button
                    className="w-full p-2 rounded-lg bg-color-gray-100 hover:transition-all text-color-primary shadow-sm hover:bg-color-red"
                    onClick={() => handleDeletePicture(user.id)}
                  >
                    Hapus Foto
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col w-full gap-2">
                  <Button
                    className="w-full p-2 rounded-lg bg-color-gray-100  border border-color-green hover:transition-all text-color-green shadow-sm hover:bg-color-primary hover:border-color-greenhover"
                    onClick={() =>
                      document.getElementById("upload-input").click()
                    }
                  >
                    Pilih Foto
                  </Button>
                  {image && (
                    <Button
                      className="w-full p-2 rounded-lg bg-color-green hover:transition-all text-color-primary shadow-sm hover:bg-color-greenhover"
                      onClick={handleUploadPicture}
                    >
                      Upload
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full text-sm">
              <div className="flex flex-row justify-start items-center gap-4 w-full">
                <label className="block text-color-dark text-sm w-1/5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="py-2 md:px-5 px-3 rounded-md w-full ring-1 h-9 ring-color-gray-300 focus:ring-color-greenhover focus:outline-none shadow-sm"
                />
              </div>
              <div className="flex flex-row justify-start items-center gap-4 w-full">
                <label className="block text-color-dark text-sm w-1/5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 py-2 md:px-5 px-3 rounded-md w-full h-9 ring-1 ring-color-gray-300 focus:ring-color-greenhover focus:outline-none shadow-sm"
                />
              </div>
              <div className="flex flex-row justify-start items-center gap-4 w-full">
                <label className="block text-color-dark text-sm w-1/5">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone_number"
                  pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                  placeholder="xxxx-xxxx-xxxx"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="mt-1 py-2 md:px-5 px-3 rounded-md w-full ring-1 h-9 ring-color-gray-300 focus:ring-color-greenhover focus:outline-none shadow-sm"
                />
              </div>
              <div className="flex flex-row justify-between gap-4 w-full py-2 my-4">
                <Button
                  type="submit"
                  className="bg-color-green hover:bg-color-greenhover text-color-primary rounded-md h-10 w-full"
                >
                  Simpan
                </Button>
                <Button
                  type="button"
                  onClick={cancelEdit}
                  className="border border-color-green hover:border-color-greenhover text-color-green rounded-md h-10 w-full "
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
