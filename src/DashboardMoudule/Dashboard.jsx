import React, { useContext } from "react";
import headerimg from '../assets/home-bg.png';
import { AuthContext } from "../Context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
   <div className="h-screen bg-[#d3cfcf5e]">
     <div className="mx-6 py-3 relative rounded-xl overflow-hidden">
      <img src={headerimg} className="w-full h-auto" alt="Dashboard Header" />
      
      {/* النص في المنتصف */}
      <div className="absolute inset-0 flex flex-col justify-center px-4 text-white gap-3">
        <h3 className="text-2xl font-bold">
          Welcome <span className="text-[#EF9B28]">{user ? `, ${user.userName}` : ""}</span>
        </h3>
        <p className="text-sm">You can add projects and assign tasks to your team</p>
      </div>
    </div>
   </div>
  );
}
