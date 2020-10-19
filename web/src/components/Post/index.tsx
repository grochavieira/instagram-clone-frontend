import React, { useEffect, useState } from "react";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import VideoPlayer from "react-video-js-player";
import defaultUser from "../../assets/defaultUser.png";

import "./styles.scss";
import api from "../../services/api";

interface PostProps {
  postImage: string;
  userId: string;
  username: string;
}

const Post: React.FC<PostProps> = ({ postImage, userId, username }) => {
  const [isPostImage, setIsPostImage] = useState(true);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    async function getUser() {
      const { data } = await api.get(`/user/${userId}`);
      setUser(data);
    }
    getUser();
  }, [userId]);

  useEffect(() => {
    if (postImage.includes(".mp4")) {
      setIsPostImage(false);
    }
  }, [postImage, userId]);

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header__user">
          <img
            src={user.profilePhotoUrl ? user.profilePhotoUrl : defaultUser}
            alt="user profile"
          />
          <p>{username}</p>
        </div>
        <div className="post__header__options">
          <HiDotsHorizontal />
        </div>
      </div>
      <div className="post__content">
        {isPostImage ? (
          <img src={postImage} alt="" />
        ) : (
          <VideoPlayer width="100%" height="500px" src={postImage} />
        )}
      </div>
      <div className="post__like-section">
        <div className="post__like-section__main-icons">
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
        <div className="post__like-section__favorite-icon">
          <span>
            <BsBookmark />
          </span>
        </div>
      </div>
      <div className="post__visualizations">
        <p>0 visualizações</p>
      </div>
      <div className="post__comment"></div>
      <div className="post__add-comment">
        <input type="text" placeholder="Adicione um comentário..." />
        <button>Publicar</button>
      </div>
    </div>
  );
};

export default Post;
