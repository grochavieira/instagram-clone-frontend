import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import ImageDropzone from "../../components/ImageDropzone";
import { Link, useHistory } from "react-router-dom";
import instagramLogo from "../../assets/instagram.png";
import downloadAppIcon from "../../assets/download-app-store.png";
import downloadGoogleIcon from "../../assets/download-google-play.png";
import api from "../../services/api";
import "./styles.css";

const Register = () => {
  const [profileImage, setProfileImage] = useState<File>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleSubmit() {
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("username", username);
      data.append("password", password);

      if (profileImage) data.append("file", profileImage);

      const response = await api.post("/user", data);

      alert("Cadastro realizado com sucesso!");
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <div className="instagram-block">
        <img src={instagramLogo} alt="instagram" />
        <div className="instagram-text">
          <p>Cadastre-se para ver fotos e vídeos dos seus amigos.</p>
        </div>
        <Button onAction={() => {}} name="Entrar com o Facebook" />
        <div className="or-block">
          <p className="line">
            <span>OU</span>
          </p>
        </div>
        <div className="perfil-dropzone">
          <p className="label">Escolha uma foto de perfil</p>
          <ImageDropzone info="" onFileUploaded={setProfileImage} />
        </div>
        <Input
          type="email"
          value={email}
          setValue={setEmail}
          placeholder="Email"
        />
        <Input value={name} setValue={setName} placeholder="Nome completo" />
        <Input
          value={username}
          setValue={setUsername}
          placeholder="Nome de usuário"
        />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="Senha"
        />
        <Button onAction={handleSubmit} name="Cadastre-se" />

        <div className="terms-block">
          <p>
            Ao se cadastrar, você concorda com nossos <br />{" "}
            <span>Termos, Política de Dados</span> e{" "}
            <span>Política de Cookies.</span>
          </p>
        </div>
      </div>

      <div className="register-block">
        <p>
          Tem uma conta?
          <Link to="/"> Conecte-se</Link>
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

export default Register;
