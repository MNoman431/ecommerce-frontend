import React from "react";
import { Outlet } from "react-router-dom";
import Slider from "../admin-side/components/Slider";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Slider />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

