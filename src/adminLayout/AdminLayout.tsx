import React from "react";
import { Outlet } from "react-router-dom";
import Slider from "../admin-side/components/Slider";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Slider />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
