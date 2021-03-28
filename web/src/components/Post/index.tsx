import React, { useContext, useEffect, useState } from "react";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import VideoPlayer from "react-video-js-player";
import moment from "moment";
import "moment/min/moment-with-locales";
import { Link } from "react-router-dom";

import defaultUser from "../../assets/defaultUser.png";
import LikeButton from "../LikeButton";
import "./styles.scss";
import api from "../../services/api";
import { AuthContext } from "../../context/auth";

interface PostProps {
  postImage: string;
  userId: string;
  username: string;
}

const Post: React.FC<any> = ({ post }) => {
  const { user, triggerEvent, trigger } = useContext<any>(AuthContext);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isPostImage, setIsPostImage] = useState(true);
  const [postUser, setPostUser] = useState<any>({});

  useEffect(() => {
    async function getPostUser() {
      const { data } = await api.get(`/user/${post.user}`);
      setPostUser(data);
    }
    getPostUser();
  }, [post.createdAt, post.postUrl, post.user, user]);

  useEffect(() => {
    if (post.postUrl.includes(".mp4")) {
      setIsPostImage(false);
    }
  }, [post.createdAt, post.postUrl]);

  async function handleComment() {
    try {
      const token = localStorage.getItem("jwtToken");
      api.post(
        `/comment/${post._id}`,
        { body: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComment("");
      setTimeout(() => {
        triggerEvent(!trigger);
      }, 1000);
    } catch (err) {
      console.log(err.response.data.errors);
    }
  }

  function handleShowComments() {
    setShowComments(!showComments);
  }

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header__user">
          <img
            src={
              postUser.profilePhoto ? postUser.profilePhoto.url : defaultUser
            }
            alt="user profile"
          />
          <p>{post.username}</p>
        </div>
        <div className="post__header__options">
          <HiDotsHorizontal />
        </div>
      </div>
      <div className="post__content">
        {isPostImage ? (
          <img src={post.postUrl} alt="" />
        ) : (
          <VideoPlayer width="100%" height="500px" src={post.postUrl} />
        )}
      </div>
      <div className="post__like-section">
        <div className="post__like-section__main-icons">
          <LikeButton user={user} post={post} />
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
      <div className="post__likes">
        <p>{post.likes.length} curtidas</p>
      </div>
      {post.comments.length > 1 ? (
        <div className="post__show-comments">
          <button onClick={handleShowComments}>
            Ver todos os {post.comments.length} comentários
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="post__comments">
        {!showComments && post.comments.length > 0 ? (
          <p>
            <strong>{post.comments[0].username}</strong> {post.comments[0].body}{" "}
            <span className="hour">
              {moment(post.comments[0].createdAt).fromNow(true)}
            </span>
          </p>
        ) : (
          post.comments.map((comment: any) => (
            <p>
              <strong>{comment.username}</strong> {comment.body}{" "}
              <span className="hour">
                {moment(comment.createdAt).fromNow(true)}
              </span>
            </p>
          ))
        )}
      </div>
      <div className="post__hours">
        <p>{moment(post.createdAt).fromNow(true)}</p>
      </div>
      <div className="post__comment"></div>
      <div className="post__add-comment">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Adicione um comentário..."
        />
        <button onClick={handleComment}>Publicar</button>
      </div>
    </div>
  );
};

export default Post;
