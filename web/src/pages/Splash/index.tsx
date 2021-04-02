import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../contexts/AuthProvider";
import instagramLogo from "../../assets/instagram_logo.png";
import "./styles.scss";

const Splash = () => {
  const { signed } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (signed) {
        history.push("/home");
      } else {
        history.push("/login");
      }
    }, 500);
  }, [history, signed]);

  return (
    <>
      <div className="splash">
        <img src={instagramLogo} alt="instagram_logo" />
      </div>
    </>
  );
};

export default Splash;
