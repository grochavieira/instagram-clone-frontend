import React, { useContext, useState } from "react";
import { BsHeart } from "react-icons/bs";
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

import User from "../../interfaces/User";
import ThemeSwitcher from "../ThemeSwitcher";
import AuthContext from "../../contexts/auth";
import api from "../../services/api";
import "./styles.scss";

const Header = () => {
  const { user, signOut } = useContext<any>(AuthContext);
  const { pathname } = useLocation();

  const [showNavbar, setShowNavbar] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const history = useHistory();

  function handleLogout() {
    signOut();
    history.push("/");
  }

  async function handleSearch() {
    const { data } = await api.get(`/users/${search}`);
    setUsers(data);
    console.log(data);
  }

  return (
    <nav className="header">
      <div className="header__logo">
        <p className="header__logo__text">Instagram</p>
      </div>

      {pathname === "/" ? (
        <>
          <div className="header__search-bar">
            <AiOutlineSearch />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch();
              }}
              type="text"
              placeholder="Pesquisar"
            />
          </div>
          <div className={search !== "" ? "search" : "search disabled"}>
            {users.map((user: User) => (
              <div
                onClick={() => history.push(`/profile/${user.username}`)}
                key={user._id}
                className="search__item"
              >
                <img src={user.profilePhoto.url} alt={user.username} />
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        ""
      )}

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
