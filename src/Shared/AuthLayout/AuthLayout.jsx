import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="Auth-container h-screen">
        <div className="forms flex justify-center items-center h-screen w-full ">
          <div className="form-layout bg-cyan-400/10 p-5 w-1/2 mx-auto rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
