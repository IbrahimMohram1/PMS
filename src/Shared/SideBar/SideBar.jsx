import React, { useState } from "react";
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

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleButtonStyle = {
    position: "absolute",
    top: 20,
    right: -15,
    zIndex: 10,
    backgroundColor: "#f3a333",
    color: "#fff",
    border: "none",
    borderRadius: "50% 0 0 50%",
    width: 30,
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
          <MenuItem icon={<FaUsers />}>Users</MenuItem>
          <MenuItem icon={<GrProjects />}>Projects</MenuItem>
          <MenuItem
            component={<Link to={"/dashboard/users"} />}
            icon={<FaUser />}
          >
            Users
          </MenuItem>

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
