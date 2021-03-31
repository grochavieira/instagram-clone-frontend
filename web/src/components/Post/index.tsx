import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdPaperPlane } from "react-icons/io";
import VideoPlayer from "react-video-js-player";
import moment from "moment";
import "moment/min/moment-with-locales";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

import { useSocket } from "../../contexts/SocketProvider";
import { SocketProps } from "../../interfaces/Socket";
import { Comment, Post as IPost } from "../../interfaces/Post";
import LikeButton from "../LikeButton";
import AuthContext from "../../contexts/AuthProvider";
import api from "../../services/api";
import defaultUser from "../../assets/defaultUser.png";
import "./styles.scss";

interface PostProps {
  post: IPost;
  setSelectedPost(post: IPost): void;
  setIsModalActive(value: boolean): void;
}

const Post = ({
  post: receivedPost,
  setSelectedPost,
  setIsModalActive,
}: PostProps) => {
  const socket = useSocket();
  const { user, signOut } = useContext<any>(AuthContext);
  const history = useHistory();
  const commentInput: any = useRef(null);
  const [post, setPost] = useState<IPost>(receivedPost);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentsPreview, setCommentsPreview] = useState<Comment[] | any>([]);
  const [comment, setComment] = useState("");
  const [isPostImage, setIsPostImage] = useState(true);
  const [postUser, setPostUser] = useState<any>({});

  useEffect(() => {
    async function getPostUser() {
      const { data } = await api.get(`/user/${post.username}`);
      setPostUser(data);

      if (post.comments.length > 0) {
        setCommentsPreview([post.comments[0]]);
      }
    }
    getPostUser();
  }, [
    post.comments,
    post.createdAt,
    post.postUrl,
    post.user,
    post.username,
    user,
  ]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("liked-post", ({ post: updatedPost }: SocketProps) => {
      if (post._id === updatedPost._id) setPost(updatedPost);
    });

    socket.on("commented-post", ({ post: updatedPost }: SocketProps) => {
      if (post._id === updatedPost._id) setPost(updatedPost);
    });
  }, [post._id, socket]);

  useEffect(() => {
    if (post.postUrl.includes(".mp4")) {
      setIsPostImage(false);
    }
  }, [post.createdAt, post.postUrl]);

  async function handleComment() {
    setIsCommentLoading(true);
    try {
      await api.post(`/comment/${post._id}`, { body: comment });
      const newComment = {
        body: comment,
        username: post.username,
        createdAt: String(new Date()),
      };
      setCommentsPreview([...commentsPreview, newComment]);
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
  return (
    <>
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
          <div
            onClick={() => {
              setSelectedPost(post);
              setIsModalActive(true);
            }}
            className="post__header__options"
          >
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
            <button onClick={() => history.push(`/post/${post._id}`)}>
              Ver todos os {post.comments.length} comentários
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="post__comments">
          {commentsPreview !== null &&
            commentsPreview.length > 0 &&
            commentsPreview.map((comment: Comment) => (
              <p key={comment.createdAt}>
                <strong>{comment.username}</strong> {comment.body}
                <span className="hour">
                  {moment(comment.createdAt).fromNow(true)}
                </span>
              </p>
            ))}
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
            onKeyPress={(e) => e.key === "Enter" && handleComment()}
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
    </>
  );
};

export default Post;
