import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Slider from "../admin-side/components/Slider";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for md+ */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64">
        <Slider />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full bg-gray-900 text-white">
            <Slider />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 min-h-screen">
        {/* Top bar on mobile */}
        <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-3 py-2 rounded-md border border-gray-200 text-sm"
          >
            Menu
          </button>
          <h1 className="font-semibold">Admin</h1>
          <div className="w-16" />
        </div>

        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

