import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineCamera,
  AiFillCamera,
  AiOutlineSearch,
} from "react-icons/ai";
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import "./styles.scss";

interface HeaderProps {
  profileImage: string;
  currentPage?: string;
  search?: string;
  setSearch?: (value: string) => void;
  handleKey?: (event: any) => void;
}

const Header: React.FC<HeaderProps> = ({
  profileImage,
  currentPage,
  search,
  setSearch,
  handleKey,
}) => {
  return (
    <nav className="header">
      <div className="header__logo">
        <p className="header__logo__text">Instagram</p>
      </div>
      <div className="header__search-bar">
        {handleKey && setSearch && currentPage === "home" ? (
          <>
            <AiOutlineSearch />
            <input
              onKeyPress={handleKey}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Pesquisar"
            />
          </>
        ) : (
          ""
        )}
      </div>
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
            <img src={profileImage} alt="user profile image" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
