import React, { useState } from "react";
import useTheme from "../../utils/useTheme";

import "./styles.scss";

const selectTheme = () => {
  console.log("Apertou");
  const themeType = localStorage.getItem("themeType");
  if (!themeType) return;
  const theme = JSON.parse(themeType);
  return theme === "dark";
};

export const ThemeSwitcher = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(selectTheme());
  useTheme(darkModeEnabled ? "dark" : "light");

  return (
    <label className="toggler" htmlFor="theme-toggler">
      <input
        id="theme-toggler"
        type="checkbox"
        checked={darkModeEnabled}
        onChange={(e) => setDarkModeEnabled(e.target.checked)}
      />
    </label>
  );
};

export default ThemeSwitcher;
