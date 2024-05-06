import Link from "next/link";
import React from "react";
import EditUserModal from "./EditUserModal";

const getUserDetails = () => {
  return {
    name: "John",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    password: "********",
  };
};

export default function UserPopoverItem() {

  const userDetails = getUserDetails();

  return (
    <div>
      <div className="">
        <h1 className="mb-4 font-bold text-2xl">Hello {userDetails.name}!</h1>
        <div className="border-b border-gray-500"></div>
      </div>
      <div className="flex justify-between mb-7 mt-4">
        <div className="flex flex-col gap-y-2">
          <div className="">
            <h1 className="mt-2 text-gray-500">Name</h1>
            <h2>{userDetails.name}</h2>
          </div>
          <div>
            <h1 className="text-gray-500">Email</h1>
            <h1>{userDetails.email}</h1>
          </div>
        </div>
        <div className="mt-2">

          <EditUserModal/>
        </div>
      </div>
      <div className="border-b border-gray-500"></div>
      <div>
        <div className="flex justify-between mb-4">
          <div>
            <div>
              <h1 className="mt-2 text-gray-500">Phone</h1>
              <h2>{userDetails.phone}</h2>
            </div>
          </div>
          <div className="mt-2">
            <Link className="text-blue-500 font-bold " href="/">
              Edit
            </Link>
          </div>
        </div>
        <div className="border-b mb-2 mt-2 border-gray-500"></div>
        <div>
          <div className="flex justify-between mb-4">
            <div>
              <div>
                <h1 className="text-gray-500">Password</h1>
                <h2>{userDetails.password}</h2>
              </div>
            </div>
            <div>
              <Link className="text-blue-500 mt-2 font-bold" href="/">
                Edit
              </Link>
            </div>
          </div>
          <div className="border-b mb-2 mt-2 border-gray-500"></div>

        </div>
        <div className="text-base">
          <h1 className="text-gray-500 text-base">
            Manage Preferences
          </h1>
          <p className="mt-2 mb-2">
          We use customer data to improve the experience of our service and show relevant promotions.
          </p>

        </div>
      </div>
      <div className="flex justify-between mb-4">
          <div>
            <div>

            </div>
          </div>
          <div>
            <Link className="text-blue-500 font-bold" href="/">
              Log out
            </Link>
          </div>
        </div>
    </div>
  );
}
