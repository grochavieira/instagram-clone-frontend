import React, { useState } from "react";

import useTheme from "../../utils/useTheme";
import "./styles.scss";

const selectTheme = () => {
  const themeType = localStorage.getItem("themeType");
  if (!themeType) return;
  const theme = JSON.parse(themeType);
  return theme === "dark";
};

export const ThemeSwitcher = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(selectTheme());
  useTheme(darkModeEnabled ? "dark" : "light");

  return (
    <>
      <input
        id="switch"
        type="checkbox"
        checked={darkModeEnabled}
        onChange={(e) => setDarkModeEnabled(e.target.checked)}
      />
      <label className="toggler" htmlFor="switch"></label>
    </>
  );
};

export default ThemeSwitcher;
