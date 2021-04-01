import React, { useContext } from "react";
import { FiLogOut, FiSun } from "react-icons/fi";

import AuthContext from "../../contexts/AuthProvider";
import "./styles.scss";

const HeaderMobile = () => {
  const { signOut } = useContext<any>(AuthContext);
  return (
    <>
      <div className="header-mobile">
        <div className="header-mobile__item">
          <FiSun />
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
