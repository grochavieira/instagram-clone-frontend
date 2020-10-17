import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import User from "../../interfaces/User";
import { FiCamera, FiDelete } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import VideoPlayer from "react-video-js-player";
import api from "../../services/api";

import "./styles.scss";

const PostContent = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFileImage, setIsFileImage] = useState(true);
  const [previewFile, setPreviewFile] = useState<any>();
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    profilePhotoUrl: "",
    username: "",
  });

  const history = useHistory();

  useEffect(() => {
    const json_object = localStorage.getItem("user");
    if (json_object) {
      const userData: User | null = JSON.parse(json_object);

      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  async function handlePost() {
    const data = new FormData();

    console.log(selectedFile);

    if (selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      if (user) {
        const { data: response } = await api.post(
          `/user/post/${user._id}`,
          data
        );
        if (response.post) {
          alert("Post criado com sucesso!");
          history.push("/home");
        }
      }
    } catch (e) {
      console.log(e);
      alert("Não foi possível criar o post!");
    }
  }

  const getFile = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    if (e.target.files[0].type.includes("image")) {
      setIsFileImage(true);
    } else {
      setIsFileImage(false);
    }

    console.log(e.target.files[0].type);

    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      <Header currentPage="post-content" profileImage={user.profilePhotoUrl} />
      <div className="post-content">
        <div className="post-content__create">
          {isFileImage ? (
            <img src={previewFile} />
          ) : (
            <video controls preload="auto" width="100%" src={previewFile} />
            // <video src={previewFile} autoPlay />
          )}
        </div>
        <div className="post-content__button">
          <label htmlFor="media">
            <FiCamera />
          </label>
          <input id="media" onChange={getFile} type="file" name="media" />
          <button onClick={handlePost}>Postar</button>
        </div>
      </div>
    </>
  );
};

export default PostContent;
