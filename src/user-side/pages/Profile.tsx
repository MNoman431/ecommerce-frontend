import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const Profile: React.FC = () => {
  const { user } = useSelector((s: RootState) => s.auth);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="mt-2 text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4 bg-white">
          <h2 className="text-sm font-semibold text-gray-600">Name</h2>
          <p className="mt-1 text-lg font-medium">{user.name}</p>
        </div>
        <div className="rounded-xl border p-4 bg-white">
          <h2 className="text-sm font-semibold text-gray-600">Email</h2>
          <p className="mt-1 text-lg font-medium">{user.email}</p>
        </div>
        <div className="rounded-xl border p-4 bg-white">
          <h2 className="text-sm font-semibold text-gray-600">Role</h2>
          <p className="mt-1 text-lg font-medium capitalize">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
