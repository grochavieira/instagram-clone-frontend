import React, { useContext, useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineCamera,
  AiFillCamera,
  AiOutlineSearch,
} from "react-icons/ai";
import { IoMdPaperPlane, IoIosPaperPlane } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { SocketNotificationProps } from "../../interfaces/Socket";
import { Notification } from "../../interfaces/Notification";
import SearchInput from "../SearchInput";
import User from "../../interfaces/User";
import ThemeSwitcher from "../ThemeSwitcher";
import { useSocket } from "../../contexts/SocketProvider";
import AuthContext from "../../contexts/AuthProvider";
import api from "../../services/api";
import "./styles.scss";

const Header = () => {
  const { user, signOut } = useContext<any>(AuthContext);
  const socket = useSocket();
  const { pathname } = useLocation();
  const history = useHistory();

  const [showNavbar, setShowNavbar] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    async function getNotifications() {
      try {
        const { data } = await api.get("/notifications");
        console.log(data);
        setNotifications(data);
        let counter = 0;
        for (const notification of data) {
          if (!notification.wasRead) {
            counter++;
          }
        }
        console.log({ counter });
        setUnreadNotifications(counter);
      } catch (err) {
        console.log(err);
      }
    }

    getNotifications();
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("notification", ({ notification }: SocketNotificationProps) => {
      if (user.username === notification.username) {
        console.log({ notification });
        setNotifications([...notifications, notification]);
        setUnreadNotifications(unreadNotifications + 1);
      }
    });
  }, [notifications, socket, unreadNotifications, user.username]);

  function handleLogout() {
    signOut();
    history.push("/");
  }

  return (
    <nav className="header">
      <div className="header__logo">
        <p className="header__logo__text">Instagram</p>
      </div>

      {pathname === "/" ? <SearchInput /> : ""}

      <div className="header__navigation-bar">
        <ul>
          <li>
            <Link to="/">
              {pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}{" "}
            </Link>
          </li>
          <li>
            <Link to="/post-content">
              {pathname === "/post-content" ? (
                <AiFillCamera />
              ) : (
                <AiOutlineCamera />
              )}
            </Link>
          </li>
          <li>
            <Link to="/message">
              {pathname === "/message" ? (
                <IoIosPaperPlane />
              ) : (
                <IoMdPaperPlane />
              )}
            </Link>
          </li>
          <li
            onClick={() => history.push("/activity")}
            className="header__navigation-bar__notifications"
          >
            {pathname === "/activity" ? <BsHeartFill /> : <BsHeart />}

            {unreadNotifications > 0 ? (
              <span className="header__navigation-bar__notifications__number">
                {unreadNotifications}
              </span>
            ) : (
              ""
            )}
          </li>
          <li>
            <img
              onClick={() => setShowNavbar(!showNavbar)}
              src={user.profilePhoto !== null ? user.profilePhoto.url : ""}
              alt="user"
            />
            <div className={showNavbar ? "navbar" : "navbar disabled"}>
              <div className="navbar__item">
                <Link to={`/profile/${user.username}`}>
                  <BiUserCircle /> Perfil
                </Link>
              </div>
              <div className="navbar__item">
                <ThemeSwitcher />
              </div>
              <div onClick={handleLogout} className="navbar__item">
                Sair
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
