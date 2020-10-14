import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import ImageDropzone from "../../components/ImageDropzone";
import User from "../../interfaces/User";
import api from "../../services/api";
import "./styles.scss";

interface Post {
  _id: string;
  user_id: string;
  imageUrl: string;
}

const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
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
      <div className="home-container">
        <div className="main-container">
          <div className="online-friends-block"></div>
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
        <div className="side-container">
          <div className="user-profile">
            <div className="photo">
              <img src={user.profilePhotoUrl} alt="user profile photo" />
            </div>
            <div className="info">
              <p className="username">{user.username}</p>
              <p className="name">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
