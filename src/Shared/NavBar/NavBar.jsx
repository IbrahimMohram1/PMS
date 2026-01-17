import React, { useContext, useState } from "react";
import logo from "../../assets/Navbar.png";
import { FaBell } from "react-icons/fa";
import { Navbar, NavbarBrand, NavbarToggle, Dropdown, DropdownItem } from "flowbite-react";
import { AuthContext } from "../../Context/AuthContext";
import imgProfile from "../../assets/imgUpload.jpg";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handelLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar fluid rounded className="bg-white shadow-md px-6 py-3 relative">
      {/* شعار الموقع */}
      <NavbarBrand>
        <img src={logo} className="w-32 md:w-40" alt="Logo" />
      </NavbarBrand>

 
      <NavbarToggle onClick={() => setIsMobileOpen(!isMobileOpen)} />


      <div className="hidden md:flex items-center gap-6 ml-auto">
     
        <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
          <FaBell className="text-[#EF9B28] text-2xl" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </div>

        <ToggleTheme />

        {/* Profile Dropdown */}
        <Dropdown
          inline
          label={
            <div className="flex gap-3 items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#EF9B28]">
                <img src={imgProfile} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#0E382F] text-sm md:text-base">
                  {user?.userName || "Guest"}
                </span>
                <span className="text-[#6b7280] text-xs md:text-sm truncate">
                  {user?.userEmail || ""}
                </span>
              </div>
            </div>
          }
          className="bg-white shadow-lg border px-4 border-gray-200 rounded-lg mt-2"
        >
          <DropdownItem
            onClick={() => navigate("/dashboard/change-password")}
            className="flex items-center gap-2 text-emerald-600 hover:bg-[#E6F7F1] transition-colors duration-200"
          >
            <TbLockPassword size={18} /> Change Pass
          </DropdownItem>

          <DropdownItem
            onClick={handelLogOut}
            className="flex items-center gap-2 text-red-500 hover:bg-[#FFE6E6] transition-colors duration-200"
          >
            <CgLogOut size={18} /> LogOut
          </DropdownItem>
        </Dropdown>
      </div>

      {/* قائمة الموبايل */}
      <div
        className={`md:hidden flex flex-col gap-3 mt-2 transition-all duration-300 overflow-hidden ${
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3">
          {/* Profile info */}
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#EF9B28]">
              <img src={imgProfile} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[#0E382F] text-sm">
                {user?.userName || "Guest"}
              </span>
              <span className="text-[#6b7280] text-xs truncate max-w-[180px]">
                {user?.userEmail || ""}
              </span>
            </div>
          </div>

          {/* Notifications */}
          <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors font-medium">
            <div className="relative">
              <FaBell className="text-[#EF9B28] text-xl" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </div>
            الإشعارات
          </button>

          {/* Theme Toggle */}
          <div className="flex items-center gap-3 px-4 py-2">
            <ToggleTheme />
            المظهر
          </div>

          {/* Change Password */}
          <button
            onClick={() => navigate("/dashboard/change-password")}
            className="flex items-center gap-3 px-4 py-2 text-emerald-600 hover:bg-[#E6F7F1] rounded-lg transition-colors font-medium"
          >
            <TbLockPassword size={20} />
            Change Pass   
          </button>

          {/* Logout */}
          <button
            onClick={handelLogOut}
            className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-[#FFE6E6] rounded-lg transition-colors font-medium"
          >
            <CgLogOut size={20} />  
             Logout
          </button>
        </div>
      </div>
    </Navbar>
  );
}
