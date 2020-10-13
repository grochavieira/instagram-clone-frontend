import React from "react";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import defaultUser from "../../assets/defaultUser.png";
import testImage from "../../assets/test-image.jpg";
import "./styles.css";

interface PostProps {
  postImage: string;
  user_id: string;
  userImage: string;
  username: string;
}

const Post: React.FC<PostProps> = ({ postImage, userImage, username }) => {
  return (
    <div className="post-container">
      <div className="header">
        <div className="user">
          <img
            src={userImage ? userImage : defaultUser}
            alt="user profile image"
          />
          <p>{username}</p>
        </div>
        <div className="options">
          <HiDotsHorizontal />
        </div>
      </div>
      <div className="content">
        <img src={postImage} alt="" />
      </div>
      <div className="like-section">
        <div className="main-icons">
          <span>
            <BsHeart />
          </span>
          <span>
            <AiOutlineMessage />
          </span>
          <span>
            <RiSendPlaneLine />
          </span>
        </div>
        <div className="favorite-icon">
          <span>
            <BsBookmark />
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
