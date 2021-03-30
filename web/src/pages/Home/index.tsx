import React, { useState, useEffect, useContext } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

import { Post as IPost } from "../../interfaces/Post";
import Post from "../../components/Post";
import PostModal from "../../components/PostModal";
import PostLoading from "../../components/Shimmer/PostLoading";
import OnlineFriendsLoading from "../../components/Shimmer/OnlineFriendsLoading";
import UserProfileLoading from "../../components/Shimmer/UserProfileLoading";
import AuthContext from "../../contexts/auth";
import api from "../../services/api";
import "./styles.scss";
import PostContext from "../../contexts/post";

const Home = () => {
  const { user, signOut } = useContext<any>(AuthContext);
  const { posts, getPosts } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any>("");
  const [selectedPost, setSelectedPost] = useState<IPost | any>({});
  const [isModalActive, setIsModalActive] = useState(false);

  async function loadPosts() {
    try {
      getPosts();
      console.log(posts);
    } catch (err) {
      console.log(err);
      if (err.response.data.errors.invalid_token) {
        signOut();
        toast.warn("sua sessão acabou!");
      }
    }
  }

  useEffect(() => {
    loadPosts();
  }, [users]);

  setInterval(() => {
    setIsLoading(false);
  }, 1500);

  return (
    <>
      {isModalActive && (
        <PostModal setIsModalActive={setIsModalActive} post={selectedPost} />
      )}
      <div className="home">
        <div className="home__main">
          {isLoading ? (
            <>
              <OnlineFriendsLoading />
              <PostLoading />
            </>
          ) : (
            <>
              <div className="home__main__online-friends"></div>
              {[...posts].reverse().map((post: IPost) => (
                <Post
                  key={post._id}
                  setSelectedPost={setSelectedPost}
                  setIsModalActive={setIsModalActive}
                  post={post}
                />
              ))}
            </>
          )}
        </div>
        <div className="home__aside">
          <div className="home__aside__profile">
            {isLoading ? (
              <UserProfileLoading />
            ) : (
              <>
                <div className="home__aside__profile__photo">
                  <img
                    src={
                      user.profilePhoto !== null ? user.profilePhoto.url : ""
                    }
                    alt="user profile photo"
                  />
                </div>
                <div className="home__aside__profile__info">
                  <p className="home__aside__profile__info__username">
                    {user.username}
                  </p>
                  <p className="home__aside__profile__info__name">
                    {user.name}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
