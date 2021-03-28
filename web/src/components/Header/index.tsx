import React, { useContext, useState } from "react";
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
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import { Link, useHistory, useLocation } from "react-router-dom";

import ThemeSwitcher from "../ThemeSwitcher";
import AuthContext from "../../contexts/auth";
import "./styles.scss";

const Header = () => {
  const { user, signOut } = useContext<any>(AuthContext);
  const { pathname } = useLocation();
  console.log(pathname);
  const [showNavbar, setShowNavbar] = useState(false);

  const history = useHistory();

  function handleLogout() {
    signOut();
    history.push("/");
  }

  return (
    <nav className="header">
      <div className="header__logo">
        <p className="header__logo__text">Instagram</p>
      </div>

      {/* {pathname === "/" ? (
        <>
          <div className="header__search-bar">
            <AiOutlineSearch />
            <input
              onKeyPress={handleKey}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Pesquisar"
            />
          </div>
        </>
      ) : (
        ""
      )} */}

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
          <li>
            <BsHeart />
          </li>
          <li>
            <img
              onClick={() => setShowNavbar(!showNavbar)}
              src={user.profilePhoto !== null ? user.profilePhoto.url : ""}
              alt="user"
            />
            <div className={showNavbar ? "navbar" : "navbar disabled"}>
              <div className="navbar__item">
                <Link to="/profile">
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
