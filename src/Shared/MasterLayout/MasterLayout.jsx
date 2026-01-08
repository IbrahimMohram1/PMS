import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

export default function MasterLayout() {
  return (
 <div>
  <NavBar/>
     <div className="h-screen flex">
      {/* Sidebar */}
      <SideBar />

      {/* Page Content */}
      <div className="flex-1  overflow-y-auto">
        <Outlet />
      </div>
    </div>
 </div>
  );
}
