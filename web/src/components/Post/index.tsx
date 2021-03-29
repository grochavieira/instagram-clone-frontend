import React, { useContext, useEffect, useRef, useState } from "react";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdPaperPlane } from "react-icons/io";
import VideoPlayer from "react-video-js-player";
import moment from "moment";
import "moment/min/moment-with-locales";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

import LikeButton from "../LikeButton";
import AuthContext from "../../contexts/auth";
import api from "../../services/api";
import defaultUser from "../../assets/defaultUser.png";
import "./styles.scss";
import { useHistory } from "react-router";

const Post: React.FC<any> = ({ post }) => {
  const { user, signOut } = useContext<any>(AuthContext);
  const history = useHistory();
  const commentInput: any = useRef(null);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isPostImage, setIsPostImage] = useState(true);
  const [postUser, setPostUser] = useState<any>({});

  useEffect(() => {
    async function getPostUser() {
      const { data } = await api.get(`/user/${post.username}`);
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
    setIsCommentLoading(true);
    try {
      await api.post(`/comment/${post._id}`, { body: comment });
      setComment("");
      setIsCommentLoading(false);
    } catch (err) {
      console.log(err.response.data.errors);
      if (err.response.data.errors.invalid_token) {
        signOut();
        toast.warn("sua sessão acabou!");
      } else {
        toast.error("não foi possível comentar!");
      }
      setIsCommentLoading(false);
    }
  }

  function handleShowComments() {
    setShowComments(!showComments);
  }

  return (
    <div className="post">
      <div className="post__header">
        <div
          onClick={() => history.push(`/profile/${user.username}`)}
          className="post__header__user"
        >
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
          <span onClick={() => commentInput.current.focus()}>
            <AiOutlineMessage />
          </span>
          <span>
            <IoMdPaperPlane />
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
      <div className="post__caption">
        {post.caption && (
          <p>
            <strong>{post.username}</strong> {post.caption.body}
          </p>
        )}
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
            <strong>{post.comments[0].username}</strong> {post.comments[0].body}
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
          ref={commentInput}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Adicione um comentário..."
        />

        {isCommentLoading ? (
          <span className="post__add-comment__loading">
            <ReactLoading type="spin" color="#aaa" height={15} width={25} />
          </span>
        ) : (
          <button
            onClick={handleComment}
            className="post__add-comment__publish"
          >
            Publicar
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
