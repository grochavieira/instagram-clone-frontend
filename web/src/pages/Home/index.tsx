import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import User from "../../interfaces/User";
import api from "../../services/api";
import "./styles.scss";

interface Post {
  _id: string;
  user_id: string;
  imageUrl: string;
}

const Home = () => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    profilePhotoUrl: "",
    username: "",
  });
  const [posts, setPosts] = useState([]);

  async function loadPosts(_id: string) {
    const response = await api.get(`/user/posts/${_id}`);
    setPosts(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    const json_object = localStorage.getItem("user");
    if (json_object) {
      const userData: User | null = JSON.parse(json_object);

      if (userData) {
        setUser(userData);

        loadPosts(userData._id);
      }
    }
  }, []);

  return (
    <>
      <Header currentPage="home" profileImage={user.profilePhotoUrl} />
      <div className="home">
        <div className="home__main">
          <div className="home__main__online-friends"></div>
          {[...posts].reverse().map((post: Post) => (
            <Post
              key={post._id}
              user_id={post.user_id}
              postImage={post.imageUrl}
              userImage={user.profilePhotoUrl}
              username={user.username}
            />
          ))}
        </div>
        <div className="home__aside">
          <div className="home__aside__profile">
            <div className="home__aside__profile__photo">
              <img src={user.profilePhotoUrl} alt="user profile photo" />
            </div>
            <div className="home__aside__profile__info">
              <p className="home__aside__profile__info__username">
                {user.username}
              </p>
              <p className="home__aside__profile__info__name">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
