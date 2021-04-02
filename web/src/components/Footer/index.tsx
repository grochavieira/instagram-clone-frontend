import React from "react";
import { BsHeartFill } from "react-icons/bs";

import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>
          Made with <BsHeartFill color={"#EA2B1F"} /> by{" "}
          <strong> Guilherme Rocha Vieira </strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
