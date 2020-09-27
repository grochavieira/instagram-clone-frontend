import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import { Link, useHistory } from "react-router-dom";
import instagramLogo from "../../assets/instagram.png";
import facebookIcon from "../../assets/facebook.svg";
import downloadAppIcon from "../../assets/download-app-store.png";
import downloadGoogleIcon from "../../assets/download-google-play.png";
import api from "../../services/api";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleLogin() {
    try {
      const user = {
        email,
        password,
      };

      const { data } = await api.post("/user/login", user);

      if (data !== null) {
        alert("Login efetuado com sucesso!");
        delete data.password;
        localStorage.setItem("user", JSON.stringify(data));
        history.push("/home");
      } else {
        alert("Não foi possível efetuar o login!");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <div className="instagram-block">
        <img src={instagramLogo} alt="instagram" />
        <Input
          type="email"
          value={email}
          setValue={setEmail}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Senha"
        />
        <Button onAction={handleLogin} name="Entrar" />
        <div className="or-block">
          <p className="line">
            <span>OU</span>
          </p>
        </div>

        <div className="facebook-block">
          <img src={facebookIcon} alt="facebook icon" />
          <p>Entrar com o Facebook</p>
        </div>

        <div className="forgot-block">
          <p>Esqueceu a senha?</p>
        </div>
      </div>

      <div className="register-block">
        <p>
          Não tem uma conta?
          <Link to="/register"> Cadastre-se</Link>
        </p>
      </div>

      <p className="app-text">Obtenha o aplicativo.</p>

      <div className="download-stores-block">
        <img src={downloadAppIcon} alt="Download on app store" />
        <img src={downloadGoogleIcon} alt="Download on google store" />
      </div>

      <Footer />
    </div>
  );
};

export default Login;
