import React, { useState, useEffect } from "react";

import User from "../../interfaces/User";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import Button from "../../components/Button";
import "./styles.scss";

const Message = () => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    profilePhoto: {
      url: "",
      publicId: "",
    },
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
      <div className="message">
        <main className="message__wrapper">
          <section className="message__wrapper__aside">
            <div className="message__wrapper__aside__header">
              <div className="message__wrapper__aside__header__title">
                Direct
              </div>
              <HiOutlinePencilAlt />
            </div>
            <div className="message__wrapper__aside__contacts"></div>
          </section>
          {/* <section className="send-message-container"></section> */}
          <section className="message__wrapper__default-content">
            <div className="message__wrapper__default-content__navigation">
              <RiSendPlaneFill />
            </div>
            <div className="message__wrapper__default-content__title">
              Suas Mensagens
            </div>
            <div className="message__wrapper__default-content__sub-title">
              Envie mensagens privadas para um amigo ou grupo
            </div>
            <div className="message__wrapper__default-content__button-wrapper">
              <Button name="Enviar Mensagem" onAction={() => {}} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Message;
