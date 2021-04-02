import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdPaperPlane } from "react-icons/io";
import VideoPlayer from "react-video-js-player";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import TimeAgo from "react-timeago";
import brazilianStrings from "react-timeago/lib/language-strings/pt-br";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import { useSocket } from "../../contexts/SocketProvider";
import { ISocketPostProps } from "../../interfaces/ISocket";
import IPost, { IComment } from "../../interfaces/IPost";
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
  const { pathname } = useLocation();
  const commentInput: any = useRef(null);
  const [post, setPost] = useState<IPost>(receivedPost);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentsPreview, setCommentsPreview] = useState<IComment[] | any>([]);
  const [comment, setComment] = useState("");
  const [isPostImage, setIsPostImage] = useState(true);
  const [postUser, setPostUser] = useState<any>({});

  const formatter = buildFormatter(brazilianStrings);

  useEffect(() => {
    async function getPostUser() {
      const { data } = await api.get(`/user/${post.username}`);
      setPostUser(data);

      if (post.comments.length > 0) {
        setCommentsPreview([post.comments[0]]);
        console.log(post.comments);
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
    socket.on("liked-post", ({ post: updatedPost }: ISocketPostProps) => {
      if (post._id === updatedPost._id) setPost(updatedPost);
    });

    socket.on("commented-post", ({ post: updatedPost }: ISocketPostProps) => {
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
        followingUsername: user.username,
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
            onClick={() => history.push(`/profile/${post.username}`)}
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
            <LikeButton post={post} />
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
        <div className="post__hours">
          <p>
            <TimeAgo date={post.createdAt} formatter={formatter} />
          </p>
        </div>
        {pathname.includes("/post") ? (
          <>
            <div className="post__comments-mobile">
              {post.caption && (
                <div className="post__comments-mobile__item">
                  <div className="post__comments-mobile__item__owner">
                    <img
                      src={
                        postUser.profilePhoto ? postUser.profilePhoto.url : ""
                      }
                      alt={post.username}
                    />
                    <strong>{post.username}</strong>
                    <span className={"post__comments-mobile__item__hour"}>
                      <TimeAgo date={post.createdAt} formatter={formatter} />
                    </span>
                  </div>

                  <p>{post.caption.body}</p>
                </div>
              )}
              {post.comments.map((comment: IComment) => (
                <div
                  key={comment.createdAt + comment.followingUsername}
                  className="post__comments-mobile__item"
                >
                  <div className="post__comments-mobile__item__owner">
                    <img
                      src={comment.profilePhotoURL}
                      alt={comment.followingUsername}
                    />
                    <strong>{comment.followingUsername}</strong>
                    <span className={"post__comments-mobile__item__hour"}>
                      <TimeAgo date={comment.createdAt} formatter={formatter} />
                    </span>
                  </div>

                  <p>{comment.body}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
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
                commentsPreview.map((comment: IComment) => (
                  <p key={comment.createdAt}>
                    <strong>{comment.followingUsername}</strong> {comment.body}
                    <span className="hour">
                      <TimeAgo date={comment.createdAt} formatter={formatter} />
                    </span>
                  </p>
                ))}
            </div>
          </>
        )}
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
