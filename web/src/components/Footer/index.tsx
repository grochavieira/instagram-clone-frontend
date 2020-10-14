import React from "react";

import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__grid__item">SOBRE</div>
        <div className="footer__grid__item">AJUDA</div>
        <div className="footer__grid__item">IMPRENSA</div>
        <div className="footer__grid__item">API</div>
        <div className="footer__grid__item">CARREIRAS</div>
        <div className="footer__grid__item">PRIVACIDADE</div>
        <div className="footer__grid__item">TERMOS</div>
        <div className="footer__grid__item">LOCALIZAÇÕES</div>
        <div className="footer__grid__item">CONTAS MAIS RELEVANTES</div>
        <div className="footer__grid__item">HASHTAGS</div>
        <div className="footer__grid__item">IDIOMA</div>
      </div>

      <div className="footer__copyright-text">
        <p>&copy; 2020 INSTAGRAM DO FACEBOOK</p>
      </div>
    </footer>
  );
};

export default Footer;
