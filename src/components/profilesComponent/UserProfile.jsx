import React from "react";

const DetailProfile = ({ user, enterEditMode, editMode }) => {
  return (
    <div className="flex flex-row items-center p-8 bg-gradient-to-br from-color-emerald-3 00 to-white w-full py-20">
      <div className="w-4/12 h-screen p-10">
        <h2 className="flex flex-row text-2xl font-bold mb-20">
          Account Setting
        </h2>
        <div className="flex flex-col items-start">
          <button className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2 hover:bg-color-secondary">
            List Address
          </button>
          <button className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2 hover:bg-color-secondary">
            Change Password
          </button>
          <button className="w-full text-left p-2 rounded-lg h-10 hover:transition-all my-2  hover:bg-color-secondary">
            Checkout List
          </button>
        </div>
      </div>

      <div className="w-full h-screen bg-white shadow-md bg-gradient-to-br from-color-emerald-300 to-color-secondary rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 p-2">Personal Profile</h2>

        <div className="flex justify-center gap-4">
          <img
            className="w-36 h-36 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <div className="flex flex-col p-2 w-52">
            <button className="w-full font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white my-2 shadow-sm hover:bg-color-secondary">
              Change Picture
            </button>
            <button className="w-full font-bold rounded-lg h-10 bg-color-emerald-100 hover:transition-all text-white shadow-sm hover:bg-color-red">
              Delete Picture
            </button>
          </div>
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
              className="w-1/4 bg-color-grey-200 shadow-md p-3"
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
              className="w-1/4 bg-color-grey-200 shadow-md p-3"
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
              className="w-1/4 bg-color-grey-200 shadow-md p-3"
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

{
  /* <div className="w-full max-w-md mb-4 p-4 border border-gray-200 rounded-lg shadow-lg mt-20">
<h2 className="text-xl font-semibold mb-4">Profile</h2>
<p>
  <strong>Name:</strong> {user.name}
</p>
<p>
  <strong>Email:</strong> {user.email}
</p>
<p>
  <strong>Phone Number:</strong> {user.phone_number}
</p>
<button
  onClick={enterEditMode}
  className="w-full rounded-lg h-10 bg-green-600 hover:bg-green-700 text-white my-2"
>
  Edit Profile
</button>
</div> */
}
