import React from "react";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { RiNavigationLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import defaultUser from "../../assets/defaultUser.png";
import testImage from "../../assets/test-image.jpg";
import "./styles.css";

const Post = () => {
  return (
    <div className="post-container">
      <div className="header">
        <div className="user">
          <img src={defaultUser} alt="" />
          <p>usuário</p>
        </div>
        <div className="options">
          <HiDotsHorizontal size={18} color="#333" />
        </div>
      </div>
      <div className="content">
        <img src={testImage} alt="" />
      </div>
      <div className="like-section">
        <div className="main-icons">
          <span>
            <BsHeart size={30} color="#333" />
          </span>
          <span>
            <AiOutlineMessage size={30} color="#333" />
          </span>
          <span>
            <RiNavigationLine size={30} color="#333" />
          </span>
        </div>
        <div className="favorite-icon">
          <span>
            <BsBookmark size={30} color="#333" />
          </span>
        </div>
      </div>
      <div className="visualizations-section">
        <p>0 visualizações</p>
      </div>
      <div className="comment-section"></div>
      <div className="add-comment-section">
        <input type="text" placeholder="Adicione um comentário..." />
        <button>Publicar</button>
      </div>
    </div>
  );
};

export default Post;
