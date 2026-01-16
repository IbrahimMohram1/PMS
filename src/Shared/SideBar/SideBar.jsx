import React, { useState } from "react";
import {
  FaUsers,
  FaTasks,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

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
  const isActive = (path) => location.pathname === path;

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
            button: ({ level, active }) => ({
              color: "#fff",
              backgroundColor: active ? "#f3a333" : "transparent",
              "&:hover": {
                color: "#f3a333",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }),
          }}
        >
          <div style={{ height: 40 }} />

          <MenuItem
            icon={<FaHome />}
            component={<Link to="/dashboard" />}
            active={isActive("/dashboard")}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<GrProjects />}
            component={<Link to="/dashboard/Projects" />}
            active={isActive("/dashboard/Projects")}
          >
            Projects
          </MenuItem>

          <MenuItem
            icon={<FaUsers />}
            component={<Link to="/dashboard/users" />}
            active={isActive("/dashboard/users")}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<FaTasks />}
            component={<Link to="/dashboard/tasks" />}
            active={isActive("/dashboard/tasks")}
          >
            Tasks
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
