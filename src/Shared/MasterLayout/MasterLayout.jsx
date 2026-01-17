import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

export default function MasterLayout() {
  return (
    <div>
      <NavBar />
      <div className=" flex">
        <div className="sideBar">
          {/* Sidebar */}
          <SideBar />
        </div>

        {/* Page Content */}
        <div className="flex-1  overflow-x-hidden ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
