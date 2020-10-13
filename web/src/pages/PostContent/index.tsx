import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import User from "../../interfaces/User";
import ImageDropzone from "../../components/ImageDropzone";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

const PostContent = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
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

  return (
    <>
      <Header currentPage="post-content" profileImage={user.profilePhotoUrl} />
      <div className="post-content-container">
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
      </div>
    </>
  );
};

export default PostContent;
