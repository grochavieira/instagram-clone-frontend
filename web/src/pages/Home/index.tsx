import React, { useState, useEffect, useContext } from "react";
import { FiSearch, FiArrowLeft } from "react-icons/fi";

import Post from "../../components/Post";
import UserCard from "../../components/UserCard";
import PostLoading from "../../components/Shimmer/PostLoading";
import OnlineFriendsLoading from "../../components/Shimmer/OnlineFriendsLoading";
import UserProfileLoading from "../../components/Shimmer/UserProfileLoading";
import AuthContext from "../../contexts/auth";
import api from "../../services/api";
import "./styles.scss";

interface Post {
  _id: string;
  user: string;
  postUrl: string;
  username: string;
  comments: Array<{
    body: string;
    username: string;
    createdAt: string;
  }>;
  likes: Array<{
    username: string;
    createdAt: string;
  }>;
}

const Home = () => {
  const { user } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  const [users, setUsers] = useState<any>("");

  async function loadPosts() {
    try {
      const { data } = await api.get(`/post`);
      setPosts(data);
    } catch (err) {
      console.log(err.response.data.errors);
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
      {users ? (
        <div className="home__search">
          <div className="home__search__goback">
            <button onClick={() => setUsers("")}>
              <FiArrowLeft />
            </button>
          </div>
          {users.map((user: any) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      ) : (
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
                  <Post key={post._id} post={post} />
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
      )}
    </>
  );
};

export default Home;
