import React, { useContext, useState } from "react";
import logo from "../../assets/Navbar.png";
import { FaBell } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { AuthContext } from "../../Context/AuthContext";
import imgProfile from "../../assets/imgUpload.jpg";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { ThemeContext } from "../../Context/DarkModeContext";
import lightLogo from "../../assets/PMS.png";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  let { darkMode } = useContext(ThemeContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handelLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      fluid
      rounded
      className="bg-white dark:bg-gray-900 shadow-md dark:shadow-lg dark:shadow-gray-800 px-4 py-2 transition-colors duration-300"
    >
      {/* Logo */}
      <NavbarBrand>
        {darkMode ? (
          <img src={lightLogo} className="w-32 md:w-40" alt="Logo" />
        ) : (
          <img src={logo} className="w-32 md:w-40" alt="Logo" />
        )}
      </NavbarBrand>

      {/* Toggle Button (Mobile) */}
      <div className="flex md:hidden">
        <NavbarToggle className="dark:text-gray-300 dark:hover:bg-gray-700" />
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-6 ml-auto">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-[#EF9B28] text-2xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </div>

        {/* Theme Toggle */}
        <ToggleTheme />

        {/* Profile Dropdown */}
        <Dropdown
          inline
          label={
            <div className="flex gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#EF9B28]">
                <img
                  src={imgProfile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#0E382F] dark:text-[#EF9B28] text-sm">
                  {user?.userName}
                </span>
                <span className="text-[#6b7280] dark:text-gray-400 text-xs truncate">
                  {user?.userEmail}
                </span>
              </div>
            </div>
          }
          className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg mt-2 transition-colors duration-300"
        >
          <DropdownItem
            onClick={() => navigate("/dashboard/change-password")}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 dark:hover:bg-gray-700"
          >
            <TbLockPassword size={18} />
            Change Password
          </DropdownItem>

          <DropdownItem
            onClick={handelLogOut}
            className="flex items-center gap-2 text-red-500 dark:text-red-400 dark:hover:bg-gray-700"
          >
            <CgLogOut size={18} />
            Logout
          </DropdownItem>
        </Dropdown>
      </div>

      {/* Mobile Menu */}
      <NavbarCollapse className="dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          {/* Notifications */}
          <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
            <FaBell className="text-[#EF9B28] text-xl" />
            <span>Notifications</span>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-3">
            <ToggleTheme />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <img
              src={imgProfile}
              className="w-10 h-10 rounded-full border-2 border-[#EF9B28]"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{user?.userName}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user?.userEmail}
              </span>
            </div>
          </div>

          <hr className="border-gray-300 dark:border-gray-700" />

          <button
            onClick={() => navigate("/dashboard/change-password")}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-300"
          >
            <TbLockPassword /> Change Password
          </button>

          <button
            onClick={handelLogOut}
            className="flex items-center gap-2 text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300"
          >
            <CgLogOut /> Logout
          </button>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}
