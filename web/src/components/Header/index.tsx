import React, { useContext, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineCamera,
  AiFillCamera,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";

import ThemeSwitcher from "../ThemeSwitcher";
import "./styles.scss";
import { AuthContext } from "../../context/auth";

interface HeaderProps {
  profileImage?: string;
  currentPage?: string;
  search?: string;
  setSearch?: (value: string) => void;
  handleKey?: (event: any) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  search,
  setSearch,
  handleKey,
}) => {
  const context = useContext<any>(AuthContext);
  const [showNavbar, setShowNavbar] = useState(false);

  const history = useHistory();

  function handleLogout() {
    context.logout();
    history.push("/");
  }

  return (
    <nav className="header">
      <div className="header__logo">
        <p className="header__logo__text">Instagram</p>
      </div>

      {handleKey && setSearch && currentPage === "home" ? (
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
      )}

      <div className="header__navigation-bar">
        <ul>
          <li>
            <Link to="/home">
              {currentPage === "home" ? <AiFillHome /> : <AiOutlineHome />}{" "}
            </Link>
          </li>
          <li>
            <Link to="/post-content">
              {currentPage === "post-content" ? (
                <AiFillCamera />
              ) : (
                <AiOutlineCamera />
              )}
            </Link>
          </li>
          <li>
            <Link to="/message">
              {currentPage === "message" ? (
                <RiSendPlaneFill />
              ) : (
                <RiSendPlaneLine />
              )}
            </Link>
          </li>
          <li>
            <BsHeart />
          </li>
          <li>
            <img
              onClick={() => setShowNavbar(!showNavbar)}
              src={
                context.user.profilePhoto !== null
                  ? context.user.profilePhoto.url
                  : ""
              }
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
