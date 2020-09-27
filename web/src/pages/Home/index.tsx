import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Post from "../../components/Post";
import ImageDropzone from "../../components/ImageDropzone";
import api from "../../services/api";
import "./styles.css";

interface Post {
  _id: string;
  user_id: string;
  imageUrl: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profilePhotoUrl: string;
  username: string;
}

interface HomeProps {
  user: User;
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

  async function handlePost() {
    const data = new FormData();

    if (selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      if (user) {
        const response = await api.post(`/user/post/${user._id}`, data);
        loadPosts(user._id);
        setSelectedFile(undefined);
        alert("Post criado com sucesso!");
      }
    } catch (e) {
      console.log(e);
      alert("Não foi possível criar o post!");
    }
  }

  return (
    <>
      <Header profileImage={user.profilePhotoUrl} />
      <div className="home-container">
        <div className="main-container">
          <div className="create-post-container">
            <div className="post-dropzone">
              <ImageDropzone
                info="Clique para selecionar uma imagem..."
                onFileUploaded={setSelectedFile}
              />
            </div>
            <div className="post-button">
              <button onClick={handlePost}>Postar</button>
            </div>
          </div>
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
