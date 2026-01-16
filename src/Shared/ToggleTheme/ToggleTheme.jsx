import React, { useContext } from "react";
import { ThemeContext } from "../../Context/DarkModeContext";

export default function ToggleTheme() {
  let { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800"
    >
      {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
}
