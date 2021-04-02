import React, { useState } from "react";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";

import useTheme from "../../utils/useTheme";
import "./styles.scss";

export const selectTheme = () => {
  const themeType = localStorage.getItem("themeType");
  if (!themeType) return;
  const theme = JSON.parse(themeType);
  return theme === "dark";
};

export const ThemeSwitcher = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(selectTheme());
  useTheme(isDarkModeEnabled ? "dark" : "light");

  return (
    <>
      <div
        onClick={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
        className="theme"
      >
        {isDarkModeEnabled ? <FiMoon /> : <FiSun />}
      </div>
    </>
  );
};

export default ThemeSwitcher;
