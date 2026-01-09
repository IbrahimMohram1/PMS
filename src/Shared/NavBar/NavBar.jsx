import React, { useContext } from "react";
import logo from "../../assets/Navbar.png";
import { FaBell } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  Dropdown,
  DropdownItem,
} from "flowbite-react";
import { AuthContext } from "../../Context/AuthContext";
import imgProfile from "../../assets/imgUpload.jpg";
import { useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelLogOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar fluid rounded className="bg-white shadow-md px-6 py-2">
      {/* شعار الموقع */}
      <NavbarBrand>
        <img src={logo} className="w-32 md:w-40" alt="Logo" />
      </NavbarBrand>

      {/* زر Toggle للهاتف */}
      <NavbarToggle />

      <div className="flex items-center gap-6 ml-auto">
        {/* أيقونة الإشعارات */}
        <div className="relative cursor-pointer">
          <FaBell className="text-[#EF9B28] text-2xl hover:text-[#d18e20] transition-colors duration-200" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </div>

        {/* Profile Dropdown */}
        <Dropdown
          inline
          label={
            <div className="flex  gap-3 cursor-pointer">
              {/* الصورة */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#EF9B28]">
                <img
                  src={imgProfile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col ">
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
            className="flex items-center gap-2 text-emerald-600 hover:bg-[#FFF4E6] transition-colors duration-200"
          >
            <TbLockPassword size={18} />
            Change Pass
          </DropdownItem>

          <DropdownItem
            onClick={handelLogOut}
            className="flex items-center gap-2 text-red-500 hover:bg-[#FFE6E6] transition-colors duration-200"
          >
            <CgLogOut size={18} /> LogOut
          </DropdownItem>
        </Dropdown>
      </div>
    </Navbar>
  );
}
