import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <SideBar />

      {/* Page Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
