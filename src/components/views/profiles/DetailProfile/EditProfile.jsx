// components/views/profiles/EditProfile.js
import React, { useState } from "react";
import { uploadImage, deleteImage } from "@/modules/fetch/fetchUser";

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
      setRefresh((prev) => !prev)
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
      await deleteImage(id)
      setProfileImage(defaultImage)
      setImageUploaded(false)
      alert("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting picture: ", error)
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
    <div className="w-full flex flex-col my-20 gap-4">
      <div className="w-full flex flex-col h-auto mb-4 p-10 rounded-lg shadow-lg bg-gradient-to-br from-color-emerald-300 to-color-secondary">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col border h-auto mb-4 p-10 rounded-lg shadow-lg bg-gradient-to-br from-color-emerald-300 to-color-secondary"
        >
          <div className="flex flex-col border border-color-dark w-full p-4">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="number"
                name="phone_number"
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                placeholder="xxxx-xxxx-xxxx"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="mt-1 p-2 rounded-md w-full outline-0"
              />
            </div>
            <div className="flex flex-row gap-4 w-1/3">
              <button
                type="submit"
                className="w-auto p-2 rounded-lg h-10 border border-color-emerald-600 hover:transition-all hover:text-color-emerald-600 hover:bg-color-dark text-white my-2 shadow-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="w-auto p-2 rounded-lg h-10 border border-color-emerald-600 hover:transition-all hover:text-color-emerald-600 hover:bg-color-dark text-white my-2 shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
        <div className="w-full flex flex-col border h-auto mb-4 p-10 rounded-lg shadow-lg bg-gradient-to-br from-color-emerald-300 to-color-secondary">
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
            <>
              <button
                className="w-1/3 p-2 font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white my-2 shadow-sm hover:bg-color-secondary"
                onClick={() => document.getElementById("upload-input").click()}
              >
                Change Picture
              </button>
              {image && (
                <button
                  className="w-1/3 p-2 font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white shadow-sm hover:bg-color-green my-2"
                  onClick={handleUploadPicture}
                >
                  Confirm Upload
                </button>
              )}
              <button
                className="w-1/3 p-2 font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white shadow-sm hover:bg-color-red"
                onClick={() => handleDeletePicture(user.id)}
              >
                Delete Picture
              </button>
            </>
          ) : (
            <>
              <button
                className="w-1/3 p-2 font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white my-2 shadow-sm hover:bg-color-green"
                onClick={() => document.getElementById("upload-input").click()}
              >
                Upload Picture
              </button>
              {image && (
                <button
                  className="w-1/3 p-2 font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white shadow-sm hover:bg-color-green my-2"
                  onClick={handleUploadPicture}
                >
                  Confirm Upload
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
