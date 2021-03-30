import React, { useContext, useEffect, useRef, useState } from "react";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdPaperPlane } from "react-icons/io";
import VideoPlayer from "react-video-js-player";
import moment from "moment";
import "moment/min/moment-with-locales";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router";
import ReactLoading from "react-loading";

import PostModal from "../../components/PostModal";
import Loading from "../../components/Loading";
import LikeButton from "../../components/LikeButton";
import AuthContext from "../../contexts/AuthProvider";
import { Post, Comment } from "../../interfaces/Post";
import api from "../../services/api";
import "./styles.scss";

const PostDetails = () => {
  const { user, signOut } = useContext<any>(AuthContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const postId = pathname.replace("/post/", "");
  const commentInput: any = useRef(null);

  const [isModalActive, setIsModalActive] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState<Post | any>(null);
  const [postUser, setPostUser] = useState<any>({});

  useEffect(() => {
    async function getPostData() {
      const { data: postData } = await api.get(`/post/${postId}`);
      const { data } = await api.get(`/user/${postData.username}`);
      setPostUser(data);
      setPost(postData);
    }
    getPostData();
  }, [postId]);

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
        <div className="details__container">
          <div className="details__container__image">
            <img src={post.postUrl} alt="post" />
          </div>
          <div className="details__container__content">
            <div className="details__container__content__info">
              <div className="details__container__content__info__owner">
                <img src={postUser.profilePhoto.url} alt={postUser.username} />
                <strong>{postUser.username}</strong>
              </div>
              <HiDotsHorizontal onClick={() => setIsModalActive(true)} />
            </div>
            <div className="details__container__content__comments">
              {post.caption && (
                <div className="details__container__content__comments__item">
                  <div className="details__container__content__comments__item__owner">
                    <img src={postUser.profilePhoto.url} alt={post.username} />
                    <strong>{post.username}</strong>
                    <span
                      className={
                        "details__container__content__comments__item__owner__hour"
                      }
                    >
                      {moment(post.caption.createdAt).fromNow(true)}
                    </span>
                  </div>

                  <p>{post.caption.body}</p>
                </div>
              )}
              {post.comments.map((comment: Comment) => (
                <div
                  key={comment.createdAt}
                  className="details__container__content__comments__item"
                >
                  <div className="details__container__content__comments__item__owner">
                    <img src={comment.profilePhotoURL} alt={comment.username} />
                    <strong>{comment.username}</strong>
                    <span
                      className={
                        "details__container__content__comments__item__owner__hour"
                      }
                    >
                      {moment(comment.createdAt).fromNow(true)}
                    </span>
                  </div>

                  <p>{comment.body}</p>
                </div>
              ))}
            </div>
            <div className="dummy"></div>
            <div className="details__container__content__like-section">
              <div className="details__container__content__like-section__main">
                <LikeButton user={postUser} post={post} />
                <AiOutlineMessage />
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
              <p>{moment(post.createdAt).fromNow(true)}</p>
            </div>
            <div className="details__container__content__publish-comment">
              <input
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
      </div>
    </>
  );
};

export default PostDetails;
