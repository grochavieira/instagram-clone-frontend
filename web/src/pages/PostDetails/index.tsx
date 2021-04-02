import React, { useContext, useEffect, useRef, useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdPaperPlane } from "react-icons/io";
// import VideoPlayer from "react-video-js-player";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router";
import ReactLoading from "react-loading";
import TimeAgo from "react-timeago";
import brazilianStrings from "react-timeago/lib/language-strings/pt-br";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import PostComponent from "../../components/Post";
import { ISocketPostProps } from "../../interfaces/ISocket";
import { useSocket } from "../../contexts/SocketProvider";
import PostModal from "../../components/PostModal";
import Loading from "../../components/Loading";
import LikeButton from "../../components/LikeButton";
import AuthContext from "../../contexts/AuthProvider";
import IPost, { IComment } from "../../interfaces/IPost";
import api from "../../services/api";
import "./styles.scss";

const PostDetails = () => {
  const socket = useSocket();
  const { user, signOut } = useContext<any>(AuthContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const postId = pathname.replace("/post/", "");
  const commentInput: any = useRef(null);

  const formatter = buildFormatter(brazilianStrings);

  const [isModalActive, setIsModalActive] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState<IPost | any>(null);
  const [postUser, setPostUser] = useState<any>({});
  const [, setSelectedPost] = useState<IPost | any>({});
  const [windowWidth, setWindowWidth]: any = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    async function getPostData() {
      try {
        const { data: postData } = await api.get(`/post/${postId}`);
        const { data: userData } = await api.get(`/user/${postData.username}`);

        setPostUser(userData);
        setPost(postData);
      } catch (err) {
        history.push("/");
      }
    }

    getPostData();
  }, [history, postId]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("liked-post", ({ post: updatedPost }: ISocketPostProps) => {
      if (postId === updatedPost._id) setPost(updatedPost);
    });

    socket.on("commented-post", ({ post: updatedPost }: ISocketPostProps) => {
      if (postId === updatedPost._id) setPost(updatedPost);
    });

    socket.on("post-deleted", ({ post: updatedPost }: ISocketPostProps) => {
      if (postId === updatedPost._id) history.push("/");
    });
  }, [history, postId, socket]);

  async function handleComment() {
    setIsCommentLoading(true);
    try {
      await api.post(`/comment/${postId}`, { body: comment });
      const newComment = {
        body: comment,
        profilePhotoURL: user.profilePhoto.url,
        username: postUser.username,
        createdAt: String(new Date()),
      };

      post.comments.unshift(newComment);
      setPost(post);

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

  if (!post) {
    return <Loading></Loading>;
  }

  return (
    <>
      {isModalActive && (
        <PostModal setIsModalActive={setIsModalActive} post={post} />
      )}

      <div className="details">
        {windowWidth <= 700 ? (
          <PostComponent
            setSelectedPost={setSelectedPost}
            setIsModalActive={setIsModalActive}
            post={post}
          />
        ) : (
          <div className="details__container">
            <div className="details__container__image">
              <img src={post.postUrl} alt="post" />
            </div>
            <div className="details__container__content">
              <div className="details__container__content__info">
                <div
                  onClick={() => history.push(`/profile/${postUser.username}`)}
                  className="details__container__content__info__owner"
                >
                  <img
                    src={postUser.profilePhoto.url}
                    alt={postUser.username}
                  />
                  <strong>{postUser.username}</strong>
                </div>
                <HiDotsHorizontal onClick={() => setIsModalActive(true)} />
              </div>
              <div className="details__container__content__comments">
                {post.caption && (
                  <div className="details__container__content__comments__item">
                    <div className="details__container__content__comments__item__owner">
                      <img
                        src={postUser.profilePhoto.url}
                        alt={post.username}
                      />
                      <strong>{post.username}</strong>
                      <span
                        className={
                          "details__container__content__comments__item__owner__hour"
                        }
                      >
                        <TimeAgo date={post.createdAt} formatter={formatter} />
                      </span>
                    </div>

                    <p>{post.caption.body}</p>
                  </div>
                )}
                {post.comments.map((comment: IComment) => (
                  <div
                    key={comment.createdAt}
                    className="details__container__content__comments__item"
                  >
                    <div className="details__container__content__comments__item__owner">
                      <img
                        src={comment.profilePhotoURL}
                        alt={comment.followingUsername}
                      />
                      <strong>{comment.followingUsername}</strong>
                      <span
                        className={
                          "details__container__content__comments__item__owner__hour"
                        }
                      >
                        <TimeAgo
                          date={comment.createdAt}
                          formatter={formatter}
                        />
                      </span>
                    </div>

                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
              <div className="dummy"></div>
              <div className="details__container__content__like-section">
                <div className="details__container__content__like-section__main">
                  <LikeButton post={post} />
                  <AiOutlineMessage
                    onClick={() => commentInput.current.focus()}
                  />
                  <IoMdPaperPlane />
                </div>
                <div className="details__container__content__like-section__favorite ">
                  <span>
                    <BsBookmark />
                  </span>
                </div>
              </div>
              <div className="details__container__content__likes">
                <strong>{post.likes.length} curtidas</strong>
                <p>
                  <TimeAgo date={post.createdAt} formatter={formatter} />
                </p>
              </div>
              <div className="details__container__content__publish-comment">
                <input
                  ref={commentInput}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleComment()}
                  placeholder="Digite um comentário..."
                  type="text"
                />
                {isCommentLoading ? (
                  <span>
                    <ReactLoading
                      type="spin"
                      color="#aaa"
                      height={15}
                      width={25}
                    />
                  </span>
                ) : (
                  <button onClick={handleComment}>Publicar</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetails;
