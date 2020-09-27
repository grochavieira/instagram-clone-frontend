import React from "react";
import { BsHeart } from "react-icons/bs";
import { AiOutlineHome, AiFillHome, AiOutlineCompass } from "react-icons/ai";
import { RiNavigationLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import defaultUser from "../../assets/defaultUser.png";
import instagramLogo from "../../assets/instagram2.png";
import "./styles.css";

interface HeaderProps {
  profileImage: string;
}

const Header: React.FC<HeaderProps> = ({ profileImage }) => {
  return (
    <nav className="header-container">
      <div className="image-logo">
        <img src={instagramLogo} alt="Instagram Logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar" />
      </div>
      <div className="navigation-bar">
        <ul>
          <li>
            <AiOutlineHome size={25} color="#333" />
          </li>
          <li>
            <RiNavigationLine size={25} color="#333" />
          </li>
          <li>
            <AiOutlineCompass size={25} color="#333" />
          </li>
          <li>
            <BsHeart size={25} color="#333" />
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
