import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineCamera,
  AiFillCamera,
} from "react-icons/ai";
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import "./styles.css";

interface HeaderProps {
  profileImage: string;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ profileImage, currentPage }) => {
  return (
    <nav className="header-container">
      <div className="logo">
        <p className="text-logo">Instagram</p>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar" />
      </div>
      <div className="navigation-bar">
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
