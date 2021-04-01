import React, { useContext, useState } from "react";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";

import useTheme from "../../utils/useTheme";
import { selectTheme } from "../ThemeSwitcher";
import AuthContext from "../../contexts/AuthProvider";
import "./styles.scss";

const HeaderMobile = () => {
  const { signOut } = useContext<any>(AuthContext);

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(selectTheme());
  useTheme(isDarkModeEnabled ? "dark" : "light");

  return (
    <>
      <div className="header-mobile">
        <div
          onClick={() => setIsDarkModeEnabled(!isDarkModeEnabled)}
          className="header-mobile__item"
        >
          {isDarkModeEnabled ? <FiMoon /> : <FiSun />}
        </div>

        <span className="header-mobile__title">Instagram</span>
        <div onClick={signOut} className="header-mobile__item">
          <FiLogOut />
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
