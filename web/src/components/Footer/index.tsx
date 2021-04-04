import React from "react";
import { FiCamera } from "react-icons/fi";

import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>
          <FiCamera /> Made by
          <strong> Guilherme Rocha Vieira </strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
