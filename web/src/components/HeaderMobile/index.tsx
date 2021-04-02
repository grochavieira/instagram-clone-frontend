import React, { useContext, useState } from "react";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";

import ThemeSwitcher from "../ThemeSwitcher";
import AuthContext from "../../contexts/AuthProvider";
import "./styles.scss";

const HeaderMobile = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <>
      <div className="header-mobile">
        <div className="header-mobile__item">
          <ThemeSwitcher />
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
