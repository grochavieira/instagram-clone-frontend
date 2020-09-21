import React from "react";

import "./styles.css";

const Footer = () => {
  return (
    <footer className="container">
      <div className="grid-container">
        <div className="grid-item">SOBRE</div>
        <div className="grid-item">AJUDA</div>
        <div className="grid-item">IMPRENSA</div>
        <div className="grid-item">API</div>
        <div className="grid-item">CARREIRAS</div>
        <div className="grid-item">PRIVACIDADE</div>
        <div className="grid-item">TERMOS</div>
        <div className="grid-item">LOCALIZAÇÕES</div>
        <div className="grid-item">CONTAS MAIS RELEVANTES</div>
        <div className="grid-item">HASHTAGS</div>
        <div className="grid-item">IDIOMA</div>
      </div>

      <div className="copyright-text">
        <p>&copy; 2020 INSTAGRAM DO FACEBOOK</p>
      </div>
    </footer>
  );
};

export default Footer;
