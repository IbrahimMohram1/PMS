import React, { useContext, useState } from "react";
import {
  FaUsers,
  FaTasks,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleButtonStyle = {
    position: "absolute",
    top: 20,
    right: -15,
    zIndex: 10,
    backgroundColor: "#f3a333",
    color: "#fff",
    border: "none",
    borderRadius: "30% 0 0 30%",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        width="200px"
        collapsed={collapsed}
        backgroundColor="#0f3027"
        rootStyles={{ height: "100vh", border: "none", position: "relative" }}
      >
        <button
          style={toggleButtonStyle}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <FaChevronRight size={12} />
          ) : (
            <FaChevronLeft size={12} />
          )}
        </button>

        <Menu
          menuItemStyles={{
            button: {
              color: "#fff",
              "&:hover": { backgroundColor: "transparent", color: "#f3a333" },
            },
          }}
        >
          <div style={{ height: 40 }} />
          <MenuItem icon={<FaHome />} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<GrProjects />}
            component={<Link to="/dashboard/Projects" />}
          >
            Projects
          </MenuItem>

          {user.userGroup == "Manager" && (
            <MenuItem
              component={<Link to={"/dashboard/users"} />}
              icon={<FaUsers />}
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            component={<Link to={"/dashboard/tasks"} />}
            icon={<FaTasks />}
          >
            Tasks
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
