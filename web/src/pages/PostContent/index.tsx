import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import User from "../../interfaces/User";
import { FiCamera, FiDelete } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading";

import "./styles.scss";
import AuthContext from "../../contexts/auth";

const PostContent = () => {
  const { user } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFileImage, setIsFileImage] = useState(true);
  const [previewFile, setPreviewFile] = useState<any>();

  const history = useHistory();

  async function handlePost() {
    setIsLoading(true);
    const data = new FormData();

    console.log(selectedFile);

    if (selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      if (user) {
        const token = localStorage.getItem("jwtToken");
        const { data: response } = await api.post(`/post`, data);
        if (response.post) {
          setIsLoading(false);
          alert("Post criado com sucesso!");
          history.push("/");
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.response.data);
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
      {isLoading && <Loading />}
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
