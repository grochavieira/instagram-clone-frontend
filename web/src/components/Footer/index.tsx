import React from "react";
import { BsHeartFill } from "react-icons/bs";

import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>
          MADE WITH <BsHeartFill color={"#ff3366"} /> BY{" "}
          <strong> GUILHERME ROCHA VIEIRA </strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
