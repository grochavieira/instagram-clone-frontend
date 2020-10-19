import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import User from "../../interfaces/User";
import api from "../../services/api";
import PostLoading from "../../components/Shimmer/PostLoading";
import OnlineFriendsLoading from "../../components/Shimmer/OnlineFriendsLoading";
import UserProfileLoading from "../../components/Shimmer/UserProfileLoading";
import { AuthContext } from "../../context/auth";
import "./styles.scss";

interface Post {
  _id: string;
  user: string;
  postUrl: string;
  username: string;
}

const Home = () => {
  const { user } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const { data } = await api.get(`/post`);
    setPosts(data);
    console.log(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  setInterval(() => {
    setIsLoading(false);
  }, 1500);

  return (
    <>
      <Header currentPage="home" profileImage={user.profilePhotoUrl} />
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
              {[...posts].reverse().map((post: Post) => (
                <Post
                  key={post._id}
                  postImage={post.postUrl}
                  userId={post.user}
                  username={post.username}
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
                  <img src={user.profilePhotoUrl} alt="user profile photo" />
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
