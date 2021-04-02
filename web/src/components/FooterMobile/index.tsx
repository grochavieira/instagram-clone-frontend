import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCamera,
  AiFillCamera,
} from "react-icons/ai";

import { ISocketNotificationProps } from "../../interfaces/ISocket";
import INotification from "../../interfaces/INotification";
import { useSocket } from "../../contexts/SocketProvider";
import AuthContext from "../../contexts/AuthProvider";
import api from "../../services/api";
import "./styles.scss";

const FooterMobile = () => {
  const { user } = useContext<any>(AuthContext);
  const socket = useSocket();
  const { pathname } = useLocation();
  const history = useHistory();

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    async function getNotifications() {
      try {
        const { data } = await api.get("/notifications");
        setNotifications(data);
        let counter = 0;
        for (const notification of data) {
          if (!notification.wasRead) {
            counter++;
          }
        }
        setUnreadNotifications(counter);
      } catch (err) {
        console.log(err);
      }
    }

    getNotifications();
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("notification", ({ notification }: ISocketNotificationProps) => {
      if (user.username === notification.username) {
        setNotifications([...notifications, notification]);
        setUnreadNotifications(unreadNotifications + 1);
      }
    });
    if (pathname === "/activity") setUnreadNotifications(0);
  }, [notifications, pathname, socket, unreadNotifications, user.username]);

  async function handleNotifications() {
    try {
      notifications.forEach(async (notification: INotification) => {
        if (!notification.wasRead) {
          await api.put(`/notifications/${notification._id}`);
        }
      });
      setUnreadNotifications(0);
      history.push("/activity");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="footer-mobile">
        <span onClick={() => history.push("/")} className="footer-mobile__item">
          {pathname !== "/home" ? <AiOutlineHome /> : <AiFillHome />}
        </span>
        <span
          onClick={() => history.push("/search")}
          className="footer-mobile__item"
        >
          <AiOutlineSearch />
        </span>

        <span
          onClick={() => history.push("/post-content")}
          className="footer-mobile__item"
        >
          {pathname !== "/post-content" ? (
            <AiOutlineCamera />
          ) : (
            <AiFillCamera />
          )}
        </span>

        <span onClick={handleNotifications} className="footer-mobile__item">
          {pathname !== "/activity" ? <BsHeart /> : <BsHeartFill />}
          {unreadNotifications > 0 ? (
            <span className="footer-mobile__item__notifications">
              {unreadNotifications}
            </span>
          ) : (
            ""
          )}
        </span>
        <span
          onClick={() => history.push(`/profile/${user.username}`)}
          className="footer-mobile__item"
        >
          <img src={user.profilePhoto.url} alt={user.username} />
        </span>
      </div>
    </>
  );
};

export default FooterMobile;
