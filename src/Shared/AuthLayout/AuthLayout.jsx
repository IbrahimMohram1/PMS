import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="Auth-container h-screen">
        <div className="forms flex justify-center items-center h-screen p-5">
          <div className="form-layout">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
