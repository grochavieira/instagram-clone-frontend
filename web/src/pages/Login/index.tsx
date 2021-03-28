import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";
import downloadAppIcon from "../../assets/download-app-store.png";
import downloadGoogleIcon from "../../assets/download-google-play.png";
import "./styles.scss";

const Login = () => {
  const context = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const history = useHistory();

  async function handleLogin() {
    setIsLoading(true);
    try {
      const user = {
        username,
        password,
      };

      const { data } = await api.post("/user/login", user);
      setIsLoading(false);
      if (data !== null) {
        delete data.password;
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("login efetuado com sucesso!");
        context.login(data);
        history.push("/home");
      } else {
        toast.warn("usuário não existe!");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("não foi possível efetuar o login!");
      const { errors: responseErrors } = err.response.data;
      setErrors(responseErrors);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="login">
        <div className="login__container">
          {/* <div className="theme-block">
            <ThemeSwitcher />
          </div> */}
          <p className="login__container__instagram-text">Instagram</p>
          <Input
            type="text"
            value={username}
            setValue={setUsername}
            placeholder="Nome de usuário"
            error={errors.username ? true : false}
          />
          <Input
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Senha"
            error={errors.password || errors.general ? true : false}
          />
          <Button onAction={handleLogin} name="Entrar" />
          {Object.keys(errors).length > 0 && (
            <div className="error-message">
              <ul className="error-message__list">
                {Object.values(errors).map((value: any) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="or-block">
            <p className="or-block__line">{/* <span>OU</span> */}</p>
          </div>
          {/* 
        <div className="login__container__facebook">
          <img
            className="login__container__facebook__logo"
            src={facebookIcon}
            alt="facebook icon"
          />
          <p>Entrar com o Facebook</p>
        </div> */}

          <div className="login__container__forgot">
            <p>Esqueceu a senha?</p>
          </div>
        </div>

        <div className="login__register">
          <p>
            Não tem uma conta?
            <Link to="/register"> Cadastre-se</Link>
          </p>
        </div>

        <p className="login__app-text">Obtenha o aplicativo.</p>

        <div className="login__download-stores">
          <img src={downloadAppIcon} alt="Download on app store" />
          <img src={downloadGoogleIcon} alt="Download on google store" />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;
