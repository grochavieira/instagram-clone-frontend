import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import User from "../../interfaces/User";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import Button from "../../components/Button";
import "./styles.css";

const Message = () => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    profilePhotoUrl: "",
    username: "",
  });

  useEffect(() => {
    const json_object = localStorage.getItem("user");
    if (json_object) {
      const userData: User | null = JSON.parse(json_object);

      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  return (
    <>
      <Header currentPage="message" profileImage={user.profilePhotoUrl} />
      <div className="message-container">
        <main className="message-wrapper">
          <section className="side-container">
            <div className="header">
              <div className="title">Direct</div>
              <HiOutlinePencilAlt />
            </div>
            <div className="contacts"></div>
          </section>
          {/* <section className="send-message-container"></section> */}
          <section className="default-content">
            <div className="navigation">
              <RiSendPlaneFill />
            </div>
            <div className="title">Suas Mensagens</div>
            <div className="sub-title">
              Envie mensagens privadas para um amigo ou grupo
            </div>
            <div className="button-wrapper">
              <Button name="Enviar Mensagem" onAction={() => {}} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Message;
