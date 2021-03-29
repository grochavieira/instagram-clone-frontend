import React from "react";
import { useHistory } from "react-router-dom";

import image404 from "../../assets/404.svg";
import "./styles.scss";

const Page404 = () => {
  const history = useHistory();
  return (
    <>
      <div className="not-found-container">
        <h1>Oops, Página não encontrada!</h1>
        <img src={image404} alt="404" />
        <button onClick={() => history.push("/")}>Voltar para Home</button>
      </div>
    </>
  );
};

export default Page404;
